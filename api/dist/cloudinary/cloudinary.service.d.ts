import { ConfigService } from '@nestjs/config';
import { UploadApiResponse } from 'cloudinary';
export declare class CloudinaryService {
    private readonly config;
    constructor(config: ConfigService);
    upload(buffer: Buffer, folder: string, resourceType?: 'image' | 'video' | 'raw'): Promise<UploadApiResponse>;
    delete(publicId: string, resourceType?: 'image' | 'video' | 'raw'): Promise<void>;
    deleteMany(publicIds: string[], resourceType?: 'image' | 'video' | 'raw'): Promise<void>;
}
