import { TApiResponse } from "../../types/global";
import baseApi from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation<
      TApiResponse<{ accessToken: string }>,
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/login", // Assuming this is your login endpoint
        method: "POST",
        body: credentials, // Sending the email and password as the request body
      }),
      invalidatesTags: ["auth"],
      // You can also define additional options such as `onQueryStarted`, `transformResponse`, etc.
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
