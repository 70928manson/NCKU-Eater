import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Store = {
    id: number;
    title: string;
    src: string;
    tags: string[];
    likes: number; // 多少人按讚
};

// Define a service using a base URL and expected endpoints
export const googleSheetApi = createApi({
    reducerPath: 'googleSheetApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/',  // 指向 Next.js 的 API route, 之後正式要改到 github
    }),
    endpoints: (builder) => ({
        getAllStores: builder.query<Store[], "all">({
            query: () => 'getAllStores',  // 使用 API route 的路徑
        }),
    }),
    // baseQuery: fetchBaseQuery({
    //     baseUrl: 'https://sheets.googleapis.com/v4/spreadsheets/'
    // }),
    // endpoints: (builder) => ({
    //     getAllStores: builder.query<Store[], "all">({
    //         query: () => `${process.env.APP_ID}/values/${process.env.APP_SHEET}?alt=json&key=${process.env.APP_KEY}`,
    //     }),
    // }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllStoresQuery } = googleSheetApi