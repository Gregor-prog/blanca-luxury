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
exports.ShowroomController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const client_1 = require("@prisma/client");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../roles/roles.decorator");
const roles_guard_1 = require("../roles/roles.guard");
const showroom_dto_1 = require("./dto/showroom.dto");
const showroom_service_1 = require("./showroom.service");
const UPLOAD_OPTIONS = {
    storage: (0, multer_1.memoryStorage)(),
    limits: { fileSize: 20 * 1024 * 1024 },
};
let ShowroomController = class ShowroomController {
    constructor(showroomService) {
        this.showroomService = showroomService;
    }
    findActive() {
        return this.showroomService.findAll(true);
    }
    create(dto) {
        return this.showroomService.create(dto);
    }
    findAll(activeOnly) {
        return this.showroomService.findAll(activeOnly === 'true');
    }
    findOne(id) {
        return this.showroomService.findOne(id);
    }
    update(id, dto) {
        return this.showroomService.update(id, dto);
    }
    remove(id) {
        return this.showroomService.remove(id);
    }
    uploadCover(id, file) {
        return this.showroomService.uploadCover(id, file);
    }
    removeCover(id) {
        return this.showroomService.removeCover(id);
    }
    addImages(id, files) {
        return this.showroomService.addImages(id, files ?? []);
    }
    removeImage(id, imageId) {
        return this.showroomService.removeImage(id, imageId);
    }
};
exports.ShowroomController = ShowroomController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ShowroomController.prototype, "findActive", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.AdminRole.SUPER_ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [showroom_dto_1.CreateShowroomDto]),
    __metadata("design:returntype", void 0)
], ShowroomController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.AdminRole.SUPER_ADMIN),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('activeOnly')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShowroomController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.AdminRole.SUPER_ADMIN),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShowroomController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.AdminRole.SUPER_ADMIN),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, showroom_dto_1.UpdateShowroomDto]),
    __metadata("design:returntype", void 0)
], ShowroomController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.AdminRole.SUPER_ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShowroomController.prototype, "remove", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.AdminRole.SUPER_ADMIN),
    (0, common_1.Post)(':id/cover'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', UPLOAD_OPTIONS)),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ShowroomController.prototype, "uploadCover", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.AdminRole.SUPER_ADMIN),
    (0, common_1.Delete)(':id/cover'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShowroomController.prototype, "removeCover", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.AdminRole.SUPER_ADMIN),
    (0, common_1.Post)(':id/images'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 20, UPLOAD_OPTIONS)),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", void 0)
], ShowroomController.prototype, "addImages", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.AdminRole.SUPER_ADMIN),
    (0, common_1.Delete)(':id/images/:imageId'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)('imageId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ShowroomController.prototype, "removeImage", null);
exports.ShowroomController = ShowroomController = __decorate([
    (0, common_1.Controller)('showrooms'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [showroom_service_1.ShowroomService])
], ShowroomController);
//# sourceMappingURL=showroom.controller.js.map