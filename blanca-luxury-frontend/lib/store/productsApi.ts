import { baseApi } from "./baseApi";
import type {
  PaginatedProducts,
  ProductDetail,
  ProductsQuery,
  NormalisedProducts,
} from "../types";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<NormalisedProducts, ProductsQuery>({
      query: (params = {}) => ({
        url: "/products",
        params: { isActive: true, limit: 24, ...params },
      }),
      // Build a byId map so product-detail page can grab data in O(1)
      // from the already-cached list instead of firing a new request.
      transformResponse: (raw: PaginatedProducts): NormalisedProducts => {
        const byId: Record<string, (typeof raw.data)[number]> = {};
        for (const p of raw.data) byId[p.id] = p;
        return { ...raw, items: raw.data, byId };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({
                type: "Product" as const,
                id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
      // Products list stays warm for 5 min
      keepUnusedDataFor: 300,
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

    // Related products: fetch the same list filtered by category,
    // then exclude the current product client-side.
    getRelatedProducts: build.query<
      NormalisedProducts,
      { categoryId: string; excludeId: string }
    >({
      query: ({ categoryId }) => ({
        url: "/products",
        params: { isActive: true, categoryId, limit: 8 },
      }),
      transformResponse: (
        raw: PaginatedProducts,
        _meta,
        arg,
      ): NormalisedProducts => {
        const filtered = raw.data.filter((p) => p.id !== arg.excludeId);
        const byId: Record<string, (typeof filtered)[number]> = {};
        for (const p of filtered) byId[p.id] = p;
        return { ...raw, items: filtered, byId };
      },
      providesTags: [{ type: "Product", id: "LIST" }],
      keepUnusedDataFor: 180,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductBySlugQuery,
  useGetRelatedProductsQuery,
} = productsApi;
