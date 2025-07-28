import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import graph from "./slices/graphSlice";
import post from "./slices/postSlice";
import toast from "./slices/toastSlice";

export const store = configureStore({
    reducer: {
        postReducer: post,
        filterReducer: filter,
        graphReducer: graph,
        toastReducer: toast


    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;







