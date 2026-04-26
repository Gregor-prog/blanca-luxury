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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const prisma_service_1 = require("../prisma/prisma.service");
const MEDIA_SELECT = {
    id: true,
    url: true,
    cloudinaryId: true,
    mediaType: true,
    displayOrder: true,
    altText: true,
    isPrimary: true,
};
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
};
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
        orderBy: { displayOrder: 'asc' },
        select: MEDIA_SELECT,
    },
    tags: { select: { tag: { select: { id: true, name: true, slug: true } } } },
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
let ProductService = class ProductService {
    constructor(prisma, cloudinary) {
        this.prisma = prisma;
        this.cloudinary = cloudinary;
    }
    async create(dto, files, createdById) {
        const slug = dto.slug ?? slugify(dto.name);
        const exists = await this.prisma.product.findUnique({ where: { slug } });
        if (exists)
            throw new common_1.ConflictException(`Slug "${slug}" already in use`);
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
    async findAll(query) {
        const { page = 1, limit = 20, categoryId, showroomId, origin, isFeatured, isActive, search, sortBy = 'createdAt', sortOrder = 'desc', } = query;
        const where = {
            ...(isActive !== undefined ? { isActive } : { isActive: true }),
            ...(categoryId && { categoryId }),
            ...(showroomId && { showroomId }),
            ...(origin && { origin }),
            ...(isFeatured !== undefined && { isFeatured }),
            ...(search && {
                OR: [
                    { name: { contains: search } },
                    { description: { contains: search } },
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
    async findOne(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            select: DETAIL_SELECT,
        });
        if (!product)
            throw new common_1.NotFoundException(`Product ${id} not found`);
        return product;
    }
    async findBySlug(slug) {
        const product = await this.prisma.product.findUnique({
            where: { slug },
            select: DETAIL_SELECT,
        });
        if (!product)
            throw new common_1.NotFoundException(`Product "${slug}" not found`);
        return product;
    }
    async update(id, dto) {
        await this.findOne(id);
        const { tagIds, slug, name, ...rest } = dto;
        const newSlug = slug ?? (name ? slugify(name) : undefined);
        if (newSlug) {
            const conflict = await this.prisma.product.findFirst({
                where: { slug: newSlug, NOT: { id } },
            });
            if (conflict)
                throw new common_1.ConflictException(`Slug "${newSlug}" already in use`);
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
    async remove(id) {
        await this.findOne(id);
        const mediaRows = await this.prisma.productMedia.findMany({
            where: { productId: id },
            select: { cloudinaryId: true, mediaType: true },
        });
        await Promise.all([
            this.prisma.product.delete({ where: { id } }),
            ...mediaRows
                .filter((m) => m.cloudinaryId)
                .map((m) => this.cloudinary.delete(m.cloudinaryId, m.mediaType === 'VIDEO' ? 'video' : m.mediaType === 'IMAGE' ? 'image' : 'raw')),
        ]);
        return { message: 'Product deleted' };
    }
    async addMedia(productId, files) {
        await this.findOne(productId);
        const uploaded = await this.uploadMediaFiles(productId, files);
        return uploaded;
    }
    async removeMedia(productId, mediaId) {
        const media = await this.prisma.productMedia.findFirst({
            where: { id: mediaId, productId },
        });
        if (!media)
            throw new common_1.NotFoundException(`Media ${mediaId} not found on product ${productId}`);
        await this.prisma.productMedia.delete({ where: { id: mediaId } });
        if (media.cloudinaryId) {
            const resourceType = media.mediaType === 'VIDEO' ? 'video' : media.mediaType === 'IMAGE' ? 'image' : 'raw';
            await this.cloudinary.delete(media.cloudinaryId, resourceType);
        }
        return { message: 'Media deleted' };
    }
    async uploadMediaFiles(productId, files) {
        const currentMax = await this.prisma.productMedia.aggregate({
            where: { productId },
            _max: { displayOrder: true },
        });
        const hasPrimary = await this.prisma.productMedia.findFirst({
            where: { productId, isPrimary: true },
        });
        let nextOrder = (currentMax._max.displayOrder ?? -1) + 1;
        const uploaded = await Promise.all(files.map(async (file, i) => {
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
        }));
        return uploaded;
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cloudinary_service_1.CloudinaryService])
], ProductService);
//# sourceMappingURL=product.service.js.map