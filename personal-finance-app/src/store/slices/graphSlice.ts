import { createSlice } from "@reduxjs/toolkit";
import { Budget, initialDataState } from "./types";
import { StringKeyObject } from "../type";

export interface donut {
    total: number;
    used: number;
    data: {
        remaining: number;
        maximum: number;
        theme: string;
        category: string;
    }
}


const graphSlice = createSlice({
    name: 'graph',
    initialState: initialDataState.budgets,
    reducers: {
        category: (state, action) => {
            state.map((value, index)=> value.category);
        },
        group: (state, action) => {
            action.payload.reduce((acc:StringKeyObject, value:Budget)=> {
                acc[value.category] = acc[value.category] || [];
                acc[value.category].push(value);
            }, {}); 
        },
        recent: (state, action) => {
            const info = state.filter((v:Budget=> v.category=="");
            const 
        }


    }
});

export const {} = graphSlice.actions;
export default graphSlice.reducer;