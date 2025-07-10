import { AgreementDelivery } from "../../types/delivery";
import { TApiResponse, TQuery } from "../../types/global";
import buildSearchQuery from "../../utils/buildSearchQuery";
import baseApi from "../api/baseApi";

const deliveryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllDelivery: build.query<TApiResponse<AgreementDelivery[]>, TQuery[]>({
      query: (arg) => {
        return {
          url: "/delivery",
          method: "GET",
          params: buildSearchQuery(arg),
        };
      },
      providesTags: ["Delivery"],
    }),

    updatedDeliveryStatus: build.mutation({
      query: ({ id, status }) => ({
        url: `/delivery/status/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Delivery"],
    }),
  }),
});

export const { useGetAllDeliveryQuery , useUpdatedDeliveryStatusMutation} = deliveryApi;
