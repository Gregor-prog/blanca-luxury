import { AdminRole } from '@prisma/client';
export declare class CreateAdminDto {
    email: string;
    password: string;
    role?: AdminRole;
    showroomId?: string;
}
