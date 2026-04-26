import { Cache } from 'cache-manager';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryService {
    private readonly prisma;
    private readonly cloudinary;
    private readonly cache;
    constructor(prisma: PrismaService, cloudinary: CloudinaryService, cache: Cache);
    create(dto: CreateCategoryDto, imageFile?: Express.Multer.File): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        displayOrder: number;
        slug: string;
        description: string | null;
        icon: string | null;
        imageUrl: string | null;
        imageCloudinaryId: string | null;
    }>;
    findAll(activeOnly?: boolean): Promise<{}>;
    findOne(id: string): Promise<{
        id: string;
        _count: {
            products: number;
        };
        name: string;
        isActive: boolean;
        displayOrder: number;
        slug: string;
        description: string | null;
        icon: string | null;
        imageUrl: string | null;
        imageCloudinaryId: string | null;
    }>;
    findBySlug(slug: string): Promise<{
        id: string;
        _count: {
            products: number;
        };
        name: string;
        isActive: boolean;
        displayOrder: number;
        slug: string;
        description: string | null;
        icon: string | null;
        imageUrl: string | null;
        imageCloudinaryId: string | null;
    }>;
    update(id: string, dto: UpdateCategoryDto): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        displayOrder: number;
        slug: string;
        description: string | null;
        icon: string | null;
        imageUrl: string | null;
        imageCloudinaryId: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    uploadImage(id: string, file: Express.Multer.File): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        displayOrder: number;
        slug: string;
        description: string | null;
        icon: string | null;
        imageUrl: string | null;
        imageCloudinaryId: string | null;
    }>;
    removeImage(id: string): Promise<{
        message: string;
    }>;
    private bustCache;
}
