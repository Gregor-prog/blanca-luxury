import { baseApi } from "./baseApi";
import type {
  PaginatedProjects,
  ProjectDetail,
  ProjectsQuery,
  NormalisedProjects,
  ProjectSector,
  CreateProjectDto,
  UpdateProjectDto,
} from "../types";

export const projectsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProjects: build.query<
      NormalisedProjects,
      ProjectsQuery & { sector?: ProjectSector | "ALL" }
    >({
      query: ({ sector, ...rest } = {}) => ({
        url: "/projects",
        params: {
          isActive: true,
          limit: 20,
          ...rest,
          ...(sector && (sector as string) !== "ALL" ? { sector } : {}),
        },
      }),
      transformResponse: (raw: PaginatedProjects): NormalisedProjects => {
        const byId: Record<string, (typeof raw.data)[number]> = {};
        for (const p of raw.data) byId[p.id] = p;
        return { ...raw, items: raw.data, byId };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: "Project" as const, id })),
              { type: "Project", id: "LIST" },
            ]
          : [{ type: "Project", id: "LIST" }],
      keepUnusedDataFor: 300,
    }),

    // Admin: all projects regardless of isActive
    getAdminProjects: build.query<NormalisedProjects, ProjectsQuery>({
      query: (params = {}) => ({
        url: "/projects",
        params: { limit: 20, ...params },
      }),
      transformResponse: (raw: PaginatedProjects): NormalisedProjects => {
        const byId: Record<string, (typeof raw.data)[number]> = {};
        for (const p of raw.data) byId[p.id] = p;
        return { ...raw, items: raw.data, byId };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: "Project" as const, id })),
              { type: "Project", id: "LIST" },
            ]
          : [{ type: "Project", id: "LIST" }],
      keepUnusedDataFor: 0,
    }),

    getProjectById: build.query<ProjectDetail, string>({
      query: (id) => `/projects/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Project", id }],
      keepUnusedDataFor: 300,
    }),

    getProjectBySlug: build.query<ProjectDetail, string>({
      query: (slug) => `/projects/slug/${slug}`,
      providesTags: (result) =>
        result ? [{ type: "Project", id: result.id }] : [],
      keepUnusedDataFor: 300,
    }),

    createProject: build.mutation<ProjectDetail, CreateProjectDto>({
      query: (body) => ({ url: "/projects", method: "POST", body }),
      invalidatesTags: [{ type: "Project", id: "LIST" }],
    }),

    updateProject: build.mutation<ProjectDetail, { id: string; body: UpdateProjectDto }>({
      query: ({ id, body }) => ({ url: `/projects/${id}`, method: "PATCH", body }),
      invalidatesTags: (_result, _err, { id }) => [
        { type: "Project", id },
        { type: "Project", id: "LIST" },
      ],
    }),

    deleteProject: build.mutation<void, string>({
      query: (id) => ({ url: `/projects/${id}`, method: "DELETE" }),
      invalidatesTags: (_result, _err, id) => [
        { type: "Project", id },
        { type: "Project", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetAdminProjectsQuery,
  useGetProjectByIdQuery,
  useGetProjectBySlugQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
