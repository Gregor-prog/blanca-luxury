import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AdminRole } from '@prisma/client';
import { Public } from '../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectQueryDto } from './dto/project-query.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';

const UPLOAD_OPTIONS = {
  storage: memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
};

@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // ─── Public ───────────────────────────────────────────────────────────────────
  @Public()
  @Get()
  findAll(@Query() query: ProjectQueryDto) {
    return this.projectService.findAll(query);
  }

  @Public()
  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.projectService.findBySlug(slug);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectService.findOne(id);
  }

  // ─── Create with optional cover + media files ─────────────────────────────────
  @Roles(AdminRole.SUPER_ADMIN, AdminRole.SHOWROOM_MANAGER)
  @Post()
  @UseInterceptors(FilesInterceptor('files', 21, UPLOAD_OPTIONS))
  async create(
    @Body() dto: CreateProjectDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: any,
  ) {
    const all = files ?? [];
    // Convention: first file named 'cover' is the cover; rest go to media gallery
    const coverFile = all.find((f) => f.fieldname === 'cover');
    const mediaFiles = all.filter((f) => f.fieldname !== 'cover');

    return this.projectService.create(
      { ...dto, createdById: req.user?.id },
      coverFile,
      mediaFiles,
    );
  }

  // ─── Update metadata ──────────────────────────────────────────────────────────
  @Roles(AdminRole.SUPER_ADMIN, AdminRole.SHOWROOM_MANAGER)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProjectDto,
  ) {
    return this.projectService.update(id, dto);
  }

  // ─── Cover image management ───────────────────────────────────────────────────
  @Roles(AdminRole.SUPER_ADMIN, AdminRole.SHOWROOM_MANAGER)
  @Post(':id/cover')
  @UseInterceptors(FileInterceptor('image', UPLOAD_OPTIONS))
  uploadCover(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.projectService.uploadCover(id, file);
  }

  @Roles(AdminRole.SUPER_ADMIN, AdminRole.SHOWROOM_MANAGER)
  @Delete(':id/cover')
  removeCover(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectService.removeCover(id);
  }

  // ─── Media gallery management ─────────────────────────────────────────────────
  @Roles(AdminRole.SUPER_ADMIN, AdminRole.SHOWROOM_MANAGER)
  @Post(':id/media')
  @UseInterceptors(FilesInterceptor('files', 20, UPLOAD_OPTIONS))
  addMedia(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.projectService.addMedia(id, files ?? []);
  }

  @Roles(AdminRole.SUPER_ADMIN, AdminRole.SHOWROOM_MANAGER)
  @Patch(':id/media/:mediaId')
  updateMedia(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('mediaId', ParseUUIDPipe) mediaId: string,
    @Body('caption') caption: string,
  ) {
    return this.projectService.updateMedia(id, mediaId, caption);
  }

  @Roles(AdminRole.SUPER_ADMIN, AdminRole.SHOWROOM_MANAGER)
  @Delete(':id/media/:mediaId')
  removeMedia(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('mediaId', ParseUUIDPipe) mediaId: string,
  ) {
    return this.projectService.removeMedia(id, mediaId);
  }

  // ─── Delete project ───────────────────────────────────────────────────────────
  @Roles(AdminRole.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectService.remove(id);
  }
}
