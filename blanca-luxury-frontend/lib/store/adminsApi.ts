import { baseApi } from "./baseApi";
import type { Admin, InviteAdminDto } from "../types";

export const adminsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAdmins: build.query<Admin[], void>({
      query: () => "/admins",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Admin" as const, id })),
              { type: "Admin", id: "LIST" },
            ]
          : [{ type: "Admin", id: "LIST" }],
      keepUnusedDataFor: 60,
    }),

    inviteAdmin: build.mutation<Admin, InviteAdminDto>({
      query: (body) => ({ url: "/admins", method: "POST", body }),
      invalidatesTags: [{ type: "Admin", id: "LIST" }],
    }),

    updateAdmin: build.mutation<Admin, { id: string; body: Partial<InviteAdminDto> }>({
      query: ({ id, body }) => ({ url: `/admins/${id}`, method: "PATCH", body }),
      invalidatesTags: (_result, _err, { id }) => [
        { type: "Admin", id },
        { type: "Admin", id: "LIST" },
      ],
    }),

    deleteAdmin: build.mutation<void, string>({
      query: (id) => ({ url: `/admins/${id}`, method: "DELETE" }),
      invalidatesTags: (_result, _err, id) => [
        { type: "Admin", id },
        { type: "Admin", id: "LIST" },
      ],
    }),

    changePassword: build.mutation<void, { id: string; currentPassword: string; newPassword: string }>({
      query: ({ id, ...body }) => ({ url: `/admins/${id}/password`, method: "PATCH", body }),
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useInviteAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
  useChangePasswordMutation,
} = adminsApi;
