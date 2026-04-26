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
exports.ShowroomService = exports.CACHE_KEY_ALL = exports.CACHE_KEY_ACTIVE = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const prisma_service_1 = require("../prisma/prisma.service");
exports.CACHE_KEY_ACTIVE = 'showrooms:active';
exports.CACHE_KEY_ALL = 'showrooms:all';
const IMAGE_SELECT = {
    id: true,
    url: true,
    cloudinaryId: true,
    caption: true,
    displayOrder: true,
};
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
};
const SHOWROOM_DETAIL_SELECT = {
    ...SHOWROOM_SELECT,
    showroomImages: {
        orderBy: { displayOrder: 'asc' },
        select: IMAGE_SELECT,
    },
};
let ShowroomService = class ShowroomService {
    constructor(prisma, cloudinary, cache) {
        this.prisma = prisma;
        this.cloudinary = cloudinary;
        this.cache = cache;
    }
    async create(dto) {
        const existing = await this.prisma.showroom.findFirst({
            where: { name: dto.name, city: dto.city },
        });
        if (existing) {
            throw new common_1.ConflictException(`Showroom "${dto.name}" already exists in ${dto.city}`);
        }
        const showroom = await this.prisma.showroom.create({
            data: dto,
            select: SHOWROOM_SELECT,
        });
        await this.bustCache();
        return showroom;
    }
    async findAll(activeOnly = false) {
        const key = activeOnly ? exports.CACHE_KEY_ACTIVE : exports.CACHE_KEY_ALL;
        const cached = await this.cache.get(key);
        if (cached)
            return cached;
        const rows = await this.prisma.showroom.findMany({
            where: activeOnly ? { isActive: true } : undefined,
            select: SHOWROOM_SELECT,
            orderBy: { city: 'asc' },
        });
        await this.cache.set(key, rows);
        return rows;
    }
    async findOne(id) {
        const showroom = await this.prisma.showroom.findUnique({
            where: { id },
            select: SHOWROOM_DETAIL_SELECT,
        });
        if (!showroom)
            throw new common_1.NotFoundException(`Showroom ${id} not found`);
        return showroom;
    }
    async update(id, dto) {
        await this.findOne(id);
        const showroom = await this.prisma.showroom.update({
            where: { id },
            data: dto,
            select: SHOWROOM_SELECT,
        });
        await this.bustCache();
        return showroom;
    }
    async remove(id) {
        const showroom = await this.findOne(id);
        const images = await this.prisma.showroomImage.findMany({
            where: { showroomId: id },
            select: { cloudinaryId: true },
        });
        const cloudinaryIds = [
            ...(showroom.coverCloudinaryId ? [showroom.coverCloudinaryId] : []),
            ...images.map((i) => i.cloudinaryId).filter((cid) => cid !== null),
        ];
        await Promise.all([
            this.prisma.showroom.delete({ where: { id } }),
            this.cloudinary.deleteMany(cloudinaryIds),
        ]);
        await this.bustCache();
        return { message: 'Showroom deleted' };
    }
    async uploadCover(id, file) {
        const showroom = await this.findOne(id);
        const result = await this.cloudinary.upload(file.buffer, `blanca-luxury/showrooms/${id}/cover`);
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
    async removeCover(id) {
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
    async addImages(id, files) {
        await this.findOne(id);
        const currentMax = await this.prisma.showroomImage.aggregate({
            where: { showroomId: id },
            _max: { displayOrder: true },
        });
        let nextOrder = (currentMax._max.displayOrder ?? -1) + 1;
        const uploaded = await Promise.all(files.map(async (file) => {
            const result = await this.cloudinary.upload(file.buffer, `blanca-luxury/showrooms/${id}/gallery`);
            return this.prisma.showroomImage.create({
                data: {
                    showroomId: id,
                    url: result.secure_url,
                    cloudinaryId: result.public_id,
                    displayOrder: nextOrder++,
                },
                select: IMAGE_SELECT,
            });
        }));
        await this.bustCache();
        return uploaded;
    }
    async removeImage(showroomId, imageId) {
        const image = await this.prisma.showroomImage.findFirst({
            where: { id: imageId, showroomId },
        });
        if (!image)
            throw new common_1.NotFoundException(`Image ${imageId} not found on showroom ${showroomId}`);
        await this.prisma.showroomImage.delete({ where: { id: imageId } });
        if (image.cloudinaryId) {
            await this.cloudinary.delete(image.cloudinaryId);
        }
        return { message: 'Image removed' };
    }
    async bustCache() {
        await Promise.all([
            this.cache.del(exports.CACHE_KEY_ACTIVE),
            this.cache.del(exports.CACHE_KEY_ALL),
        ]);
    }
};
exports.ShowroomService = ShowroomService;
exports.ShowroomService = ShowroomService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cloudinary_service_1.CloudinaryService, Object])
], ShowroomService);
//# sourceMappingURL=showroom.service.js.map