import { createSlice } from "@reduxjs/toolkit";

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
    initialState: [],
    reducers: {



    }
});

export const {} = graph.actions;
export default graph.reducer;