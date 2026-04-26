import { ProductOrigin } from '@prisma/client';
export declare class UpdateProductDto {
    name?: string;
    slug?: string;
    description?: string;
    style?: string;
    type?: string;
    origin?: ProductOrigin;
    materials?: string;
    dimensions?: string;
    leadTime?: string;
    price?: number;
    priceOnRequest?: boolean;
    categoryId?: string;
    showroomId?: string;
    isFeatured?: boolean;
    isActive?: boolean;
    metaTitle?: string;
    metaDescription?: string;
    tagIds?: string[];
}
