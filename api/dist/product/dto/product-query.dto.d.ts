import { ProductOrigin } from '@prisma/client';
export declare class ProductQueryDto {
    page?: number;
    limit?: number;
    categoryId?: string;
    showroomId?: string;
    origin?: ProductOrigin;
    isFeatured?: boolean;
    isActive?: boolean;
    search?: string;
    sortBy?: 'name' | 'price' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
}
