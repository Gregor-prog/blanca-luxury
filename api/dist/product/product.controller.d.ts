import { CreateProductDto } from './dto/create-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(query: ProductQueryDto): Promise<{
        data: {
            showroom: {
                id: string;
                name: string;
                city: string;
            } | null;
            category: {
                id: string;
                name: string;
                slug: string;
            } | null;
            id: string;
            name: string;
            isActive: boolean;
            slug: string;
            origin: import(".prisma/client").$Enums.ProductOrigin;
            leadTime: string | null;
            price: import("@prisma/client/runtime/library").Decimal | null;
            priceOnRequest: boolean;
            isFeatured: boolean;
            media: {
                id: string;
                url: string;
                altText: string | null;
            }[];
            tags: {
                tag: {
                    id: string;
                    name: string;
                    slug: string;
                };
            }[];
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        showroom: {
            id: string;
            name: string;
            city: string;
            address: string;
        } | null;
        category: {
            id: string;
            name: string;
            slug: string;
        } | null;
        id: string;
        createdAt: Date;
        name: string;
        isActive: boolean;
        slug: string;
        description: string | null;
        style: string | null;
        type: string | null;
        origin: import(".prisma/client").$Enums.ProductOrigin;
        materials: string | null;
        dimensions: string | null;
        leadTime: string | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        priceOnRequest: boolean;
        isFeatured: boolean;
        metaTitle: string | null;
        metaDescription: string | null;
        media: {
            id: string;
            url: string;
            cloudinaryId: string | null;
            displayOrder: number;
            mediaType: import(".prisma/client").$Enums.MediaType;
            altText: string | null;
            isPrimary: boolean;
        }[];
        tags: {
            tag: {
                id: string;
                name: string;
                slug: string;
            };
        }[];
    }>;
    findBySlug(slug: string): Promise<{
        showroom: {
            id: string;
            name: string;
            city: string;
            address: string;
        } | null;
        category: {
            id: string;
            name: string;
            slug: string;
        } | null;
        id: string;
        createdAt: Date;
        name: string;
        isActive: boolean;
        slug: string;
        description: string | null;
        style: string | null;
        type: string | null;
        origin: import(".prisma/client").$Enums.ProductOrigin;
        materials: string | null;
        dimensions: string | null;
        leadTime: string | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        priceOnRequest: boolean;
        isFeatured: boolean;
        metaTitle: string | null;
        metaDescription: string | null;
        media: {
            id: string;
            url: string;
            cloudinaryId: string | null;
            displayOrder: number;
            mediaType: import(".prisma/client").$Enums.MediaType;
            altText: string | null;
            isPrimary: boolean;
        }[];
        tags: {
            tag: {
                id: string;
                name: string;
                slug: string;
            };
        }[];
    }>;
    create(dto: CreateProductDto, files: Express.Multer.File[], req: any): Promise<{
        showroom: {
            id: string;
            name: string;
            city: string;
            address: string;
        } | null;
        category: {
            id: string;
            name: string;
            slug: string;
        } | null;
        id: string;
        createdAt: Date;
        name: string;
        isActive: boolean;
        slug: string;
        description: string | null;
        style: string | null;
        type: string | null;
        origin: import(".prisma/client").$Enums.ProductOrigin;
        materials: string | null;
        dimensions: string | null;
        leadTime: string | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        priceOnRequest: boolean;
        isFeatured: boolean;
        metaTitle: string | null;
        metaDescription: string | null;
        media: {
            id: string;
            url: string;
            cloudinaryId: string | null;
            displayOrder: number;
            mediaType: import(".prisma/client").$Enums.MediaType;
            altText: string | null;
            isPrimary: boolean;
        }[];
        tags: {
            tag: {
                id: string;
                name: string;
                slug: string;
            };
        }[];
    }>;
    update(id: string, dto: UpdateProductDto): Promise<{
        showroom: {
            id: string;
            name: string;
            city: string;
            address: string;
        } | null;
        category: {
            id: string;
            name: string;
            slug: string;
        } | null;
        id: string;
        createdAt: Date;
        name: string;
        isActive: boolean;
        slug: string;
        description: string | null;
        style: string | null;
        type: string | null;
        origin: import(".prisma/client").$Enums.ProductOrigin;
        materials: string | null;
        dimensions: string | null;
        leadTime: string | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        priceOnRequest: boolean;
        isFeatured: boolean;
        metaTitle: string | null;
        metaDescription: string | null;
        media: {
            id: string;
            url: string;
            cloudinaryId: string | null;
            displayOrder: number;
            mediaType: import(".prisma/client").$Enums.MediaType;
            altText: string | null;
            isPrimary: boolean;
        }[];
        tags: {
            tag: {
                id: string;
                name: string;
                slug: string;
            };
        }[];
    }>;
    addMedia(id: string, files: Express.Multer.File[]): Promise<{
        id: string;
        url: string;
        cloudinaryId: string | null;
        displayOrder: number;
        mediaType: import(".prisma/client").$Enums.MediaType;
        altText: string | null;
        isPrimary: boolean;
    }[]>;
    removeMedia(id: string, mediaId: string): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
