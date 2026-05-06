import { baseApi } from "./baseApi";
import type {
  Inquiry,
  PaginatedInquiries,
  InquiriesQuery,
  UpdateInquiryDto,
  CreateInquiryDto,
} from "../types";

export interface NormalisedInquiries {
  items: Inquiry[];
  byId: Record<string, Inquiry>;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const inquiriesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getInquiries: build.query<NormalisedInquiries, InquiriesQuery>({
      query: (params = {}) => ({
        url: "/inquiries",
        params: { limit: 20, ...params },
      }),
      transformResponse: (raw: PaginatedInquiries): NormalisedInquiries => {
        const byId: Record<string, Inquiry> = {};
        for (const i of raw.data) byId[i.id] = i;
        return { ...raw.meta, items: raw.data, byId };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: "Inquiry" as const, id })),
              { type: "Inquiry", id: "LIST" },
            ]
          : [{ type: "Inquiry", id: "LIST" }],
      keepUnusedDataFor: 0,
    }),

    updateInquiry: build.mutation<Inquiry, { id: string; body: UpdateInquiryDto }>({
      query: ({ id, body }) => ({ url: `/inquiries/${id}`, method: "PATCH", body }),
      invalidatesTags: (_result, _err, { id }) => [
        { type: "Inquiry", id },
        { type: "Inquiry", id: "LIST" },
      ],
    }),

    deleteInquiry: build.mutation<void, string>({
      query: (id) => ({ url: `/inquiries/${id}`, method: "DELETE" }),
      invalidatesTags: (_result, _err, id) => [
        { type: "Inquiry", id },
        { type: "Inquiry", id: "LIST" },
      ],
    }),

    createInquiry: build.mutation<Inquiry, CreateInquiryDto>({
      query: (body) => ({ url: "/inquiries", method: "POST", body }),
      invalidatesTags: [{ type: "Inquiry", id: "LIST" }],
    }),
  }),
});

export const {
  useGetInquiriesQuery,
  useUpdateInquiryMutation,
  useDeleteInquiryMutation,
  useCreateInquiryMutation,
} = inquiriesApi;
