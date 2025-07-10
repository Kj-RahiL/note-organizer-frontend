import baseApi from "../baseApi";


const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCategory: build.mutation({
      query: (body) => {
        return {
          url: "/categories/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Category"],
    }),
    getAllCategory: build.query({
      query: () => {
        return {
          url: "/categories",
          method: "GET",
        };
      },
      providesTags: ["Category"],
    }),
    getSingleCategory: build.query({
      query: (id) => {
        return {
          url: `/categories/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Category"],
    }),
    updatedCategory: build.mutation({
      query: (body) => {
        return {
          url: `/categories${body.id}`,
          method: "POST",
          body: body.data,
        };
      },
      invalidatesTags: ["Category"],
    }),
    deleteCategory: build.mutation({
      query: (id) => {
        return {
          url: `/categories/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useUpdatedCategoryMutation,
  useCreateCategoryMutation,
  useGetAllCategoryQuery,
  useGetSingleCategoryQuery,
  useDeleteCategoryMutation
} = categoryApi
