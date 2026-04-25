import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { AdminRole } from '@prisma/client';

export class UpdateAdminDto {
  @IsEnum(AdminRole)
  @IsOptional()
  role?: AdminRole;

  @IsUUID()
  @IsOptional()
  showroomId?: string;
}
