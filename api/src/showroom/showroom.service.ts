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
import { CreateShowroomDto, UpdateShowroomDto } from './dto/showroom.dto';

export const CACHE_KEY_ACTIVE = 'showrooms:active';
export const CACHE_KEY_ALL = 'showrooms:all';

const IMAGE_SELECT = {
  id: true,
  url: true,
  cloudinaryId: true,
  caption: true,
  displayOrder: true,
} as const;

const SHOWROOM_SELECT = {
  id: true,
  name: true,
  city: true,
  address: true,
  latitude: true,
  longitude: true,
  geotagMetadata: true,
  phoneNumbers: true,
  email: true,
  whatsappNumber: true,
  instagramHandle: true,
  coverImageUrl: true,
  coverCloudinaryId: true,
  isActive: true,
  createdById: true,
  createdAt: true,
  createdBy: { select: { id: true, email: true } },
} as const;

const SHOWROOM_DETAIL_SELECT = {
  ...SHOWROOM_SELECT,
  showroomImages: {
    orderBy: { displayOrder: 'asc' as const },
    select: IMAGE_SELECT,
  },
} as const;

@Injectable()
export class ShowroomService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  // ─── Create ───────────────────────────────────────────────────────────────────
  async create(dto: CreateShowroomDto) {
    const existing = await this.prisma.showroom.findFirst({
      where: { name: dto.name, city: dto.city },
    });
    if (existing) {
      throw new ConflictException(
        `Showroom "${dto.name}" already exists in ${dto.city}`,
      );
    }

    const showroom = await this.prisma.showroom.create({
      data: dto,
      select: SHOWROOM_SELECT,
    });

    await this.bustCache();
    return showroom;
  }

  // ─── List all ─────────────────────────────────────────────────────────────────
  async findAll(activeOnly = false) {
    const key = activeOnly ? CACHE_KEY_ACTIVE : CACHE_KEY_ALL;
    const cached = await this.cache.get(key);
    if (cached) return cached;

    const rows = await this.prisma.showroom.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      select: SHOWROOM_SELECT,
      orderBy: { city: 'asc' },
    });

    await this.cache.set(key, rows);
    return rows;
  }

  // ─── Find one ─────────────────────────────────────────────────────────────────
  async findOne(id: string) {
    const showroom = await this.prisma.showroom.findUnique({
      where: { id },
      select: SHOWROOM_DETAIL_SELECT,
    });
    if (!showroom) throw new NotFoundException(`Showroom ${id} not found`);
    return showroom;
  }

  // ─── Update ───────────────────────────────────────────────────────────────────
  async update(id: string, dto: UpdateShowroomDto) {
    await this.findOne(id);
    const showroom = await this.prisma.showroom.update({
      where: { id },
      data: dto,
      select: SHOWROOM_SELECT,
    });

    await this.bustCache();
    return showroom;
  }

  // ─── Delete ───────────────────────────────────────────────────────────────────
  async remove(id: string) {
    const showroom = await this.findOne(id);

    const images: { cloudinaryId: string | null }[] =
      await this.prisma.showroomImage.findMany({
        where: { showroomId: id },
        select: { cloudinaryId: true },
      });

    const cloudinaryIds: string[] = [
      ...(showroom.coverCloudinaryId ? [showroom.coverCloudinaryId] : []),
      ...images.map((i: { cloudinaryId: string | null }) => i.cloudinaryId).filter((cid): cid is string => cid !== null),
    ];

    await Promise.all([
      this.prisma.showroom.delete({ where: { id } }),
      this.cloudinary.deleteMany(cloudinaryIds),
    ]);

    await this.bustCache();
    return { message: 'Showroom deleted' };
  }

  // ─── Upload / replace cover image ─────────────────────────────────────────────
  async uploadCover(id: string, file: Express.Multer.File) {
    const showroom = await this.findOne(id);

    const result = await this.cloudinary.upload(
      file.buffer,
      `blanca-luxury/showrooms/${id}/cover`,
    );

    // Delete old cover from Cloudinary if present
    if (showroom.coverCloudinaryId) {
      await this.cloudinary.delete(showroom.coverCloudinaryId);
    }

    const updated = await this.prisma.showroom.update({
      where: { id },
      data: {
        coverImageUrl: result.secure_url,
        coverCloudinaryId: result.public_id,
      },
      select: SHOWROOM_SELECT,
    });

    await this.bustCache();
    return updated;
  }

  // ─── Remove cover image ───────────────────────────────────────────────────────
  async removeCover(id: string) {
    const showroom = await this.findOne(id);

    if (showroom.coverCloudinaryId) {
      await this.cloudinary.delete(showroom.coverCloudinaryId);
    }

    await this.prisma.showroom.update({
      where: { id },
      data: { coverImageUrl: null, coverCloudinaryId: null },
    });

    await this.bustCache();
    return { message: 'Cover image removed' };
  }

  // ─── Add gallery images ────────────────────────────────────────────────────────
  async addImages(id: string, files: Express.Multer.File[]) {
    await this.findOne(id);

    const currentMax = await this.prisma.showroomImage.aggregate({
      where: { showroomId: id },
      _max: { displayOrder: true },
    });

    let nextOrder = (currentMax._max.displayOrder ?? -1) + 1;

    const uploaded = await Promise.all(
      files.map(async (file) => {
        const result = await this.cloudinary.upload(
          file.buffer,
          `blanca-luxury/showrooms/${id}/gallery`,
        );

        return this.prisma.showroomImage.create({
          data: {
            showroomId: id,
            url: result.secure_url,
            cloudinaryId: result.public_id,
            displayOrder: nextOrder++,
          },
          select: IMAGE_SELECT,
        });
      }),
    );

    await this.bustCache();
    return uploaded;
  }

  // ─── Remove a gallery image ────────────────────────────────────────────────────
  async removeImage(showroomId: string, imageId: string) {
    const image = await this.prisma.showroomImage.findFirst({
      where: { id: imageId, showroomId },
    });
    if (!image) throw new NotFoundException(`Image ${imageId} not found on showroom ${showroomId}`);

    await this.prisma.showroomImage.delete({ where: { id: imageId } });

    if (image.cloudinaryId) {
      await this.cloudinary.delete(image.cloudinaryId);
    }

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
