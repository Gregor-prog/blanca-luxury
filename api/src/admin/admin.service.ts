import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AdminRole } from '../../generated/prisma/enums';
import { PrismaService } from '../prisma/prisma.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

const BCRYPT_ROUNDS = 12;

const SAFE_SELECT = {
  id: true,
  email: true,
  role: true,
  showroomId: true,
  lastLogin: true,
  createdAt: true,
  showroom: { select: { id: true, name: true, city: true } },
} as const;

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Create ───────────────────────────────────────────────────────────────────
  async create(dto: CreateAdminDto) {
    const existing = await this.prisma.admin.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new ConflictException('Email already in use');

    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);

    const admin = await this.prisma.admin.create({
      data: {
        email: dto.email,
        passwordHash,
        role: dto.role ?? AdminRole.SHOWROOM_MANAGER,
        showroomId: dto.showroomId ?? null,
      },
      select: SAFE_SELECT,
    });

    return admin;
  }

  // ─── List all ─────────────────────────────────────────────────────────────────
  async findAll() {
    return this.prisma.admin.findMany({
      select: SAFE_SELECT,
      orderBy: { createdAt: 'desc' },
    });
  }

  // ─── Find one ─────────────────────────────────────────────────────────────────
  async findOne(id: string) {
    const admin = await this.prisma.admin.findUnique({
      where: { id },
      select: SAFE_SELECT,
    });
    if (!admin) throw new NotFoundException(`Admin ${id} not found`);
    return admin;
  }

  // ─── Update role / showroom assignment ────────────────────────────────────────
  async update(id: string, dto: UpdateAdminDto) {
    await this.findOne(id); // ensures 404 on missing
    return this.prisma.admin.update({
      where: { id },
      data: dto,
      select: SAFE_SELECT,
    });
  }

  // ─── Change password ──────────────────────────────────────────────────────────
  async changePassword(id: string, dto: ChangePasswordDto) {
    const admin = await this.prisma.admin.findUnique({ where: { id } });
    if (!admin) throw new NotFoundException(`Admin ${id} not found`);

    const valid = await bcrypt.compare(dto.currentPassword, admin.passwordHash);
    if (!valid) throw new BadRequestException('Current password is incorrect');

    if (dto.currentPassword === dto.newPassword) {
      throw new BadRequestException('New password must differ from current password');
    }

    const passwordHash = await bcrypt.hash(dto.newPassword, BCRYPT_ROUNDS);
    await this.prisma.admin.update({ where: { id }, data: { passwordHash } });

    return { message: 'Password updated successfully' };
  }

  // ─── Delete (SUPER_ADMIN only — enforced in controller via RolesGuard) ────────
  async remove(id: string, requesterId: string) {
    if (id === requesterId) {
      throw new ForbiddenException('You cannot delete your own account');
    }
    await this.findOne(id);
    await this.prisma.admin.delete({ where: { id } });
    return { message: 'Admin deleted' };
  }
}
