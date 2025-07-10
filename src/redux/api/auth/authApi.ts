import baseApi from "../baseApi";


const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (credentials) => ({
        url: "/auth/login", // Assuming this is your login endpoint
        method: "POST",
        body: credentials, // Sending the email and password as the request body
      }),
      invalidatesTags: ["Auth"],
      
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
