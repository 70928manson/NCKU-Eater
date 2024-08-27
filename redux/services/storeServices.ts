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
        baseUrl: 'https://sheets.googleapis.com/v4/spreadsheets/'
    }),
    endpoints: (builder) => ({
        getAllStores: builder.query<Store[], "all">({
            query: () => `${process.env.REACT_APP_ID}/values/${process.env.REACT_APP_SHEET}?alt=json&key=${process.env.REACT_APP_KEY}`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllStoresQuery } = googleSheetApi