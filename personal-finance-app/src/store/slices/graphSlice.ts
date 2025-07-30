import { createSlice } from "@reduxjs/toolkit";
import { initialDataState } from "./types";

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


const graph = createSlice({
    name: 'graph',
    initialState: initialDataState.budgets,
    reducers: {



    }
});

export const {} = graph.actions;
export default graph.reducer;