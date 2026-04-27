import { baseApi } from "./baseApi";
import type { LoginRequest, LoginResponse, Admin } from "../types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";
const SESSION_COOKIE = "bl_auth=1; path=/; max-age=86400; samesite=lax";
const CLEAR_COOKIE = "bl_auth=; path=/; max-age=0";

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
            document.cookie = SESSION_COOKIE;
            // Fetch admin profile separately since login doesn't return it
            try {
              const meRes = await fetch(`${BASE_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${data.accessToken}` },
              });
              if (meRes.ok) {
                const admin = await meRes.json();
                localStorage.setItem("bl_admin", JSON.stringify(admin));
              }
            } catch {}
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
          document.cookie = CLEAR_COOKIE;
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

// ─── Non-hook helpers ─────────────────────────────────────────────────────────

export const getStoredAdmin = (): Admin | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("bl_admin");
    return raw ? (JSON.parse(raw) as Admin) : null;
  } catch {
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("bl_access_token");
};
