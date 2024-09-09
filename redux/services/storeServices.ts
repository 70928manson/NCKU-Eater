import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Store } from '@/app/types/store';

// Define a service using a base URL and expected endpoints
export const googleSheetApi = createApi({
    reducerPath: 'googleSheetApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/',  // 指向 Next.js 的 API route
    }),
    endpoints: (builder) => ({
        getAllStores: builder.query<Store[], "all">({
            query: () => 'getAllStores',  // 使用 API route 的路徑
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllStoresQuery } = googleSheetApi