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
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

const CACHE_KEY_ACTIVE = 'categories:active';
const CACHE_KEY_ALL = 'categories:all';

const CATEGORY_SELECT = {
  id: true,
  name: true,
  slug: true,
  description: true,
  icon: true,
  imageUrl: true,
  imageCloudinaryId: true,
  displayOrder: true,
  isActive: true,
} as const;

const CATEGORY_WITH_COUNT_SELECT = {
  ...CATEGORY_SELECT,
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
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  // ─── Create ───────────────────────────────────────────────────────────────────
  async create(dto: CreateCategoryDto, imageFile?: Express.Multer.File) {
    const slug = dto.slug ?? slugify(dto.name);

    const exists = await this.prisma.category.findUnique({ where: { slug } });
    if (exists) throw new ConflictException(`Slug "${slug}" already in use`);

    let imageUrl: string | undefined;
    let imageCloudinaryId: string | undefined;

    if (imageFile) {
      const result = await this.cloudinary.upload(
        imageFile.buffer,
        'blanca-luxury/categories',
      );
      imageUrl = result.secure_url;
      imageCloudinaryId = result.public_id;
    }

    const category = await this.prisma.category.create({
      data: { ...dto, slug, imageUrl, imageCloudinaryId },
      select: CATEGORY_SELECT,
    });

    await this.bustCache();
    return category;
  }

  // ─── List all ─────────────────────────────────────────────────────────────────
  async findAll(activeOnly = false) {
    const key = activeOnly ? CACHE_KEY_ACTIVE : CACHE_KEY_ALL;
    const cached = await this.cache.get(key);
    if (cached) return cached;

    const rows = await this.prisma.category.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      select: CATEGORY_WITH_COUNT_SELECT,
      orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
    });

    await this.cache.set(key, rows);
    return rows;
  }

  // ─── Find one by ID ───────────────────────────────────────────────────────────
  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      select: CATEGORY_WITH_COUNT_SELECT,
    });
    if (!category) throw new NotFoundException(`Category ${id} not found`);
    return category;
  }

  // ─── Find by slug ─────────────────────────────────────────────────────────────
  async findBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      select: CATEGORY_WITH_COUNT_SELECT,
    });
    if (!category) throw new NotFoundException(`Category "${slug}" not found`);
    return category;
  }

  // ─── Update ───────────────────────────────────────────────────────────────────
  async update(id: string, dto: UpdateCategoryDto) {
    await this.findOne(id);

    const { slug, name, ...rest } = dto;
    const newSlug = slug ?? (name ? slugify(name) : undefined);

    if (newSlug) {
      const conflict = await this.prisma.category.findFirst({
        where: { slug: newSlug, NOT: { id } },
      });
      if (conflict) throw new ConflictException(`Slug "${newSlug}" already in use`);
    }

    const category = await this.prisma.category.update({
      where: { id },
      data: {
        ...rest,
        ...(name && { name }),
        ...(newSlug && { slug: newSlug }),
      },
      select: CATEGORY_SELECT,
    });

    await this.bustCache();
    return category;
  }

  // ─── Delete ───────────────────────────────────────────────────────────────────
  async remove(id: string) {
    const category = await this.findOne(id);

    await this.prisma.category.delete({ where: { id } });

    if (category.imageCloudinaryId) {
      await this.cloudinary.delete(category.imageCloudinaryId);
    }

    await this.bustCache();
    return { message: 'Category deleted' };
  }

  // ─── Upload / replace image ───────────────────────────────────────────────────
  async uploadImage(id: string, file: Express.Multer.File) {
    const category = await this.findOne(id);

    const result = await this.cloudinary.upload(
      file.buffer,
      'blanca-luxury/categories',
    );

    if (category.imageCloudinaryId) {
      await this.cloudinary.delete(category.imageCloudinaryId);
    }

    const updated = await this.prisma.category.update({
      where: { id },
      data: {
        imageUrl: result.secure_url,
        imageCloudinaryId: result.public_id,
      },
      select: CATEGORY_SELECT,
    });

    await this.bustCache();
    return updated;
  }

  // ─── Remove image ─────────────────────────────────────────────────────────────
  async removeImage(id: string) {
    const category = await this.findOne(id);

    if (category.imageCloudinaryId) {
      await this.cloudinary.delete(category.imageCloudinaryId);
    }

    await this.prisma.category.update({
      where: { id },
      data: { imageUrl: null, imageCloudinaryId: null },
    });

    await this.bustCache();
    return { message: 'Image removed' };
  }

  // ─── Cache bust ───────────────────────────────────────────────────────────────
  private async bustCache() {
    await Promise.all([
      this.cache.del(CACHE_KEY_ACTIVE),
      this.cache.del(CACHE_KEY_ALL),
    ]);
  }
}
