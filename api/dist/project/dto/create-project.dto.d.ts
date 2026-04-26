import { ProjectSector } from '@prisma/client';
export declare class CreateProjectDto {
    title: string;
    slug?: string;
    description?: string;
    sector?: ProjectSector;
    location?: string;
    year?: number;
    clientName?: string;
    createdById?: string;
    isFeatured?: boolean;
    isActive?: boolean;
}
