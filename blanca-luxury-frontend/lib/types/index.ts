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
