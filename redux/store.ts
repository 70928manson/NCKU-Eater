import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './slices/testSlices';
import { googleSheetApi } from './services/storeServices';

export const makeStore = () => {
    return configureStore({
        reducer: {
            [googleSheetApi.reducerPath]: googleSheetApi.reducer,
            counterReducer,
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