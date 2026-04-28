import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("bl_access_token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

function clearAuthAndRedirect() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("bl_access_token");
  localStorage.removeItem("bl_refresh_token");
  localStorage.removeItem("bl_admin");
  document.cookie = "bl_auth=; path=/; max-age=0";
  window.location.href = "/admin/login";
}

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && (result.error as FetchBaseQueryError).status === 401) {
    if (typeof window === "undefined") return result;

    const refreshToken = localStorage.getItem("bl_refresh_token");
    if (!refreshToken) {
      clearAuthAndRedirect();
      return result;
    }

    const refreshResult = await rawBaseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        headers: { Authorization: `Bearer ${refreshToken}` },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { accessToken } = refreshResult.data as { accessToken: string };
      localStorage.setItem("bl_access_token", accessToken);
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      clearAuthAndRedirect();
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "blancaApi",
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 300,
  tagTypes: ["Product", "Project", "Category", "Collection", "Showroom", "Inquiry", "Admin"],
  endpoints: () => ({}),
});
