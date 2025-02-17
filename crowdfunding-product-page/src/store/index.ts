import {  PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';

const bookmarkReducer = createSlice({
    name : "bookmarkReducer",
    initialState: false,
    reducers : {
        toggle : (state : boolean ) => {
            return !state;
        }
    }
});


const pledgeReducer = createSlice({
    name: "pledgeReducer",
    initialState: 0,
    reducers: {
        add: (state: number, action: PayloadAction<number>) => {
            console.log(state);
            state = action.payload;
            return state;
        }
    }
});

const store = configureStore({
    reducer : {
        bookmarkReducer : bookmarkReducer.reducer,
        pledgeReducer : pledgeReducer.reducer
    },
});

export const { toggle } = bookmarkReducer.actions;
export const { add } = pledgeReducer.actions;

export default store;