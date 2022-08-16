import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IpInfoTypes } from "types/ipInfo";

export const ipInfoApi = createApi({
  reducerPath: "ipInfo",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://ipapi.co`,
  }),
  endpoints: (build) => ({
    userIpInfo: build.query<IpInfoTypes, void>({
      query: () => `/json`,
    }),
    providedIpInfo: build.query<IpInfoTypes, string>({
      query: (ip) => `/${ip}/json`,
    }),
  }),
});

export const { useUserIpInfoQuery, useProvidedIpInfoQuery, useLazyProvidedIpInfoQuery } = ipInfoApi;
