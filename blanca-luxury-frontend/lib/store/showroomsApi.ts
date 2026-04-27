import { baseApi } from "./baseApi";
import type { Showroom, CreateShowroomDto, UpdateShowroomDto } from "../types";

export interface NormalisedShowrooms {
  items: Showroom[];
  byId: Record<string, Showroom>;
  /** O(1) lookup by normalised city name (lower-cased) */
  byCity: Record<string, Showroom[]>;
}

const normalise = (raw: Showroom[]): NormalisedShowrooms => {
  const byId: Record<string, Showroom> = {};
  const byCity: Record<string, Showroom[]> = {};
  for (const s of raw) {
    byId[s.id] = s;
    const key = s.city.toLowerCase();
    (byCity[key] ??= []).push(s);
  }
  return { items: raw, byId, byCity };
};

export const showroomsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getActiveShowrooms: build.query<NormalisedShowrooms, void>({
      query: () => "/showrooms/active",
      transformResponse: normalise,
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: "Showroom" as const, id })),
              { type: "Showroom", id: "LIST" },
            ]
          : [{ type: "Showroom", id: "LIST" }],
      keepUnusedDataFor: 600,
    }),

    // Admin: all showrooms including inactive
    getAllShowrooms: build.query<NormalisedShowrooms, void>({
      query: () => "/showrooms",
      transformResponse: normalise,
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: "Showroom" as const, id })),
              { type: "Showroom", id: "LIST" },
            ]
          : [{ type: "Showroom", id: "LIST" }],
      keepUnusedDataFor: 0,
    }),

    getShowroomById: build.query<Showroom, string>({
      query: (id) => `/showrooms/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Showroom", id }],
      keepUnusedDataFor: 300,
    }),

    createShowroom: build.mutation<Showroom, CreateShowroomDto>({
      query: (body) => ({ url: "/showrooms", method: "POST", body }),
      invalidatesTags: [{ type: "Showroom", id: "LIST" }],
    }),

    updateShowroom: build.mutation<Showroom, { id: string; body: UpdateShowroomDto }>({
      query: ({ id, body }) => ({ url: `/showrooms/${id}`, method: "PATCH", body }),
      invalidatesTags: (_result, _err, { id }) => [
        { type: "Showroom", id },
        { type: "Showroom", id: "LIST" },
      ],
    }),

    deleteShowroom: build.mutation<void, string>({
      query: (id) => ({ url: `/showrooms/${id}`, method: "DELETE" }),
      invalidatesTags: (_result, _err, id) => [
        { type: "Showroom", id },
        { type: "Showroom", id: "LIST" },
      ],
    }),

    uploadShowroomCover: build.mutation<Showroom, { id: string; file: File }>({
      query: ({ id, file }) => {
        const body = new FormData();
        body.append("image", file);
        return { url: `/showrooms/${id}/cover`, method: "POST", body };
      },
      invalidatesTags: (_result, _err, { id }) => [
        { type: "Showroom", id },
        { type: "Showroom", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetActiveShowroomsQuery,
  useGetAllShowroomsQuery,
  useGetShowroomByIdQuery,
  useCreateShowroomMutation,
  useUpdateShowroomMutation,
  useDeleteShowroomMutation,
  useUploadShowroomCoverMutation,
} = showroomsApi;
