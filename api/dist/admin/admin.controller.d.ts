import { AdminService } from './admin.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
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
    changePassword(id: string, dto: ChangePasswordDto, me: {
        id: string;
        role: string;
    }): Promise<{
        message: string;
    }> | {
        message: string;
    };
    remove(id: string, me: {
        id: string;
    }): Promise<{
        message: string;
    }>;
}
