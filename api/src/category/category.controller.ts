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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AdminRole } from '../../generated/prisma/enums';
import { Public } from '../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

const UPLOAD_OPTIONS = {
  storage: memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB — category images are small
};

@Controller('categories')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // ─── Public ───────────────────────────────────────────────────────────────────
  @Public()
  @Get()
  findAll(@Query('activeOnly') activeOnly?: string) {
    return this.categoryService.findAll(activeOnly !== 'false');
  }

  @Public()
  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.categoryService.findBySlug(slug);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoryService.findOne(id);
  }

  // ─── Admin: create with optional image ────────────────────────────────────────
  @Roles(AdminRole.SUPER_ADMIN)
  @Post()
  @UseInterceptors(FileInterceptor('image', UPLOAD_OPTIONS))
  create(
    @Body() dto: CreateCategoryDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.categoryService.create(dto, image);
  }

  // ─── Admin: update metadata ───────────────────────────────────────────────────
  @Roles(AdminRole.SUPER_ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, dto);
  }

  // ─── Admin: image management ──────────────────────────────────────────────────
  @Roles(AdminRole.SUPER_ADMIN)
  @Post(':id/image')
  @UseInterceptors(FileInterceptor('image', UPLOAD_OPTIONS))
  uploadImage(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.categoryService.uploadImage(id, file);
  }

  @Roles(AdminRole.SUPER_ADMIN)
  @Delete(':id/image')
  removeImage(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoryService.removeImage(id);
  }

  // ─── Admin: delete ────────────────────────────────────────────────────────────
  @Roles(AdminRole.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoryService.remove(id);
  }
}
