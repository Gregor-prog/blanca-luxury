import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectQueryDto } from './dto/project-query.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectService {
    private readonly prisma;
    private readonly cloudinary;
    constructor(prisma: PrismaService, cloudinary: CloudinaryService);
    create(dto: CreateProjectDto, coverFile?: Express.Multer.File, mediaFiles?: Express.Multer.File[]): Promise<{
        id: string;
        createdAt: Date;
        coverImageUrl: string | null;
        coverCloudinaryId: string | null;
        isActive: boolean;
        year: number | null;
        slug: string;
        description: string | null;
        isFeatured: boolean;
        media: {
            id: string;
            url: string;
            cloudinaryId: string | null;
            caption: string | null;
            displayOrder: number;
            mediaType: import("@prisma/client").$Enums.MediaType;
        }[];
        title: string;
        sector: import("@prisma/client").$Enums.ProjectSector;
        location: string | null;
        clientName: string | null;
    }>;
    findAll(query: ProjectQueryDto): Promise<{
        data: {
            id: string;
            coverImageUrl: string | null;
            isActive: boolean;
            year: number | null;
            slug: string;
            isFeatured: boolean;
            media: {
                id: string;
                url: string;
            }[];
            title: string;
            sector: import("@prisma/client").$Enums.ProjectSector;
            location: string | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        coverImageUrl: string | null;
        coverCloudinaryId: string | null;
        isActive: boolean;
        year: number | null;
        slug: string;
        description: string | null;
        isFeatured: boolean;
        media: {
            id: string;
            url: string;
            cloudinaryId: string | null;
            caption: string | null;
            displayOrder: number;
            mediaType: import("@prisma/client").$Enums.MediaType;
        }[];
        title: string;
        sector: import("@prisma/client").$Enums.ProjectSector;
        location: string | null;
        clientName: string | null;
    }>;
    findBySlug(slug: string): Promise<{
        id: string;
        createdAt: Date;
        coverImageUrl: string | null;
        coverCloudinaryId: string | null;
        isActive: boolean;
        year: number | null;
        slug: string;
        description: string | null;
        isFeatured: boolean;
        media: {
            id: string;
            url: string;
            cloudinaryId: string | null;
            caption: string | null;
            displayOrder: number;
            mediaType: import("@prisma/client").$Enums.MediaType;
        }[];
        title: string;
        sector: import("@prisma/client").$Enums.ProjectSector;
        location: string | null;
        clientName: string | null;
    }>;
    update(id: string, dto: UpdateProjectDto): Promise<{
        id: string;
        createdAt: Date;
        coverImageUrl: string | null;
        coverCloudinaryId: string | null;
        isActive: boolean;
        year: number | null;
        slug: string;
        description: string | null;
        isFeatured: boolean;
        media: {
            id: string;
            url: string;
            cloudinaryId: string | null;
            caption: string | null;
            displayOrder: number;
            mediaType: import("@prisma/client").$Enums.MediaType;
        }[];
        title: string;
        sector: import("@prisma/client").$Enums.ProjectSector;
        location: string | null;
        clientName: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    uploadCover(id: string, file: Express.Multer.File): Promise<{
        id: string;
        createdAt: Date;
        coverImageUrl: string | null;
        coverCloudinaryId: string | null;
        isActive: boolean;
        year: number | null;
        slug: string;
        description: string | null;
        isFeatured: boolean;
        media: {
            id: string;
            url: string;
            cloudinaryId: string | null;
            caption: string | null;
            displayOrder: number;
            mediaType: import("@prisma/client").$Enums.MediaType;
        }[];
        title: string;
        sector: import("@prisma/client").$Enums.ProjectSector;
        location: string | null;
        clientName: string | null;
    }>;
    removeCover(id: string): Promise<{
        message: string;
    }>;
    addMedia(projectId: string, files: Express.Multer.File[]): Promise<{
        id: string;
        url: string;
        cloudinaryId: string | null;
        caption: string | null;
        displayOrder: number;
        mediaType: import("@prisma/client").$Enums.MediaType;
    }[]>;
    updateMedia(projectId: string, mediaId: string, caption: string): Promise<{
        id: string;
        url: string;
        cloudinaryId: string | null;
        caption: string | null;
        displayOrder: number;
        mediaType: import("@prisma/client").$Enums.MediaType;
    }>;
    removeMedia(projectId: string, mediaId: string): Promise<{
        message: string;
    }>;
}
