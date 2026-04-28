// ─── Shared primitives ────────────────────────────────────────────────────────

export type MediaType = "IMAGE" | "VIDEO";
export type ProductOrigin = "ITALY" | "TURKEY" | "LOCAL" | "OTHER";
export type ProjectSector =
  | "RESIDENTIAL"
  | "COMMERCIAL"
  | "HOSPITALITY"
  | "MEDICAL"
  | "GOVERNMENT";

// ─── Media ────────────────────────────────────────────────────────────────────

export interface ProductMedia {
  id: string;
  url: string;
  cloudinaryId?: string | null;
  mediaType: MediaType;
  displayOrder: number;
  altText?: string | null;
  isPrimary: boolean;
}

export interface ProjectMedia {
  id: string;
  url: string;
  cloudinaryId?: string | null;
  mediaType: MediaType;
  caption?: string | null;
  displayOrder: number;
}

// ─── Category ─────────────────────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  imageUrl?: string | null;
  displayOrder: number;
  isActive: boolean;
  _count?: { products: number };
}

// ─── Collection ───────────────────────────────────────────────────────────────

export interface CollectionShowroom {
  id: string;
  name: string;
  city: string;
}

export interface CollectionProductItem {
  displayOrder: number;
  product: {
    id: string;
    name: string;
    slug: string;
    isActive: boolean;
    isFeatured: boolean;
    category?: Pick<Category, "id" | "name"> | null;
    media: { url: string; altText?: string | null }[];
  };
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  badgeText?: string | null;
  year?: number | null;
  showroomId?: string | null;
  coverImageUrl?: string | null;
  coverCloudinaryId?: string | null;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
  showroom?: CollectionShowroom | null;
  _count?: { products: number };
}

// ─── Showroom ─────────────────────────────────────────────────────────────────

export interface ShowroomImage {
  id: string;
  url: string;
  caption?: string | null;
  displayOrder: number;
}

export interface Showroom {
  id: string;
  name: string;
  city: string;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
  phoneNumbers: string[];
  email?: string | null;
  whatsappNumber?: string | null;
  instagramHandle?: string | null;
  coverImageUrl?: string | null;
  isActive: boolean;
  showroomImages?: ShowroomImage[];
}

// ─── Products ─────────────────────────────────────────────────────────────────

export interface ProductListItem {
  id: string;
  name: string;
  slug: string;
  origin: ProductOrigin;
  price?: string | null;
  priceOnRequest: boolean;
  isFeatured: boolean;
  isActive: boolean;
  category?: Pick<Category, "id" | "name" | "slug"> | null;
  showroom?: Pick<Showroom, "id" | "name" | "city"> | null;
  /** Primary media item (first with isPrimary=true, else first) */
  media: Pick<ProductMedia, "id" | "url" | "altText" | "isPrimary">[];
  tags: { tag: { id: string; name: string; slug: string } }[];
}

export interface ProductDetail extends ProductListItem {
  description?: string | null;
  style?: string | null;
  type?: string | null;
  materials?: string | null;
  dimensions?: string | null;
  leadTime?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  media: ProductMedia[];
}

export interface PaginatedProducts {
  data: ProductListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductsQuery {
  page?: number;
  limit?: number;
  categoryId?: string;
  showroomId?: string;
  origin?: ProductOrigin;
  isFeatured?: boolean;
  isActive?: boolean;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export interface ProjectListItem {
  id: string;
  title: string;
  slug: string;
  sector: ProjectSector;
  location?: string | null;
  year?: number | null;
  isFeatured: boolean;
  isActive: boolean;
  coverImageUrl?: string | null;
  media: Pick<ProjectMedia, "id" | "url" | "mediaType" | "displayOrder">[];
}

export interface ProjectDetail extends ProjectListItem {
  description?: string | null;
  clientName?: string | null;
  media: ProjectMedia[];
}

export interface PaginatedProjects {
  data: ProjectListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProjectsQuery {
  page?: number;
  limit?: number;
  sector?: ProjectSector;
  isFeatured?: boolean;
  isActive?: boolean;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// ─── Normalised cache maps (built via transformResponse) ──────────────────────

export interface NormalisedProducts {
  items: ProductListItem[];
  byId: Record<string, ProductListItem>;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface NormalisedProjects {
  items: ProjectListItem[];
  byId: Record<string, ProjectListItem>;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

// ─── Admin ────────────────────────────────────────────────────────────────────

export type AdminRole = "SUPER_ADMIN" | "SHOWROOM_MANAGER";

export interface Admin {
  id: string;
  email: string;
  role: AdminRole;
  showroomId: string | null;
  lastLogin: string | null;
  createdAt: string;
  showroom?: { id: string; name: string; city: string; address?: string } | null;
}

// ─── Inquiry ──────────────────────────────────────────────────────────────────

export type InquiryStatus = "NEW" | "IN_PROGRESS" | "QUOTED" | "CONVERTED" | "CLOSED";
export type InquirySource = "WEBSITE" | "WHATSAPP" | "INSTAGRAM" | "REFERRAL" | "WALK_IN";

export interface Inquiry {
  id: string;
  fullName: string;
  email?: string | null;
  phone?: string | null;
  message?: string | null;
  serviceInterest?: string | null;
  source: InquirySource;
  status: InquiryStatus;
  showroom?: Pick<Showroom, "id" | "name" | "city"> | null;
  createdAt: string;
}

export interface PaginatedInquiries {
  data: Inquiry[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface InquiriesQuery {
  page?: number;
  limit?: number;
  status?: InquiryStatus;
  showroomId?: string;
  search?: string;
}

// ─── Admin Mutation DTOs ──────────────────────────────────────────────────────

export interface CreateProductDto {
  name: string;
  categoryId?: string;
  showroomId?: string;
  origin?: ProductOrigin;
  price?: string;
  priceOnRequest?: boolean;
  description?: string;
  style?: string;
  type?: string;
  materials?: string;
  dimensions?: string;
  leadTime?: string;
  isFeatured?: boolean;
  isActive?: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export type UpdateProductDto = Partial<CreateProductDto>;

export interface CreateProjectDto {
  title: string;
  sector: ProjectSector;
  location?: string;
  year?: number;
  description?: string;
  clientName?: string;
  coverImageUrl?: string;
  isFeatured?: boolean;
  isActive?: boolean;
}

export type UpdateProjectDto = Partial<CreateProjectDto>;

export interface CreateCategoryDto {
  name: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
  displayOrder?: number;
  isActive?: boolean;
}

export type UpdateCategoryDto = Partial<CreateCategoryDto>;

export interface CreateShowroomDto {
  name: string;
  city: string;
  address: string;
  latitude?: number;
  longitude?: number;
  phoneNumbers?: string[];
  email?: string;
  whatsappNumber?: string;
  instagramHandle?: string;
  coverImageUrl?: string;
  isActive?: boolean;
}

export type UpdateShowroomDto = Partial<CreateShowroomDto>;

export interface UpdateInquiryDto {
  status?: InquiryStatus;
}

export interface CreateInquiryDto {
  fullName: string;
  email?: string;
  phone?: string;
  message?: string;
  serviceInterest?: string;
  source?: InquirySource;
}

export interface InviteAdminDto {
  email: string;
  password: string;
  role?: AdminRole;
  showroomId?: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

// ─── Collection DTOs ──────────────────────────────────────────────────────────

export interface CreateCollectionDto {
  name: string;
  slug?: string;
  description?: string;
  badgeText?: string;
  year?: number;
  showroomId?: string;
  isFeatured?: boolean;
  isActive?: boolean;
  displayOrder?: number;
}

export type UpdateCollectionDto = Partial<CreateCollectionDto>;

export interface NormalisedCollections {
  items: Collection[];
  bySlug: Record<string, Collection>;
  byId: Record<string, Collection>;
}

