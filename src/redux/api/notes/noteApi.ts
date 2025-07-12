import baseApi from "../baseApi";


const noteApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createNote: build.mutation({
      query: (body) => {
        return {
          url: "/notes/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Note"],
    }),


//get all
    getAllNote: build.query({
      query: (params) => {
        return {
          url: `/notes`,
          method: "GET",
          params
        };
      },
      providesTags: ["Note"],
    }),


    //get single
    getSingleNote: build.query({
      query: (id) => {
        return {
          url: `/notes/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Note"],
    }),
    updatedNote: build.mutation({
      query: (body) => {
        return {
          url: `/notes${body.id}`,
          method: "POST",
          body: body.data,
        };
      },
      invalidatesTags: ["Note"],
    }),
    deleteNote: build.mutation({
      query: (id) => {
        return {
          url: `/notes/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Note"],
    }),
  }),
});

export const {
  useUpdatedNoteMutation,
  useCreateNoteMutation,
  useGetAllNoteQuery,
  useGetSingleNoteQuery,
  useDeleteNoteMutation
} = noteApi
