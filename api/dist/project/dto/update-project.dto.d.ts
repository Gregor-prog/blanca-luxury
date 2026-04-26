import { ProjectSector } from '@prisma/client';
export declare class UpdateProjectDto {
    title?: string;
    slug?: string;
    description?: string;
    sector?: ProjectSector;
    location?: string;
    year?: number;
    clientName?: string;
    isFeatured?: boolean;
    isActive?: boolean;
}
