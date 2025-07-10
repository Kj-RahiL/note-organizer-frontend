import { TApiResponse, TQuery } from "../../types/global";
import { Job } from "../../types/job";
import buildSearchQuery from "../../utils/buildSearchQuery";
import baseApi from "../api/baseApi";

const jobsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllJobs: build.query<TApiResponse<Job[]>, TQuery[]>({
      query: (arg) => {
        return {
          url: "/jobs",
          method: "GET",
          params: buildSearchQuery(arg),
        };
      },
      providesTags: ["jobs"],
    }),
    getSingleJobs: build.query<TApiResponse<Job>, string>({
      query: (id: string) => {
        return {
          url: `/jobs/${id}`,
          method: "GET",
        };
      },
      providesTags: ["jobs"],
    }),
  }),
});

export const { useGetAllJobsQuery, useGetSingleJobsQuery } = jobsApi;
