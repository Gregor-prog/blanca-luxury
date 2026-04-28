import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

const CACHE_KEY_ACTIVE = 'collections:active';
const CACHE_KEY_ALL = 'collections:all';

const COLLECTION_SELECT = {
  id: true,
  name: true,
  slug: true,
  description: true,
  badgeText: true,
  year: true,
  showroomId: true,
  coverImageUrl: true,
  coverCloudinaryId: true,
  isFeatured: true,
  isActive: true,
  displayOrder: true,
  showroom: { select: { id: true, name: true, city: true } },
} as const;

const COLLECTION_WITH_COUNT_SELECT = {
  ...COLLECTION_SELECT,
  _count: { select: { products: true } },
} as const;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

@Injectable()
export class CollectionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  // ─── Create ───────────────────────────────────────────────────────────────────
  async create(dto: CreateCollectionDto, imageFile?: Express.Multer.File) {
    const slug = dto.slug ?? slugify(dto.name);

    const exists = await this.prisma.collection.findUnique({ where: { slug } });
    if (exists) throw new ConflictException(`Slug "${slug}" already in use`);

    let coverImageUrl: string | undefined;
    let coverCloudinaryId: string | undefined;

    if (imageFile) {
      const result = await this.cloudinary.upload(
        imageFile.buffer,
        'blanca-luxury/collections',
      );
      coverImageUrl = result.secure_url;
      coverCloudinaryId = result.public_id;
    }

    const { slug: _slug, ...rest } = dto;
    const collection = await this.prisma.collection.create({
      data: { ...rest, slug, coverImageUrl, coverCloudinaryId },
      select: COLLECTION_SELECT,
    });

    await this.bustCache();
    return collection;
  }

  // ─── List all ─────────────────────────────────────────────────────────────────
  async findAll(activeOnly = false, featured?: boolean, showroomId?: string) {
    const key = activeOnly ? CACHE_KEY_ACTIVE : CACHE_KEY_ALL;
    // Only cache the basic lists (no extra filters)
    if (!featured && !showroomId) {
      const cached = await this.cache.get(key);
      if (cached) return cached;
    }

    const where: Record<string, unknown> = {};
    if (activeOnly) where.isActive = true;
    if (featured !== undefined) where.isFeatured = featured;
    if (showroomId) where.showroomId = showroomId;

    const rows = await this.prisma.collection.findMany({
      where,
      select: COLLECTION_WITH_COUNT_SELECT,
      orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
    });

    if (!featured && !showroomId) {
      await this.cache.set(key, rows);
    }

    return rows;
  }

  // ─── Find one by ID ───────────────────────────────────────────────────────────
  async findOne(id: string) {
    const collection = await this.prisma.collection.findUnique({
      where: { id },
      select: COLLECTION_WITH_COUNT_SELECT,
    });
    if (!collection) throw new NotFoundException(`Collection ${id} not found`);
    return collection;
  }

  // ─── Find by slug ─────────────────────────────────────────────────────────────
  async findBySlug(slug: string) {
    const collection = await this.prisma.collection.findUnique({
      where: { slug },
      select: COLLECTION_WITH_COUNT_SELECT,
    });
    if (!collection)
      throw new NotFoundException(`Collection "${slug}" not found`);
    return collection;
  }

  // ─── Get products in collection ───────────────────────────────────────────────
  async getProducts(id: string) {
    await this.findOne(id);
    return this.prisma.collectionProduct.findMany({
      where: { collectionId: id },
      orderBy: { displayOrder: 'asc' },
      select: {
        displayOrder: true,
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            isActive: true,
            isFeatured: true,
            category: { select: { id: true, name: true } },
            media: {
              where: { isPrimary: true },
              take: 1,
              select: { url: true, altText: true },
            },
          },
        },
      },
    });
  }

  // ─── Add product ──────────────────────────────────────────────────────────────
  async addProduct(collectionId: string, productId: string) {
    await this.findOne(collectionId);
    // Get max display order
    const last = await this.prisma.collectionProduct.findFirst({
      where: { collectionId },
      orderBy: { displayOrder: 'desc' },
    });
    const displayOrder = (last?.displayOrder ?? -1) + 1;

    return this.prisma.collectionProduct.upsert({
      where: { collectionId_productId: { collectionId, productId } },
      create: { collectionId, productId, displayOrder },
      update: {},
    });
  }

  // ─── Remove product ───────────────────────────────────────────────────────────
  async removeProduct(collectionId: string, productId: string) {
    await this.findOne(collectionId);
    await this.prisma.collectionProduct.delete({
      where: { collectionId_productId: { collectionId, productId } },
    });
    return { message: 'Product removed from collection' };
  }

  // ─── Update ───────────────────────────────────────────────────────────────────
  async update(id: string, dto: UpdateCollectionDto) {
    await this.findOne(id);

    const { slug, name, ...rest } = dto;
    const newSlug = slug ?? (name ? slugify(name) : undefined);

    if (newSlug) {
      const conflict = await this.prisma.collection.findFirst({
        where: { slug: newSlug, NOT: { id } },
      });
      if (conflict)
        throw new ConflictException(`Slug "${newSlug}" already in use`);
    }

    const collection = await this.prisma.collection.update({
      where: { id },
      data: {
        ...rest,
        ...(name && { name }),
        ...(newSlug && { slug: newSlug }),
      },
      select: COLLECTION_SELECT,
    });

    await this.bustCache();
    return collection;
  }

  // ─── Delete ───────────────────────────────────────────────────────────────────
  async remove(id: string) {
    const collection = await this.findOne(id);

    await this.prisma.collection.delete({ where: { id } });

    if (collection.coverCloudinaryId) {
      await this.cloudinary.delete(collection.coverCloudinaryId);
    }

    await this.bustCache();
    return { message: 'Collection deleted' };
  }

  // ─── Upload / replace cover image ─────────────────────────────────────────────
  async uploadImage(id: string, file: Express.Multer.File) {
    const collection = await this.findOne(id);

    const result = await this.cloudinary.upload(
      file.buffer,
      'blanca-luxury/collections',
    );

    if (collection.coverCloudinaryId) {
      await this.cloudinary.delete(collection.coverCloudinaryId);
    }

    const updated = await this.prisma.collection.update({
      where: { id },
      data: {
        coverImageUrl: result.secure_url,
        coverCloudinaryId: result.public_id,
      },
      select: COLLECTION_SELECT,
    });

    await this.bustCache();
    return updated;
  }

  // ─── Remove cover image ───────────────────────────────────────────────────────
  async removeImage(id: string) {
    const collection = await this.findOne(id);

    if (collection.coverCloudinaryId) {
      await this.cloudinary.delete(collection.coverCloudinaryId);
    }

    await this.prisma.collection.update({
      where: { id },
      data: { coverImageUrl: null, coverCloudinaryId: null },
    });

    await this.bustCache();
    return { message: 'Cover image removed' };
  }

  // ─── Cache bust ───────────────────────────────────────────────────────────────
  private async bustCache() {
    await Promise.all([
      this.cache.del(CACHE_KEY_ACTIVE),
      this.cache.del(CACHE_KEY_ALL),
    ]);
  }
}
