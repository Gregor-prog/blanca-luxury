import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name!: string;

  // Auto-generated from name if omitted
  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  description?: string;

  // Short badge label, e.g. "NEW ARRIVAL", "LIMITED EDITION"
  @IsString()
  @IsOptional()
  @MaxLength(50)
  badgeText?: string;

  // Editorial year, e.g. 2025
  @Transform(({ value }) =>
    value !== undefined && value !== '' ? parseInt(value, 10) : undefined,
  )
  @Type(() => Number)
  @IsInt()
  @Min(2000)
  @IsOptional()
  year?: number;

  // Optional showroom association (controls regional visibility)
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

  @Transform(({ value }) =>
    value !== undefined && value !== '' ? parseInt(value, 10) : undefined,
  )
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  displayOrder?: number;
}
