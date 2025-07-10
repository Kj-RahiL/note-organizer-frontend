import { TCategory } from "../../types/Category";
import { TApiResponse, TQuery } from "../../types/global";
import buildSearchQuery from "../../utils/buildSearchQuery";
import baseApi from "../api/baseApi";

const jobCategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createJobCategory: build.mutation<
      TApiResponse<TCategory>,
      { parentId?: string; name?: string }
    >({
      query: (body) => {
        return {
          url: "/category/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["category"],
    }),
    getAllJobCategory: build.query<TApiResponse<TCategory[]>, TQuery[]>({
      query: (arg) => {
        return {
          url: "/category",
          method: "GET",
          params: buildSearchQuery(arg),
        };
      },
      providesTags: ["category"],
    }),
    getSingleJobCategory: build.query<TApiResponse<TCategory>, string>({
      query: (id) => {
        return {
          url: `/category/${id}`,
          method: "GET",
        };
      },
      providesTags: ["category"],
    }),
    updatedJobCategory: build.mutation<
      TApiResponse<TCategory>,
      { id: string; data: TCategory }
    >({
      query: (body) => {
        return {
          url: `/category${body.id}`,
          method: "POST",
          body: body.data,
        };
      },
      invalidatesTags: ["category"],
    }),
    deleteJobCategory: build.mutation<TApiResponse<TCategory>, string>({
      query: (id) => {
        return {
          url: `/category/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useCreateJobCategoryMutation,
  useDeleteJobCategoryMutation,
  useGetAllJobCategoryQuery,
  useGetSingleJobCategoryQuery,
  useUpdatedJobCategoryMutation,
} = jobCategoryApi;
