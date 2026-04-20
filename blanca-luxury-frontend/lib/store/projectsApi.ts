import { baseApi } from "./baseApi";
import type {
  PaginatedProjects,
  ProjectDetail,
  ProjectsQuery,
  NormalisedProjects,
  ProjectSector,
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
              ...result.items.map(({ id }) => ({
                type: "Project" as const,
                id,
              })),
              { type: "Project", id: "LIST" },
            ]
          : [{ type: "Project", id: "LIST" }],
      keepUnusedDataFor: 300,
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
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useGetProjectBySlugQuery,
} = projectsApi;
