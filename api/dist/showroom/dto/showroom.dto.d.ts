export declare class CreateShowroomDto {
    name: string;
    city: string;
    address: string;
    latitude?: number;
    longitude?: number;
    geotagMetadata?: string;
    phoneNumbers?: string[];
    email?: string;
    whatsappNumber?: string;
    instagramHandle?: string;
    coverImageUrl?: string;
    isActive?: boolean;
    createdById?: string;
}
export declare class UpdateShowroomDto {
    name?: string;
    city?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    geotagMetadata?: string;
    phoneNumbers?: string[];
    email?: string;
    whatsappNumber?: string;
    instagramHandle?: string;
    coverImageUrl?: string;
    isActive?: boolean;
}
