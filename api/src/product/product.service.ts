import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';

// ─── Selects ─────────────────────────────────────────────────────────────────

const MEDIA_SELECT = {
  id: true,
  url: true,
  cloudinaryId: true,
  mediaType: true,
  displayOrder: true,
  altText: true,
  isPrimary: true,
} as const;

const LIST_SELECT = {
  id: true,
  name: true,
  slug: true,
  price: true,
  priceOnRequest: true,
  isFeatured: true,
  isActive: true,
  origin: true,
  leadTime: true,
  category: { select: { id: true, name: true, slug: true } },
  showroom: { select: { id: true, name: true, city: true } },
  media: {
    where: { isPrimary: true },
    select: { id: true, url: true, altText: true },
    take: 1,
  },
  tags: { select: { tag: { select: { id: true, name: true, slug: true } } } },
} as const;

const DETAIL_SELECT = {
  id: true,
  name: true,
  slug: true,
  description: true,
  style: true,
  type: true,
  origin: true,
  materials: true,
  dimensions: true,
  leadTime: true,
  price: true,
  priceOnRequest: true,
  isFeatured: true,
  isActive: true,
  metaTitle: true,
  metaDescription: true,
  createdAt: true,
  category: { select: { id: true, name: true, slug: true } },
  showroom: { select: { id: true, name: true, city: true, address: true } },
  media: {
    orderBy: { displayOrder: 'asc' as const },
    select: MEDIA_SELECT,
  },
  tags: { select: { tag: { select: { id: true, name: true, slug: true } } } },
} as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function resolveResourceType(mimetype: string): 'image' | 'video' | 'raw' {
  if (mimetype.startsWith('image/')) return 'image';
  if (mimetype.startsWith('video/')) return 'video';
  return 'raw';
}

// ─── Service ─────────────────────────────────────────────────────────────────

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  // ─── Create ──────────────────────────────────────────────────────────────────
  async create(
    dto: CreateProductDto,
    files: Express.Multer.File[],
    createdById?: string,
  ) {
    const slug = dto.slug ?? slugify(dto.name);

    const exists = await this.prisma.product.findUnique({ where: { slug } });
    if (exists) throw new ConflictException(`Slug "${slug}" already in use`);

    const { tagIds, ...productData } = dto;

    const product = await this.prisma.product.create({
      data: {
        ...productData,
        slug,
        createdById: createdById ?? null,
        tags: tagIds?.length
          ? { create: tagIds.map((tagId) => ({ tagId })) }
          : undefined,
      },
      select: DETAIL_SELECT,
    });

    if (files?.length) {
      await this.uploadMediaFiles(product.id, files);
    }

    return this.findOne(product.id);
  }

  // ─── List ─────────────────────────────────────────────────────────────────────
  async findAll(query: ProductQueryDto) {
    const {
      page = 1,
      limit = 20,
      categoryId,
      showroomId,
      origin,
      isFeatured,
      isActive,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    const where: any = {
      ...(isActive !== undefined ? { isActive } : { isActive: true }),
      ...(categoryId && { categoryId }),
      ...(showroomId && { showroomId }),
      ...(origin && { origin }),
      ...(isFeatured !== undefined && { isFeatured }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [total, items] = await Promise.all([
      this.prisma.product.count({ where }),
      this.prisma.product.findMany({
        where,
        select: LIST_SELECT,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return {
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // ─── Find one ─────────────────────────────────────────────────────────────────
  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: DETAIL_SELECT,
    });
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }

  // ─── Find by slug (for public SEO pages) ──────────────────────────────────────
  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      select: DETAIL_SELECT,
    });
    if (!product) throw new NotFoundException(`Product "${slug}" not found`);
    return product;
  }

  // ─── Update ───────────────────────────────────────────────────────────────────
  async update(id: string, dto: UpdateProductDto) {
    await this.findOne(id);

    const { tagIds, slug, name, ...rest } = dto;

    // If name is changing and no explicit slug provided, regenerate slug
    const newSlug = slug ?? (name ? slugify(name) : undefined);
    if (newSlug) {
      const conflict = await this.prisma.product.findFirst({
        where: { slug: newSlug, NOT: { id } },
      });
      if (conflict) throw new ConflictException(`Slug "${newSlug}" already in use`);
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        ...rest,
        ...(name && { name }),
        ...(newSlug && { slug: newSlug }),
        ...(tagIds !== undefined && {
          tags: {
            deleteMany: {},
            create: tagIds.map((tagId) => ({ tagId })),
          },
        }),
      },
      select: DETAIL_SELECT,
    });
  }

  // ─── Delete ───────────────────────────────────────────────────────────────────
  async remove(id: string) {
    await this.findOne(id);

    const mediaRows = await this.prisma.productMedia.findMany({
      where: { productId: id },
      select: { cloudinaryId: true, mediaType: true },
    });

    // Cascade delete handles DB rows; we clean up Cloudinary in parallel
    await Promise.all([
      this.prisma.product.delete({ where: { id } }),
      ...mediaRows
        .filter((m) => m.cloudinaryId)
        .map((m) =>
          this.cloudinary.delete(
            m.cloudinaryId!,
            m.mediaType === 'VIDEO' ? 'video' : m.mediaType === 'IMAGE' ? 'image' : 'raw',
          ),
        ),
    ]);

    return { message: 'Product deleted' };
  }

  // ─── Add images / assets to an existing product ───────────────────────────────
  async addMedia(productId: string, files: Express.Multer.File[]) {
    await this.findOne(productId);
    const uploaded = await this.uploadMediaFiles(productId, files);
    return uploaded;
  }

  // ─── Delete a single media item ───────────────────────────────────────────────
  async removeMedia(productId: string, mediaId: string) {
    const media = await this.prisma.productMedia.findFirst({
      where: { id: mediaId, productId },
    });
    if (!media) throw new NotFoundException(`Media ${mediaId} not found on product ${productId}`);

    await this.prisma.productMedia.delete({ where: { id: mediaId } });

    if (media.cloudinaryId) {
      const resourceType =
        media.mediaType === 'VIDEO' ? 'video' : media.mediaType === 'IMAGE' ? 'image' : 'raw';
      await this.cloudinary.delete(media.cloudinaryId, resourceType);
    }

    return { message: 'Media deleted' };
  }

  // ─── Internal: upload files and persist media rows ────────────────────────────
  private async uploadMediaFiles(productId: string, files: Express.Multer.File[]) {
    const currentMax = await this.prisma.productMedia.aggregate({
      where: { productId },
      _max: { displayOrder: true },
    });
    const hasPrimary = await this.prisma.productMedia.findFirst({
      where: { productId, isPrimary: true },
    });

    let nextOrder = (currentMax._max.displayOrder ?? -1) + 1;

    const uploaded = await Promise.all(
      files.map(async (file, i) => {
        const resourceType = resolveResourceType(file.mimetype);
        const folder = `blanca-luxury/products/${productId}`;
        const result = await this.cloudinary.upload(file.buffer, folder, resourceType);

        const isFirst = !hasPrimary && i === 0;

        return this.prisma.productMedia.create({
          data: {
            productId,
            url: result.secure_url,
            cloudinaryId: result.public_id,
            mediaType: resourceType === 'video' ? 'VIDEO' : resourceType === 'image' ? 'IMAGE' : 'IMAGE',
            displayOrder: nextOrder++,
            isPrimary: isFirst,
          },
          select: MEDIA_SELECT,
        });
      }),
    );

    return uploaded;
  }
}
