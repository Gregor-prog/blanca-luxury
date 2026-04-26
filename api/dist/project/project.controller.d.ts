import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectQueryDto } from './dto/project-query.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
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
    create(dto: CreateProjectDto, files: Express.Multer.File[], req: any): Promise<{
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
    addMedia(id: string, files: Express.Multer.File[]): Promise<{
        id: string;
        url: string;
        cloudinaryId: string | null;
        caption: string | null;
        displayOrder: number;
        mediaType: import("@prisma/client").$Enums.MediaType;
    }[]>;
    updateMedia(id: string, mediaId: string, caption: string): Promise<{
        id: string;
        url: string;
        cloudinaryId: string | null;
        caption: string | null;
        displayOrder: number;
        mediaType: import("@prisma/client").$Enums.MediaType;
    }>;
    removeMedia(id: string, mediaId: string): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
