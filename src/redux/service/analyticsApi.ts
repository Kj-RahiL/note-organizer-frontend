import baseApi from "../api/baseApi";

const analyticsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllDashboardAnalytics: build.query({
      query: () => {
        return {
          url: "/analytics/dashboard-overview",
          method: "GET",
        };
      },
      providesTags: ["Analytics"],
    }),
    
    getAllPaymentAnalytics: build.query({
      query: () => {
        return {
          url: "/analytics/payment",
          method: "GET",
        };
      },
      providesTags: ["Analytics"],
    }),
  }),
});

export const {
  useGetAllDashboardAnalyticsQuery,
  useGetAllPaymentAnalyticsQuery,
} = analyticsApi;
