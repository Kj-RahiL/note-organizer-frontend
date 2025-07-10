import { TBlog } from "../../types/blog";
import { TApiResponse, TQuery } from "../../types/global";
import buildSearchQuery from "../../utils/buildSearchQuery";
import baseApi from "../api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBlog: build.mutation<TApiResponse<TBlog>, FormData>({
      query: (body) => {
        return {
          url: "/blogs/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["blogs"],
    }),
    updatedBlog: build.mutation<
      TApiResponse<TBlog>,
      { id: string; data: FormData }
    >({
      query: (body) => {
        return {
          url: `/blogs/${body.id}`,
          method: "PUT",
          body: body.data,
        };
      },
      invalidatesTags: ["blogs"],
    }),
    getAllBlog: build.query<TApiResponse<TBlog[]>, TQuery[]>({
      query: (arg) => {
        return {
          url: "/blogs",
          method: "GET",
          params: buildSearchQuery(arg),
        };
      },
      providesTags: ["blogs"],
    }),
    getSingleBlog: build.query<TApiResponse<TBlog>, string>({
      query: (slug) => {
        return {
          url: `/blogs/${slug}`,
          method: "GET",
        };
      },
      providesTags: ["blogs"],
    }),
    deleteBlog: build.mutation<TApiResponse<TBlog>, string>({
      query: (id) => {
        return {
          url: `/blogs/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["blogs"],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useUpdatedBlogMutation,
  useGetAllBlogQuery,
  useGetSingleBlogQuery,
} = blogApi;
