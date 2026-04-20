import { baseApi } from "./baseApi";
import type { Category } from "../types";

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
              ...result.items.map(({ id }) => ({
                type: "Category" as const,
                id,
              })),
              { type: "Category", id: "LIST" },
            ]
          : [{ type: "Category", id: "LIST" }],
      // Categories rarely change — keep in cache for 10 min
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
