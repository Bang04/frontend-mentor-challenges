import { configureStore, createSlice } from "@reduxjs/toolkit";
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

const store = configureStore({
    reducer: {
        dataReducer: _data.reducer   
    }
});

export const { get } = _data.actions;
export default store;
export type rootState = ReturnType<typeof store.getState>

