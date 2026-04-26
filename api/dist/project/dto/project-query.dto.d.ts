import { ProjectSector } from '@prisma/client';
export declare class ProjectQueryDto {
    page?: number;
    limit?: number;
    sector?: ProjectSector;
    isFeatured?: boolean;
    isActive?: boolean;
    search?: string;
    sortBy?: 'title' | 'year' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
}
