import { PrismaService } from '../prisma/prisma.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateAdminDto): Promise<{
        showroom: {
            id: string;
            name: string;
            city: string;
        } | null;
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.AdminRole;
        showroomId: string | null;
        lastLogin: Date | null;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        showroom: {
            id: string;
            name: string;
            city: string;
        } | null;
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.AdminRole;
        showroomId: string | null;
        lastLogin: Date | null;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        showroom: {
            id: string;
            name: string;
            city: string;
        } | null;
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.AdminRole;
        showroomId: string | null;
        lastLogin: Date | null;
        createdAt: Date;
    }>;
    update(id: string, dto: UpdateAdminDto): Promise<{
        showroom: {
            id: string;
            name: string;
            city: string;
        } | null;
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.AdminRole;
        showroomId: string | null;
        lastLogin: Date | null;
        createdAt: Date;
    }>;
    changePassword(id: string, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    remove(id: string, requesterId: string): Promise<{
        message: string;
    }>;
}
