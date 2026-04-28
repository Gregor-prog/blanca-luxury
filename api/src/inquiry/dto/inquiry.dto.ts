import { IsEmail, IsEnum, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { InquirySource, InquiryStatus, ServiceInterest } from '@prisma/client';

export class CreateInquiryDto {
  @IsString()
  @MaxLength(120)
  fullName: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  message?: string;

  @IsOptional()
  @IsEnum(ServiceInterest)
  serviceInterest?: ServiceInterest;

  @IsOptional()
  @IsEnum(InquirySource)
  source?: InquirySource;

  @IsOptional()
  @IsUUID()
  showroomId?: string;

  @IsOptional()
  @IsUUID()
  productId?: string;
}

export class UpdateInquiryDto {
  @IsOptional()
  @IsEnum(InquiryStatus)
  status?: InquiryStatus;

  @IsOptional()
  @IsUUID()
  assignedTo?: string;
}

export class InquiryQueryDto {
  @IsOptional()
  @IsEnum(InquiryStatus)
  status?: InquiryStatus;

  @IsOptional()
  @IsUUID()
  showroomId?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}
