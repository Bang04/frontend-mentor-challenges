import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type row = Record<string, any>;

type data = {
    path: string;
    value: row[];
    status: "idle" | "loading" | "ready" | "error";
    error?: string;
};

type table = Record<string, data[]>

const initialState: table = {
    transactions: [],
    budgets: [],
    pots: [],
    balance: []
}

const verify = (state: table | any, path: string) => {
    if(!state.data[path])
        state.data[path] = [];
    
    return state.data[path];
};

export const post = createSlice({
    name: 'postReducer',
    initialState: {
        data: initialState,
        loading: false,
    },
    reducers: {
        list: (state:any, action: PayloadAction<any>) => {
            state.data = action.payload;
        },
        add: (state: any, action: PayloadAction<data>) => {
            verify(state, action.payload.path);
            state.data[action.payload.path].push(action.payload.value);
        },     
        modify: (state:any, action) => {

        },
        remove: (state:any, action:any) => {

        }
    }
});


export const { add, modify, remove, list } = post.actions; 
export default post.reducer;