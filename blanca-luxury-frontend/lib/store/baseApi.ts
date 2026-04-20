import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "blancaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1",
  }),
  // All public endpoints are read-heavy — keep cache warm for a long time.
  // Showrooms/categories almost never change → 10 min.
  // Products/projects change on admin action → 5 min.
  keepUnusedDataFor: 300,
  tagTypes: ["Product", "Project", "Category", "Showroom"],
  endpoints: () => ({}),
});
