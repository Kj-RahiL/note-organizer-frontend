import { BlogCategory } from "../../types/blog";
import { TApiResponse } from "../../types/global";
import baseApi from "../api/baseApi";

const blogCategoryApi =  baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBlogCategory: build.mutation<
      TApiResponse<BlogCategory>,
      { name: string }
    >({
      query: (body) => {
        return {
          url: "/blog-category",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["blog-category"],
    }),
    updatedBlogCategory: build.mutation<
      TApiResponse<BlogCategory>,
      { id: string; name: string }
    >({
      query: (body) => {
        return {
          url: `/blog-category/${body.id}`,
          method: "PUT",
          body: { name: body.name },
        };
      },
      invalidatesTags: ["blog-category"],
    }),
    getAllBlogCategory: build.query<TApiResponse<BlogCategory[]>, void>({
      query: () => {
        return {
          url: "/blog-category",
          method: "GET",
        };
      },
      providesTags: ["blog-category"],
    }),
    deleteCategory: build.mutation<TApiResponse<BlogCategory>, string>({
      query: (id) => {
        return {
          url: `/blog-category/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useCreateBlogCategoryMutation,
  useUpdatedBlogCategoryMutation,
  useGetAllBlogCategoryQuery,
  useDeleteCategoryMutation,
} = blogCategoryApi;
