import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    private readonly config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    validateAdmin(email: string, password: string): Promise<{
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.AdminRole;
        showroomId: string | null;
        lastLogin: Date | null;
        createdAt: Date;
    } | null>;
    login(adminId: string, email: string, role: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshTokens(adminId: string, email: string, role: string): Promise<{
        accessToken: string;
    }>;
    getMe(adminId: string): Promise<{
        showroom: {
            id: string;
            name: string;
            city: string;
            address: string;
        } | null;
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.AdminRole;
        showroomId: string | null;
        lastLogin: Date | null;
        createdAt: Date;
    }>;
    private generateTokens;
}
