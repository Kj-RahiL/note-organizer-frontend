import baseApi from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signup: build.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),
    }),

    loginUser: build.mutation({
      query: (credentials) => ({
        url: "/auth/login", // Assuming this is your login endpoint
        method: "POST",
        body: credentials, // Sending the email and password as the request body
      }),
      invalidatesTags: ["Auth"],
    }),

    changePassword: build.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),

    getMyProfile: build.query({
      query: () => {
        return {
          url: `/auth/get-me`,
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignupMutation,
  useGetMyProfileQuery,
  useChangePasswordMutation,
} = authApi;
