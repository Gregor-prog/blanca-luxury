import { baseApi } from "./baseApi";
import type {
  PaginatedProducts,
  ProductDetail,
  ProductsQuery,
  NormalisedProducts,
  CreateProductDto,
  UpdateProductDto,
} from "../types";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<NormalisedProducts, ProductsQuery>({
      query: (params = {}) => ({
        url: "/products",
        params: { isActive: true, limit: 24, ...params },
      }),
      transformResponse: (raw: PaginatedProducts): NormalisedProducts => {
        const byId: Record<string, (typeof raw.data)[number]> = {};
        for (const p of raw.data) byId[p.id] = p;
        return { ...raw, items: raw.data, byId };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: "Product" as const, id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
      keepUnusedDataFor: 300,
    }),

    // Admin: fetches all products regardless of isActive status
    getAdminProducts: build.query<NormalisedProducts, ProductsQuery>({
      query: (params = {}) => ({
        url: "/products",
        params: { limit: 24, ...params },
      }),
      transformResponse: (raw: PaginatedProducts): NormalisedProducts => {
        const byId: Record<string, (typeof raw.data)[number]> = {};
        for (const p of raw.data) byId[p.id] = p;
        return { ...raw, items: raw.data, byId };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: "Product" as const, id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
      keepUnusedDataFor: 0,
    }),

    getProductById: build.query<ProductDetail, string>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Product", id }],
      keepUnusedDataFor: 300,
    }),

    getProductBySlug: build.query<ProductDetail, string>({
      query: (slug) => `/products/slug/${slug}`,
      providesTags: (result) =>
        result ? [{ type: "Product", id: result.id }] : [],
      keepUnusedDataFor: 300,
    }),

    getRelatedProducts: build.query<
      NormalisedProducts,
      { categoryId: string; excludeId: string }
    >({
      query: ({ categoryId }) => ({
        url: "/products",
        params: { isActive: true, categoryId, limit: 8 },
      }),
      transformResponse: (raw: PaginatedProducts, _meta, arg): NormalisedProducts => {
        const filtered = raw.data.filter((p) => p.id !== arg.excludeId);
        const byId: Record<string, (typeof filtered)[number]> = {};
        for (const p of filtered) byId[p.id] = p;
        return { ...raw, items: filtered, byId };
      },
      providesTags: [{ type: "Product", id: "LIST" }],
      keepUnusedDataFor: 180,
    }),

    createProduct: build.mutation<ProductDetail, CreateProductDto>({
      query: (body) => ({ url: "/products", method: "POST", body }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    updateProduct: build.mutation<ProductDetail, { id: string; body: UpdateProductDto }>({
      query: ({ id, body }) => ({ url: `/products/${id}`, method: "PATCH", body }),
      invalidatesTags: (_result, _err, { id }) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),

    deleteProduct: build.mutation<void, string>({
      query: (id) => ({ url: `/products/${id}`, method: "DELETE" }),
      invalidatesTags: (_result, _err, id) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetAdminProductsQuery,
  useGetProductByIdQuery,
  useGetProductBySlugQuery,
  useGetRelatedProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
