import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import graph from "./slices/graphSlice";

export const store = configureStore({
    reducer: {
        filterReducer: filter,
        graphReducer: graph


    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;