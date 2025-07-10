import { TApiResponse, TQuery, User } from "../../types/global";
import buildSearchQuery from "../../utils/buildSearchQuery";
import baseApi from "../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query<TApiResponse<User[]>, TQuery[]>({
      query: (arg) => {
        return {
          url: "/user",
          method: "GET",
          params: buildSearchQuery(arg),
        };
      },
      providesTags: ["user"],
    }),

    blockUnblockUser: build.mutation<TApiResponse<User>, string>({
      query: (id) => {
        return {
          url: `/user/${id}`,
          method: "PUT",
        };
      },
    }),

    getSingleUser: build.query<TApiResponse<User>, string>({
      query: (slug) => {
        return {
          url: `/user/${slug}`,
          method: "GET",
        };
      },
    }),
    
    getSingleUserById: build.query<TApiResponse<User>, string>({
      query: (id) => {
        return {
          url: `/user/single/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetSingleUserByIdQuery,
  useGetAllUsersQuery,
  useBlockUnblockUserMutation,
  useGetSingleUserQuery,
} = userApi;
