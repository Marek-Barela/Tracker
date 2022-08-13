import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IpInfoTypes } from "types/ipInfo";

export const ipInfoApi = createApi({
  reducerPath: "ipInfo",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://api.ipstack.com`,
  }),
  endpoints: (build) => ({
    userIpInfo: build.query<IpInfoTypes, void>({
      query: () => `/check?access_key=${process.env.REACT_APP_IP_STACK_KEY}`,
    }),
    providedIpInfo: build.query<IpInfoTypes, string>({
      query: (ip) => `/${ip}?access_key=${process.env.REACT_APP_IP_STACK_KEY}`,
    }),
  }),
});

export const { useUserIpInfoQuery, useProvidedIpInfoQuery } = ipInfoApi;
