import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(admin: {
        id: string;
        email: string;
        role: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(admin: {
        sub: string;
        email: string;
        role: string;
    }): Promise<{
        accessToken: string;
    }>;
    getMe(admin: {
        id: string;
    }): Promise<{
        showroom: {
            id: string;
            name: string;
            city: string;
            address: string;
        } | null;
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.AdminRole;
        showroomId: string | null;
        lastLogin: Date | null;
        createdAt: Date;
    }>;
    logout(): {
        message: string;
    };
}
