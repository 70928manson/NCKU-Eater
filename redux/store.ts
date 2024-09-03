import { configureStore } from '@reduxjs/toolkit';

import lotteryReducer from './slices/lotterySlices';
import { googleSheetApi } from './services/storeServices';

export const makeStore = () => {
    return configureStore({
        reducer: {
            [googleSheetApi.reducerPath]: googleSheetApi.reducer,
            lottery: lotteryReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(googleSheetApi.middleware),
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];