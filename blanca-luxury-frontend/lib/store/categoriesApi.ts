import { baseApi } from "./baseApi";
import type { Category, CreateCategoryDto, UpdateCategoryDto } from "../types";

export interface NormalisedCategories {
  items: Category[];
  /** O(1) lookup by slug (used by collections page to map label → id) */
  bySlug: Record<string, Category>;
  byId: Record<string, Category>;
}

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<NormalisedCategories, void>({
      query: () => ({ url: "/categories", params: { activeOnly: true } }),
      transformResponse: (raw: Category[]): NormalisedCategories => {
        const bySlug: Record<string, Category> = {};
        const byId: Record<string, Category> = {};
        for (const c of raw) {
          bySlug[c.slug] = c;
          byId[c.id] = c;
        }
        return { items: raw, bySlug, byId };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: "Category" as const, id })),
              { type: "Category", id: "LIST" },
            ]
          : [{ type: "Category", id: "LIST" }],
      keepUnusedDataFor: 600,
    }),

    // Admin: all categories regardless of isActive
    getAllCategories: build.query<NormalisedCategories, void>({
      query: () => ({ url: "/categories" }),
      transformResponse: (raw: Category[]): NormalisedCategories => {
        const bySlug: Record<string, Category> = {};
        const byId: Record<string, Category> = {};
        for (const c of raw) {
          bySlug[c.slug] = c;
          byId[c.id] = c;
        }
        return { items: raw, bySlug, byId };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: "Category" as const, id })),
              { type: "Category", id: "LIST" },
            ]
          : [{ type: "Category", id: "LIST" }],
      keepUnusedDataFor: 0,
    }),

    createCategory: build.mutation<Category, CreateCategoryDto>({
      query: (body) => ({ url: "/categories", method: "POST", body }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),

    updateCategory: build.mutation<Category, { id: string; body: UpdateCategoryDto }>({
      query: ({ id, body }) => ({ url: `/categories/${id}`, method: "PATCH", body }),
      invalidatesTags: (_result, _err, { id }) => [
        { type: "Category", id },
        { type: "Category", id: "LIST" },
      ],
    }),

    deleteCategory: build.mutation<void, string>({
      query: (id) => ({ url: `/categories/${id}`, method: "DELETE" }),
      invalidatesTags: (_result, _err, id) => [
        { type: "Category", id },
        { type: "Category", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
