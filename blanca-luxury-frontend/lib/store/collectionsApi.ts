import { baseApi } from "./baseApi";
import type {
  Collection,
  CollectionProductItem,
  CreateCollectionDto,
  UpdateCollectionDto,
  NormalisedCollections,
} from "../types";

export const collectionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ── Public ──────────────────────────────────────────────────────────────────

    getCollections: build.query<NormalisedCollections, void>({
      query: () => ({ url: "/collections", params: { activeOnly: true } }),
      transformResponse: (raw: Collection[]): NormalisedCollections => {
        const bySlug: Record<string, Collection> = {};
        const byId: Record<string, Collection> = {};
        for (const c of raw) {
          bySlug[c.slug] = c;
          byId[c.id] = c;
        }
        return { items: raw, bySlug, byId };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({
                type: "Collection" as const,
                id,
              })),
              { type: "Collection", id: "LIST" },
            ]
          : [{ type: "Collection", id: "LIST" }],
      keepUnusedDataFor: 300,
    }),

    // ── Admin: all collections regardless of isActive ────────────────────────

    getAllCollections: build.query<NormalisedCollections, void>({
      query: () => ({ url: "/collections", params: { activeOnly: "false" } }),
      transformResponse: (raw: Collection[]): NormalisedCollections => {
        const bySlug: Record<string, Collection> = {};
        const byId: Record<string, Collection> = {};
        for (const c of raw) {
          bySlug[c.slug] = c;
          byId[c.id] = c;
        }
        return { items: raw, bySlug, byId };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({
                type: "Collection" as const,
                id,
              })),
              { type: "Collection", id: "LIST" },
            ]
          : [{ type: "Collection", id: "LIST" }],
      keepUnusedDataFor: 0,
    }),

    getCollectionById: build.query<Collection, string>({
      query: (id) => `/collections/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Collection", id }],
      keepUnusedDataFor: 120,
    }),

    getCollectionProducts: build.query<CollectionProductItem[], string>({
      query: (id) => `/collections/${id}/products`,
      providesTags: (_result, _err, id) => [
        { type: "Collection", id: `${id}-products` },
      ],
      keepUnusedDataFor: 60,
    }),

    // ── Admin mutations ───────────────────────────────────────────────────────

    /** Create with optional cover image — caller must pass FormData */
    createCollection: build.mutation<Collection, FormData>({
      query: (formData) => ({
        url: "/collections",
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: [{ type: "Collection", id: "LIST" }],
    }),

    updateCollection: build.mutation<
      Collection,
      { id: string; body: UpdateCollectionDto }
    >({
      query: ({ id, body }) => ({
        url: `/collections/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _err, { id }) => [
        { type: "Collection", id },
        { type: "Collection", id: "LIST" },
      ],
    }),

    uploadCollectionImage: build.mutation<Collection, { id: string; file: File }>(
      {
        query: ({ id, file }) => {
          const fd = new FormData();
          fd.append("image", file);
          return { url: `/collections/${id}/image`, method: "POST", body: fd, formData: true };
        },
        invalidatesTags: (_result, _err, { id }) => [
          { type: "Collection", id },
          { type: "Collection", id: "LIST" },
        ],
      }
    ),

    deleteCollection: build.mutation<void, string>({
      query: (id) => ({ url: `/collections/${id}`, method: "DELETE" }),
      invalidatesTags: (_result, _err, id) => [
        { type: "Collection", id },
        { type: "Collection", id: "LIST" },
      ],
    }),

    addProductToCollection: build.mutation<
      void,
      { collectionId: string; productId: string }
    >({
      query: ({ collectionId, productId }) => ({
        url: `/collections/${collectionId}/products`,
        method: "POST",
        body: { productId },
      }),
      invalidatesTags: (_result, _err, { collectionId }) => [
        { type: "Collection", id: `${collectionId}-products` },
        { type: "Collection", id: collectionId },
      ],
    }),

    removeProductFromCollection: build.mutation<
      void,
      { collectionId: string; productId: string }
    >({
      query: ({ collectionId, productId }) => ({
        url: `/collections/${collectionId}/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _err, { collectionId }) => [
        { type: "Collection", id: `${collectionId}-products` },
        { type: "Collection", id: collectionId },
      ],
    }),

    createCategoryFromProduct: build.mutation<
      { id: string; name: string; slug: string },
      CreateCollectionDto
    >({
      query: (body) => ({ url: "/categories", method: "POST", body }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCollectionsQuery,
  useGetAllCollectionsQuery,
  useGetCollectionByIdQuery,
  useGetCollectionProductsQuery,
  useCreateCollectionMutation,
  useUpdateCollectionMutation,
  useUploadCollectionImageMutation,
  useDeleteCollectionMutation,
  useAddProductToCollectionMutation,
  useRemoveProductFromCollectionMutation,
} = collectionsApi;
