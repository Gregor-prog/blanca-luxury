import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { AdminRole } from '../../../generated/prisma';

export class UpdateAdminDto {
  @IsEnum(AdminRole)
  @IsOptional()
  role?: AdminRole;

  @IsUUID()
  @IsOptional()
  showroomId?: string;
}
