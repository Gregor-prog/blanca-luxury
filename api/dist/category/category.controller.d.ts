import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    findAll(activeOnly?: string): Promise<{}>;
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
    create(dto: CreateCategoryDto, image?: Express.Multer.File): Promise<{
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
    remove(id: string): Promise<{
        message: string;
    }>;
}
