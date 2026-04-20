import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { ProductOrigin } from '../../../generated/prisma/enums';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  // Auto-generated from name in service if omitted
  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  style?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsEnum(ProductOrigin)
  @IsOptional()
  origin?: ProductOrigin;

  @IsString()
  @IsOptional()
  materials?: string;

  @IsString()
  @IsOptional()
  dimensions?: string;

  @IsString()
  @IsOptional()
  leadTime?: string;

  // Sent as string in multipart form-data, transformed to number
  @Transform(({ value }) => (value !== undefined && value !== '' ? parseFloat(value) : undefined))
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(0)
  @IsOptional()
  price?: number;

  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  priceOnRequest?: boolean;

  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @IsUUID()
  @IsOptional()
  showroomId?: string;

  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  metaTitle?: string;

  @IsString()
  @IsOptional()
  metaDescription?: string;

  // Comma-separated or repeated field in form-data: tag UUIDs to attach
  @Transform(({ value }) => {
    if (!value) return undefined;
    if (Array.isArray(value)) return value;
    return String(value).split(',').filter(Boolean);
  })
  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  tagIds?: string[];
}
