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
import { AdminRole } from '@prisma/client';
import { Public } from '../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

const UPLOAD_OPTIONS = {
  storage: memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 }, // 15 MB
};

@Controller('collections')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  // ─── Public ───────────────────────────────────────────────────────────────────

  @Public()
  @Get()
  findAll(
    @Query('activeOnly') activeOnly?: string,
    @Query('featured') featured?: string,
    @Query('showroomId') showroomId?: string,
  ) {
    const onlyActive = activeOnly !== 'false';
    const isFeatured =
      featured === 'true' ? true : featured === 'false' ? false : undefined;
    return this.collectionService.findAll(onlyActive, isFeatured, showroomId);
  }

  @Public()
  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.collectionService.findBySlug(slug);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.collectionService.findOne(id);
  }

  @Public()
  @Get(':id/products')
  getProducts(@Param('id', ParseUUIDPipe) id: string) {
    return this.collectionService.getProducts(id);
  }

  // ─── Admin: create with optional cover image ──────────────────────────────────

  @Roles(AdminRole.SUPER_ADMIN)
  @Post()
  @UseInterceptors(FileInterceptor('image', UPLOAD_OPTIONS))
  create(
    @Body() dto: CreateCollectionDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.collectionService.create(dto, image);
  }

  // ─── Admin: update metadata ───────────────────────────────────────────────────

  @Roles(AdminRole.SUPER_ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCollectionDto,
  ) {
    return this.collectionService.update(id, dto);
  }

  // ─── Admin: image management ──────────────────────────────────────────────────

  @Roles(AdminRole.SUPER_ADMIN)
  @Post(':id/image')
  @UseInterceptors(FileInterceptor('image', UPLOAD_OPTIONS))
  uploadImage(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.collectionService.uploadImage(id, file);
  }

  @Roles(AdminRole.SUPER_ADMIN)
  @Delete(':id/image')
  removeImage(@Param('id', ParseUUIDPipe) id: string) {
    return this.collectionService.removeImage(id);
  }

  // ─── Admin: product membership ────────────────────────────────────────────────

  @Roles(AdminRole.SUPER_ADMIN)
  @Post(':id/products')
  addProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('productId') productId: string,
  ) {
    return this.collectionService.addProduct(id, productId);
  }

  @Roles(AdminRole.SUPER_ADMIN)
  @Delete(':id/products/:productId')
  removeProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('productId', ParseUUIDPipe) productId: string,
  ) {
    return this.collectionService.removeProduct(id, productId);
  }

  // ─── Admin: delete ────────────────────────────────────────────────────────────

  @Roles(AdminRole.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.collectionService.remove(id);
  }
}
