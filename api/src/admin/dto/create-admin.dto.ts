import { IsEmail, IsEnum, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';
import { AdminRole } from '../../../generated/prisma';

export class CreateAdminDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(AdminRole)
  @IsOptional()
  role?: AdminRole;

  @IsUUID()
  @IsOptional()
  showroomId?: string;
}
