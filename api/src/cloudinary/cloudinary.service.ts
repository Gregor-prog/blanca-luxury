import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private readonly config: ConfigService) {
    cloudinary.config({
      cloud_name: config.getOrThrow('CLOUDINARY_CLOUD_NAME'),
      api_key: config.getOrThrow('CLOUDINARY_API_KEY'),
      api_secret: config.getOrThrow('CLOUDINARY_API_SECRET'),
    });
  }

  upload(
    buffer: Buffer,
    folder: string,
    resourceType: 'image' | 'video' | 'raw' = 'image',
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder, resource_type: resourceType },
        (error, result) => {
          if (error || !result) return reject(new InternalServerErrorException(error?.message ?? 'Upload failed'));
          resolve(result);
        },
      );
      stream.end(buffer);
    });
  }

  async delete(publicId: string, resourceType: 'image' | 'video' | 'raw' = 'image') {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  }

  async deleteMany(publicIds: string[], resourceType: 'image' | 'video' | 'raw' = 'image') {
    if (!publicIds.length) return;
    await Promise.all(publicIds.map((id) => this.delete(id, resourceType)));
  }
}
