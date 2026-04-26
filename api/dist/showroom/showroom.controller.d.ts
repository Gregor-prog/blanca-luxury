import { CreateShowroomDto, UpdateShowroomDto } from './dto/showroom.dto';
import { ShowroomService } from './showroom.service';
export declare class ShowroomController {
    private readonly showroomService;
    constructor(showroomService: ShowroomService);
    findActive(): Promise<{}>;
    create(dto: CreateShowroomDto): Promise<{
        id: string;
        email: string | null;
        createdAt: Date;
        name: string;
        city: string;
        address: string;
        latitude: number | null;
        longitude: number | null;
        phoneNumbers: import("@prisma/client/runtime/library").JsonValue;
        geotagMetadata: string | null;
        whatsappNumber: string | null;
        instagramHandle: string | null;
        coverImageUrl: string | null;
        coverCloudinaryId: string | null;
        isActive: boolean;
        createdById: string | null;
        createdBy: {
            id: string;
            email: string;
        } | null;
    }>;
    findAll(activeOnly?: string): Promise<{}>;
    findOne(id: string): Promise<{
        id: string;
        email: string | null;
        createdAt: Date;
        name: string;
        city: string;
        address: string;
        latitude: number | null;
        longitude: number | null;
        phoneNumbers: import("@prisma/client/runtime/library").JsonValue;
        geotagMetadata: string | null;
        whatsappNumber: string | null;
        instagramHandle: string | null;
        coverImageUrl: string | null;
        coverCloudinaryId: string | null;
        isActive: boolean;
        createdById: string | null;
        createdBy: {
            id: string;
            email: string;
        } | null;
        showroomImages: {
            id: string;
            url: string;
            cloudinaryId: string | null;
            caption: string | null;
            displayOrder: number;
        }[];
    }>;
    update(id: string, dto: UpdateShowroomDto): Promise<{
        id: string;
        email: string | null;
        createdAt: Date;
        name: string;
        city: string;
        address: string;
        latitude: number | null;
        longitude: number | null;
        phoneNumbers: import("@prisma/client/runtime/library").JsonValue;
        geotagMetadata: string | null;
        whatsappNumber: string | null;
        instagramHandle: string | null;
        coverImageUrl: string | null;
        coverCloudinaryId: string | null;
        isActive: boolean;
        createdById: string | null;
        createdBy: {
            id: string;
            email: string;
        } | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    uploadCover(id: string, file: Express.Multer.File): Promise<{
        id: string;
        email: string | null;
        createdAt: Date;
        name: string;
        city: string;
        address: string;
        latitude: number | null;
        longitude: number | null;
        phoneNumbers: import("@prisma/client/runtime/library").JsonValue;
        geotagMetadata: string | null;
        whatsappNumber: string | null;
        instagramHandle: string | null;
        coverImageUrl: string | null;
        coverCloudinaryId: string | null;
        isActive: boolean;
        createdById: string | null;
        createdBy: {
            id: string;
            email: string;
        } | null;
    }>;
    removeCover(id: string): Promise<{
        message: string;
    }>;
    addImages(id: string, files: Express.Multer.File[]): Promise<{
        id: string;
        url: string;
        cloudinaryId: string | null;
        caption: string | null;
        displayOrder: number;
    }[]>;
    removeImage(id: string, imageId: string): Promise<{
        message: string;
    }>;
}
