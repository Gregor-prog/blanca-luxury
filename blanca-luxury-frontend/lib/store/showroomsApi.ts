import { baseApi } from "./baseApi";
import type { Showroom } from "../types";

export interface NormalisedShowrooms {
  items: Showroom[];
  byId: Record<string, Showroom>;
  /** O(1) lookup by normalised city name (lower-cased) */
  byCity: Record<string, Showroom[]>;
}

export const showroomsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getActiveShowrooms: build.query<NormalisedShowrooms, void>({
      query: () => "/showrooms/active",
      transformResponse: (raw: Showroom[]): NormalisedShowrooms => {
        const byId: Record<string, Showroom> = {};
        const byCity: Record<string, Showroom[]> = {};
        for (const s of raw) {
          byId[s.id] = s;
          const key = s.city.toLowerCase();
          (byCity[key] ??= []).push(s);
        }
        return { items: raw, byId, byCity };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({
                type: "Showroom" as const,
                id,
              })),
              { type: "Showroom", id: "LIST" },
            ]
          : [{ type: "Showroom", id: "LIST" }],
      // Showroom info is very stable — keep for 10 min
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetActiveShowroomsQuery } = showroomsApi;
