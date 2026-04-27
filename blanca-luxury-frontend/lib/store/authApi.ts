import { baseApi } from "./baseApi";
import type { LoginRequest, LoginResponse } from "../types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (typeof window !== "undefined") {
            localStorage.setItem("bl_access_token", data.accessToken);
            localStorage.setItem("bl_refresh_token", data.refreshToken);
            localStorage.setItem("bl_admin", JSON.stringify(data.admin));
          }
        } catch {}
      },
    }),

    logout: build.mutation<void, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch {}
        if (typeof window !== "undefined") {
          localStorage.removeItem("bl_access_token");
          localStorage.removeItem("bl_refresh_token");
          localStorage.removeItem("bl_admin");
        }
      },
    }),

    refreshToken: build.mutation<{ accessToken: string }, { refreshToken: string }>({
      query: (body) => ({
        url: "/auth/refresh",
        method: "POST",
        body,
      }),
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (typeof window !== "undefined") {
            localStorage.setItem("bl_access_token", data.accessToken);
          }
        } catch {}
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRefreshTokenMutation } = authApi;

// Helpers for non-hook contexts
export const getStoredAdmin = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("bl_admin");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("bl_access_token");
};
