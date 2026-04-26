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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const prisma_service_1 = require("../prisma/prisma.service");
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
};
const CATEGORY_WITH_COUNT_SELECT = {
    ...CATEGORY_SELECT,
    _count: { select: { products: true } },
};
function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}
let CategoryService = class CategoryService {
    constructor(prisma, cloudinary, cache) {
        this.prisma = prisma;
        this.cloudinary = cloudinary;
        this.cache = cache;
    }
    async create(dto, imageFile) {
        const slug = dto.slug ?? slugify(dto.name);
        const exists = await this.prisma.category.findUnique({ where: { slug } });
        if (exists)
            throw new common_1.ConflictException(`Slug "${slug}" already in use`);
        let imageUrl;
        let imageCloudinaryId;
        if (imageFile) {
            const result = await this.cloudinary.upload(imageFile.buffer, 'blanca-luxury/categories');
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
    async findAll(activeOnly = false) {
        const key = activeOnly ? CACHE_KEY_ACTIVE : CACHE_KEY_ALL;
        const cached = await this.cache.get(key);
        if (cached)
            return cached;
        const rows = await this.prisma.category.findMany({
            where: activeOnly ? { isActive: true } : undefined,
            select: CATEGORY_WITH_COUNT_SELECT,
            orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
        });
        await this.cache.set(key, rows);
        return rows;
    }
    async findOne(id) {
        const category = await this.prisma.category.findUnique({
            where: { id },
            select: CATEGORY_WITH_COUNT_SELECT,
        });
        if (!category)
            throw new common_1.NotFoundException(`Category ${id} not found`);
        return category;
    }
    async findBySlug(slug) {
        const category = await this.prisma.category.findUnique({
            where: { slug },
            select: CATEGORY_WITH_COUNT_SELECT,
        });
        if (!category)
            throw new common_1.NotFoundException(`Category "${slug}" not found`);
        return category;
    }
    async update(id, dto) {
        await this.findOne(id);
        const { slug, name, ...rest } = dto;
        const newSlug = slug ?? (name ? slugify(name) : undefined);
        if (newSlug) {
            const conflict = await this.prisma.category.findFirst({
                where: { slug: newSlug, NOT: { id } },
            });
            if (conflict)
                throw new common_1.ConflictException(`Slug "${newSlug}" already in use`);
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
    async remove(id) {
        const category = await this.findOne(id);
        await this.prisma.category.delete({ where: { id } });
        if (category.imageCloudinaryId) {
            await this.cloudinary.delete(category.imageCloudinaryId);
        }
        await this.bustCache();
        return { message: 'Category deleted' };
    }
    async uploadImage(id, file) {
        const category = await this.findOne(id);
        const result = await this.cloudinary.upload(file.buffer, 'blanca-luxury/categories');
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
    async removeImage(id) {
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
    async bustCache() {
        await Promise.all([
            this.cache.del(CACHE_KEY_ACTIVE),
            this.cache.del(CACHE_KEY_ALL),
        ]);
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cloudinary_service_1.CloudinaryService, Object])
], CategoryService);
//# sourceMappingURL=category.service.js.map