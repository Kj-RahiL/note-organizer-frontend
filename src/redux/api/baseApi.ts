// store/api/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:3909/api/v1",
  // baseUrl: "https://api.healixity.com/api/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  endpoints: () => ({}),
  tagTypes: [
    "auth",
    "project",
    "jobs",
    "user",
    "blog-category",
    "blogs",
    "category",
    "Analytics",
    "Payment",
    "Delivery",
    "Withdrawal",
  ],
});

export default baseApi;
