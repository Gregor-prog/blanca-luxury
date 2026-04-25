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
import { CreateShowroomDto, UpdateShowroomDto } from './dto/showroom.dto';
import { ShowroomService } from './showroom.service';

const UPLOAD_OPTIONS = {
  storage: memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
};

@Controller('showrooms')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ShowroomController {
  constructor(private readonly showroomService: ShowroomService) {}

  // ─── Public: active showrooms (frontend) ─────────────────────────────────────
  @Public()
  @Get('active')
  findActive() {
    return this.showroomService.findAll(true);
  }

  // ─── SUPER_ADMIN: CRUD ────────────────────────────────────────────────────────
  @Roles(AdminRole.SUPER_ADMIN)
  @Post()
  create(@Body() dto: CreateShowroomDto) {
    return this.showroomService.create(dto);
  }

  @Roles(AdminRole.SUPER_ADMIN)
  @Get()
  findAll(@Query('activeOnly') activeOnly?: string) {
    return this.showroomService.findAll(activeOnly === 'true');
  }

  @Roles(AdminRole.SUPER_ADMIN)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.showroomService.findOne(id);
  }

  @Roles(AdminRole.SUPER_ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateShowroomDto,
  ) {
    return this.showroomService.update(id, dto);
  }

  @Roles(AdminRole.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.showroomService.remove(id);
  }

  // ─── Cover image ─────────────────────────────────────────────────────────────
  @Roles(AdminRole.SUPER_ADMIN)
  @Post(':id/cover')
  @UseInterceptors(FileInterceptor('image', UPLOAD_OPTIONS))
  uploadCover(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.showroomService.uploadCover(id, file);
  }

  @Roles(AdminRole.SUPER_ADMIN)
  @Delete(':id/cover')
  removeCover(@Param('id', ParseUUIDPipe) id: string) {
    return this.showroomService.removeCover(id);
  }

  // ─── Gallery images ───────────────────────────────────────────────────────────
  @Roles(AdminRole.SUPER_ADMIN)
  @Post(':id/images')
  @UseInterceptors(FilesInterceptor('images', 20, UPLOAD_OPTIONS))
  addImages(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.showroomService.addImages(id, files ?? []);
  }

  @Roles(AdminRole.SUPER_ADMIN)
  @Delete(':id/images/:imageId')
  removeImage(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('imageId', ParseUUIDPipe) imageId: string,
  ) {
    return this.showroomService.removeImage(id, imageId);
  }
}
