import baseApi from "../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPayment: build.query({
      query: () => {
        return {
          url: "/payment",
          method: "GET",
        };
      },
      providesTags: ["Payment"],
    }),
  }),
});

export const { useGetAllPaymentQuery } = paymentApi;
