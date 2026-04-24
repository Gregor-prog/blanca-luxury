import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectQueryDto } from './dto/project-query.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

// ─── Selects ─────────────────────────────────────────────────────────────────

const MEDIA_SELECT = {
  id: true,
  url: true,
  cloudinaryId: true,
  mediaType: true,
  caption: true,
  displayOrder: true,
} as const;

const LIST_SELECT = {
  id: true,
  title: true,
  slug: true,
  sector: true,
  location: true,
  year: true,
  isFeatured: true,
  isActive: true,
  coverImageUrl: true,
  media: {
    where: { displayOrder: 0 },
    select: { id: true, url: true },
    take: 1,
  },
} as const;

const DETAIL_SELECT = {
  id: true,
  title: true,
  slug: true,
  description: true,
  sector: true,
  location: true,
  year: true,
  clientName: true,
  coverImageUrl: true,
  coverCloudinaryId: true,
  isFeatured: true,
  isActive: true,
  createdAt: true,
  media: {
    orderBy: { displayOrder: 'asc' as const },
    select: MEDIA_SELECT,
  },
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
export class ProjectService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  // ─── Create ───────────────────────────────────────────────────────────────────
  async create(
    dto: CreateProjectDto,
    coverFile?: Express.Multer.File,
    mediaFiles: Express.Multer.File[] = [],
  ) {
    const slug = dto.slug ?? slugify(dto.title);

    const exists = await this.prisma.project.findUnique({ where: { slug } });
    if (exists) throw new ConflictException(`Slug "${slug}" already in use`);

    const project = await this.prisma.project.create({
      data: { ...dto, slug },
      select: { id: true },
    });

    await Promise.all([
      coverFile ? this.uploadCover(project.id, coverFile) : Promise.resolve(),
      mediaFiles.length ? this.addMedia(project.id, mediaFiles) : Promise.resolve(),
    ]);

    return this.findOne(project.id);
  }

  // ─── List ─────────────────────────────────────────────────────────────────────
  async findAll(query: ProjectQueryDto) {
    const {
      page = 1,
      limit = 20,
      sector,
      isFeatured,
      isActive,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    const where: any = {
      ...(isActive !== undefined ? { isActive } : { isActive: true }),
      ...(sector && { sector }),
      ...(isFeatured !== undefined && { isFeatured }),
      ...(search && {
        OR: [
          { title: { contains: search } },
          { description: { contains: search } },
          { location: { contains: search } },
        ],
      }),
    };

    const [total, items] = await Promise.all([
      this.prisma.project.count({ where }),
      this.prisma.project.findMany({
        where,
        select: LIST_SELECT,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return {
      data: items,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  // ─── Find one by ID ───────────────────────────────────────────────────────────
  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      select: DETAIL_SELECT,
    });
    if (!project) throw new NotFoundException(`Project ${id} not found`);
    return project;
  }

  // ─── Find by slug ─────────────────────────────────────────────────────────────
  async findBySlug(slug: string) {
    const project = await this.prisma.project.findUnique({
      where: { slug },
      select: DETAIL_SELECT,
    });
    if (!project) throw new NotFoundException(`Project "${slug}" not found`);
    return project;
  }

  // ─── Update ───────────────────────────────────────────────────────────────────
  async update(id: string, dto: UpdateProjectDto) {
    await this.findOne(id);

    const { slug, title, ...rest } = dto;
    const newSlug = slug ?? (title ? slugify(title) : undefined);

    if (newSlug) {
      const conflict = await this.prisma.project.findFirst({
        where: { slug: newSlug, NOT: { id } },
      });
      if (conflict) throw new ConflictException(`Slug "${newSlug}" already in use`);
    }

    return this.prisma.project.update({
      where: { id },
      data: {
        ...rest,
        ...(title && { title }),
        ...(newSlug && { slug: newSlug }),
      },
      select: DETAIL_SELECT,
    });
  }

  // ─── Delete ───────────────────────────────────────────────────────────────────
  async remove(id: string) {
    const project = await this.findOne(id);

    const mediaRows: { cloudinaryId: string | null; mediaType: string }[] =
      await this.prisma.projectMedia.findMany({
        where: { projectId: id },
        select: { cloudinaryId: true, mediaType: true },
      });

    await Promise.all([
      this.prisma.project.delete({ where: { id } }),
      project.coverCloudinaryId
        ? this.cloudinary.delete(project.coverCloudinaryId)
        : Promise.resolve(),
      ...mediaRows
        .map((m: { cloudinaryId: string | null; mediaType: string }) => m.cloudinaryId)
        .filter((cid): cid is string => cid !== null)
        .map((cid) => this.cloudinary.delete(cid)),
    ]);

    return { message: 'Project deleted' };
  }

  // ─── Upload / replace cover ───────────────────────────────────────────────────
  async uploadCover(id: string, file: Express.Multer.File) {
    const project = await this.findOne(id);

    const result = await this.cloudinary.upload(
      file.buffer,
      `blanca-luxury/projects/${id}/cover`,
    );

    if (project.coverCloudinaryId) {
      await this.cloudinary.delete(project.coverCloudinaryId);
    }

    return this.prisma.project.update({
      where: { id },
      data: {
        coverImageUrl: result.secure_url,
        coverCloudinaryId: result.public_id,
      },
      select: DETAIL_SELECT,
    });
  }

  // ─── Remove cover ─────────────────────────────────────────────────────────────
  async removeCover(id: string) {
    const project = await this.findOne(id);

    if (project.coverCloudinaryId) {
      await this.cloudinary.delete(project.coverCloudinaryId);
    }

    await this.prisma.project.update({
      where: { id },
      data: { coverImageUrl: null, coverCloudinaryId: null },
    });

    return { message: 'Cover removed' };
  }

  // ─── Add media files ──────────────────────────────────────────────────────────
  async addMedia(projectId: string, files: Express.Multer.File[]) {
    await this.findOne(projectId);

    const currentMax = await this.prisma.projectMedia.aggregate({
      where: { projectId },
      _max: { displayOrder: true },
    });

    let nextOrder = (currentMax._max.displayOrder ?? -1) + 1;

    return Promise.all(
      files.map(async (file) => {
        const resourceType = resolveResourceType(file.mimetype);
        const result = await this.cloudinary.upload(
          file.buffer,
          `blanca-luxury/projects/${projectId}/media`,
          resourceType,
        );

        return this.prisma.projectMedia.create({
          data: {
            projectId,
            url: result.secure_url,
            cloudinaryId: result.public_id,
            mediaType: resourceType === 'video' ? 'VIDEO' : 'IMAGE',
            displayOrder: nextOrder++,
          },
          select: MEDIA_SELECT,
        });
      }),
    );
  }

  // ─── Update media caption ─────────────────────────────────────────────────────
  async updateMedia(projectId: string, mediaId: string, caption: string) {
    const media = await this.prisma.projectMedia.findFirst({
      where: { id: mediaId, projectId },
    });
    if (!media) throw new NotFoundException(`Media ${mediaId} not found on project ${projectId}`);

    return this.prisma.projectMedia.update({
      where: { id: mediaId },
      data: { caption },
      select: MEDIA_SELECT,
    });
  }

  // ─── Remove media ─────────────────────────────────────────────────────────────
  async removeMedia(projectId: string, mediaId: string) {
    const media = await this.prisma.projectMedia.findFirst({
      where: { id: mediaId, projectId },
      select: { cloudinaryId: true, mediaType: true },
    });
    if (!media) throw new NotFoundException(`Media ${mediaId} not found on project ${projectId}`);

    await this.prisma.projectMedia.delete({ where: { id: mediaId } });

    if (media.cloudinaryId) {
      const resourceType =
        media.mediaType === 'VIDEO' ? 'video' : 'image';
      await this.cloudinary.delete(media.cloudinaryId, resourceType);
    }

    return { message: 'Media removed' };
  }
}
