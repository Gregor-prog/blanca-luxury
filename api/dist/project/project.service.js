"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const prisma_service_1 = require("../prisma/prisma.service");
const MEDIA_SELECT = {
    id: true,
    url: true,
    cloudinaryId: true,
    mediaType: true,
    caption: true,
    displayOrder: true,
};
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
};
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
        orderBy: { displayOrder: 'asc' },
        select: MEDIA_SELECT,
    },
};
function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}
function resolveResourceType(mimetype) {
    if (mimetype.startsWith('image/'))
        return 'image';
    if (mimetype.startsWith('video/'))
        return 'video';
    return 'raw';
}
let ProjectService = class ProjectService {
    constructor(prisma, cloudinary) {
        this.prisma = prisma;
        this.cloudinary = cloudinary;
    }
    async create(dto, coverFile, mediaFiles = []) {
        const slug = dto.slug ?? slugify(dto.title);
        const exists = await this.prisma.project.findUnique({ where: { slug } });
        if (exists)
            throw new common_1.ConflictException(`Slug "${slug}" already in use`);
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
    async findAll(query) {
        const { page = 1, limit = 20, sector, isFeatured, isActive, search, sortBy = 'createdAt', sortOrder = 'desc', } = query;
        const where = {
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
    async findOne(id) {
        const project = await this.prisma.project.findUnique({
            where: { id },
            select: DETAIL_SELECT,
        });
        if (!project)
            throw new common_1.NotFoundException(`Project ${id} not found`);
        return project;
    }
    async findBySlug(slug) {
        const project = await this.prisma.project.findUnique({
            where: { slug },
            select: DETAIL_SELECT,
        });
        if (!project)
            throw new common_1.NotFoundException(`Project "${slug}" not found`);
        return project;
    }
    async update(id, dto) {
        await this.findOne(id);
        const { slug, title, ...rest } = dto;
        const newSlug = slug ?? (title ? slugify(title) : undefined);
        if (newSlug) {
            const conflict = await this.prisma.project.findFirst({
                where: { slug: newSlug, NOT: { id } },
            });
            if (conflict)
                throw new common_1.ConflictException(`Slug "${newSlug}" already in use`);
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
    async remove(id) {
        const project = await this.findOne(id);
        const mediaRows = await this.prisma.projectMedia.findMany({
            where: { projectId: id },
            select: { cloudinaryId: true, mediaType: true },
        });
        await Promise.all([
            this.prisma.project.delete({ where: { id } }),
            project.coverCloudinaryId
                ? this.cloudinary.delete(project.coverCloudinaryId)
                : Promise.resolve(),
            ...mediaRows
                .map((m) => m.cloudinaryId)
                .filter((cid) => cid !== null)
                .map((cid) => this.cloudinary.delete(cid)),
        ]);
        return { message: 'Project deleted' };
    }
    async uploadCover(id, file) {
        const project = await this.findOne(id);
        const result = await this.cloudinary.upload(file.buffer, `blanca-luxury/projects/${id}/cover`);
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
    async removeCover(id) {
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
    async addMedia(projectId, files) {
        await this.findOne(projectId);
        const currentMax = await this.prisma.projectMedia.aggregate({
            where: { projectId },
            _max: { displayOrder: true },
        });
        let nextOrder = (currentMax._max.displayOrder ?? -1) + 1;
        return Promise.all(files.map(async (file) => {
            const resourceType = resolveResourceType(file.mimetype);
            const result = await this.cloudinary.upload(file.buffer, `blanca-luxury/projects/${projectId}/media`, resourceType);
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
        }));
    }
    async updateMedia(projectId, mediaId, caption) {
        const media = await this.prisma.projectMedia.findFirst({
            where: { id: mediaId, projectId },
        });
        if (!media)
            throw new common_1.NotFoundException(`Media ${mediaId} not found on project ${projectId}`);
        return this.prisma.projectMedia.update({
            where: { id: mediaId },
            data: { caption },
            select: MEDIA_SELECT,
        });
    }
    async removeMedia(projectId, mediaId) {
        const media = await this.prisma.projectMedia.findFirst({
            where: { id: mediaId, projectId },
            select: { cloudinaryId: true, mediaType: true },
        });
        if (!media)
            throw new common_1.NotFoundException(`Media ${mediaId} not found on project ${projectId}`);
        await this.prisma.projectMedia.delete({ where: { id: mediaId } });
        if (media.cloudinaryId) {
            const resourceType = media.mediaType === 'VIDEO' ? 'video' : 'image';
            await this.cloudinary.delete(media.cloudinaryId, resourceType);
        }
        return { message: 'Media removed' };
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cloudinary_service_1.CloudinaryService])
], ProjectService);
//# sourceMappingURL=project.service.js.map