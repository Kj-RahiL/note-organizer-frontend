import { TApiResponse, TQuery } from "../../types/global";
import { TProject } from "../../types/projects";
import buildSearchQuery from "../../utils/buildSearchQuery";
import baseApi from "../api/baseApi";

const projectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProject: build.query<TApiResponse<TProject[]>, TQuery[]>({
      query: (arg) => {
        return {
          url: "/project",
          method: "GET",
          params: buildSearchQuery(arg),
        };
      },
      providesTags: ["project"],
    }),
    getSingleProject: build.query<TApiResponse<TProject>, string>({
      query: (slug: string) => {
        return {
          url: `/project/${slug}`,
          method: "GET",
        };
      },
      providesTags: ["project"],
    }),
  }),
});

export const { useGetAllProjectQuery, useGetSingleProjectQuery } = projectApi;
