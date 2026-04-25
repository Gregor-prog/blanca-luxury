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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AdminRole } from '@prisma/client';
import { Public } from '../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

const UPLOAD_OPTIONS = {
  storage: memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB per file
};

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // ─── Public: list products (catalogue) ──────────────────────────────────────
  @Public()
  @Get()
  findAll(@Query() query: ProductQueryDto) {
    return this.productService.findAll(query);
  }

  // ─── Public: single product by ID ───────────────────────────────────────────
  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.findOne(id);
  }

  // ─── Public: single product by slug (SEO-friendly URLs) ─────────────────────
  @Public()
  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.productService.findBySlug(slug);
  }

  // ─── Admin: create product + optional images ─────────────────────────────────
  @Roles(AdminRole.SUPER_ADMIN, AdminRole.SHOWROOM_MANAGER)
  @Post()
  @UseInterceptors(FilesInterceptor('images', 20, UPLOAD_OPTIONS))
  create(
    @Body() dto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: any,
  ) {
    return this.productService.create(dto, files ?? [], req.user?.id);
  }

  // ─── Admin: update product metadata ──────────────────────────────────────────
  @Roles(AdminRole.SUPER_ADMIN, AdminRole.SHOWROOM_MANAGER)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productService.update(id, dto);
  }

  // ─── Admin: add images / PDFs / assets to an existing product ────────────────
  @Roles(AdminRole.SUPER_ADMIN, AdminRole.SHOWROOM_MANAGER)
  @Post(':id/media')
  @UseInterceptors(FilesInterceptor('files', 20, UPLOAD_OPTIONS))
  addMedia(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.productService.addMedia(id, files ?? []);
  }

  // ─── Admin: remove a specific media item ─────────────────────────────────────
  @Roles(AdminRole.SUPER_ADMIN, AdminRole.SHOWROOM_MANAGER)
  @Delete(':id/media/:mediaId')
  removeMedia(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('mediaId', ParseUUIDPipe) mediaId: string,
  ) {
    return this.productService.removeMedia(id, mediaId);
  }

  // ─── Admin: delete product ────────────────────────────────────────────────────
  @Roles(AdminRole.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.remove(id);
  }
}
