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
exports.ProjectController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const client_1 = require("@prisma/client");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../roles/roles.decorator");
const roles_guard_1 = require("../roles/roles.guard");
const create_project_dto_1 = require("./dto/create-project.dto");
const project_query_dto_1 = require("./dto/project-query.dto");
const update_project_dto_1 = require("./dto/update-project.dto");
const project_service_1 = require("./project.service");
const UPLOAD_OPTIONS = {
    storage: (0, multer_1.memoryStorage)(),
    limits: { fileSize: 50 * 1024 * 1024 },
};
let ProjectController = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
    }
    findAll(query) {
        return this.projectService.findAll(query);
    }
    findBySlug(slug) {
        return this.projectService.findBySlug(slug);
    }
    findOne(id) {
        return this.projectService.findOne(id);
    }
    async create(dto, files, req) {
        const all = files ?? [];
        const coverFile = all.find((f) => f.fieldname === 'cover');
        const mediaFiles = all.filter((f) => f.fieldname !== 'cover');
        return this.projectService.create({ ...dto, createdById: req.user?.id }, coverFile, mediaFiles);
    }
    update(id, dto) {
        return this.projectService.update(id, dto);
    }
    uploadCover(id, file) {
        return this.projectService.uploadCover(id, file);
    }
    removeCover(id) {
        return this.projectService.removeCover(id);
    }
    addMedia(id, files) {
        return this.projectService.addMedia(id, files ?? []);
    }
    updateMedia(id, mediaId, caption) {
        return this.projectService.updateMedia(id, mediaId, caption);
    }
    removeMedia(id, mediaId) {
        return this.projectService.removeMedia(id, mediaId);
    }
    remove(id) {
        return this.projectService.remove(id);
    }
};
exports.ProjectController = ProjectController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_query_dto_1.ProjectQueryDto]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('slug/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "findBySlug", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.AdminRole.SUPER_ADMIN, client_1.AdminRole.SHOWROOM_MANAGER),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 21, UPLOAD_OPTIONS)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto, Array, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.AdminRole.SUPER_ADMIN, client_1.AdminRole.SHOWROOM_MANAGER),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_project_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.AdminRole.SUPER_ADMIN, client_1.AdminRole.SHOWROOM_MANAGER),
    (0, common_1.Post)(':id/cover'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', UPLOAD_OPTIONS)),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "uploadCover", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.AdminRole.SUPER_ADMIN, client_1.AdminRole.SHOWROOM_MANAGER),
    (0, common_1.Delete)(':id/cover'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "removeCover", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.AdminRole.SUPER_ADMIN, client_1.AdminRole.SHOWROOM_MANAGER),
    (0, common_1.Post)(':id/media'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 20, UPLOAD_OPTIONS)),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "addMedia", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.AdminRole.SUPER_ADMIN, client_1.AdminRole.SHOWROOM_MANAGER),
    (0, common_1.Patch)(':id/media/:mediaId'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)('mediaId', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)('caption')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "updateMedia", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.AdminRole.SUPER_ADMIN, client_1.AdminRole.SHOWROOM_MANAGER),
    (0, common_1.Delete)(':id/media/:mediaId'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)('mediaId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "removeMedia", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.AdminRole.SUPER_ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "remove", null);
exports.ProjectController = ProjectController = __decorate([
    (0, common_1.Controller)('projects'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
//# sourceMappingURL=project.controller.js.map