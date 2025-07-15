import baseApi from "../baseApi";


const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createImage: build.mutation({
      query: (body) => {
        return {
          url: "/image/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Image"],
    }),

    deleteImage: build.mutation({
      query: (url) => {
        return {
          url: `/image/delete`,
            method: "DELETE",
            body: { url },
        };
      },
      invalidatesTags: ["Image"],
    }),
  }),
});

export const {
 
  useCreateImageMutation,
  useDeleteImageMutation
} = categoryApi
