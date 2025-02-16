import {  configureStore, createSlice } from '@reduxjs/toolkit';

const bookmarkReducer = createSlice({
    name : "bookmarkReducer",
    initialState: false,
    reducers : {
        toggle : (state : boolean ) => {
            return !state;
        }
    }
});

const store = configureStore({
    reducer : {
        bookmarkReducer : bookmarkReducer.reducer,
    },
});

export const { toggle } = bookmarkReducer.actions;

export default store;