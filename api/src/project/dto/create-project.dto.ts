import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { ProjectSector } from '../../../generated/prisma';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title!: string;

  // Auto-generated from title in service if omitted
  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ProjectSector)
  @IsOptional()
  sector?: ProjectSector;

  @IsString()
  @IsOptional()
  location?: string;

  @Transform(({ value }) => (value !== undefined && value !== '' ? parseInt(value, 10) : undefined))
  @Type(() => Number)
  @IsInt()
  @Min(1900)
  @IsOptional()
  year?: number;

  @IsString()
  @IsOptional()
  clientName?: string;

  @IsUUID()
  @IsOptional()
  createdById?: string;

  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
