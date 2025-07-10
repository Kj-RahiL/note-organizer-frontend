import { TApiResponse } from "../../types/global";
import { TWithdrawal } from "../../types/withdraw";
import baseApi from "../api/baseApi";

const withdrawalApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    processWithdrawal: build.mutation<
      TApiResponse<TWithdrawal>,
      { withdrawalId: string; status: string; adminNote: string }
    >({
      query: ({ withdrawalId, status, adminNote }) => {
        return {
          url: `/withdrawal/process/${withdrawalId}`,
          method: "POST",
          body: {
            status,
            adminNote,
          },
        };
      },
      invalidatesTags: ["blogs"],
    }),

    getAllWithdrawal: build.query({
      query: () => {
        return {
          url: "/withdrawal",
          method: "GET",
        };
      },
      providesTags: ["Withdrawal"],
    }),
  }),
});

export const { useGetAllWithdrawalQuery, useProcessWithdrawalMutation } =
  withdrawalApi;
