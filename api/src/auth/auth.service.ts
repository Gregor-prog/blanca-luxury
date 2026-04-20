import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  // ─── Validate email + password (used by LocalStrategy) ───────────────────────
  async validateAdmin(email: string, password: string) {
    const admin = await this.prisma.admin.findUnique({ where: { email } });
    if (!admin) return null;

    const passwordMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!passwordMatch) return null;

    // Record last login (fire-and-forget — don't await to keep login fast)
    this.prisma.admin
      .update({ where: { id: admin.id }, data: { lastLogin: new Date() } })
      .catch(() => {});

    const { passwordHash: _omit, ...safe } = admin;
    return safe;
  }

  // ─── Login: issue access + refresh tokens ────────────────────────────────────
  async login(adminId: string, email: string, role: string) {
    const tokens = await this.generateTokens(adminId, email, role);
    return tokens;
  }

  // ─── Refresh: verify refresh token, return new access token ─────────────────
  async refreshTokens(adminId: string, email: string, role: string) {
    const admin = await this.prisma.admin.findUnique({ where: { id: adminId } });
    if (!admin) throw new NotFoundException('Admin not found');

    const { accessToken } = await this.generateTokens(adminId, email, role);
    return { accessToken };
  }

  // ─── Me: load full profile ────────────────────────────────────────────────────
  async getMe(adminId: string) {
    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
      select: {
        id: true,
        email: true,
        role: true,
        showroomId: true,
        lastLogin: true,
        createdAt: true,
        showroom: { select: { id: true, name: true, city: true, address: true } },
      },
    });
    if (!admin) throw new NotFoundException('Admin not found');
    return admin;
  }

  // ─── Token generation ─────────────────────────────────────────────────────────
  private async generateTokens(adminId: string, email: string, role: string) {
    const payload: JwtPayload = { sub: adminId, email, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, {
        secret: this.config.getOrThrow('JWT_SECRET'),
        expiresIn: this.config.get('JWT_EXPIRES_IN', '15m'),
      }),
      this.jwt.signAsync(payload, {
        secret: this.config.getOrThrow('JWT_REFRESH_SECRET'),
        expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN', '7d'),
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
