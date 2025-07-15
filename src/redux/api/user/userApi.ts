import baseApi from "../baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
      
     

    //get single
    getSingleUser: build.query({
      query: (id) => {
        return {
          url: `/user/${id}`,
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),
      
    updatedMe: build.mutation({
      query: (data) => {
        return {
          url: `/user/update-me`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["User"],
    }),


    updatedUser: build.mutation({
      query: (body) => {
        return {
          url: `/user/${body.id}`,
          method: "POST",
          body: body.data,
        };
      },
      invalidatesTags: ["User"],
    }),

    deleteUser: build.mutation({
      query: (id) => {
        return {
          url: `/user/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useUpdatedUserMutation,
  useUpdatedMeMutation,
  useGetSingleUserQuery,
  useDeleteUserMutation,
} = userApi;
