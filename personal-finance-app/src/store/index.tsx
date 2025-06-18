import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import data from '../assets/data.json';


const _data = createSlice({
    name: 'dataReducer',
    initialState: data,
    reducers: {
        get: (state, action) => {
            return state;
        }
    }
});

const searchReducer = createSlice({
    name: "searchReducer",
    initialState : "",
    reducers : {
        search :(state : string, action : PayloadAction<string>) => {
            return action.payload;
        }
    }
})
const store = configureStore({
    reducer: {
        dataReducer: _data.reducer   
    }
});

export const { get } = _data.actions;
export const { search } = searchReducer.actions;
export default store;
export type rootState = ReturnType<typeof store.getState>

