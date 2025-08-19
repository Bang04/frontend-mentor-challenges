import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Unsubscribe } from 'firebase/database';
import { dbState } from '../firebase/subscribe';
import { hasAllValue } from '../../components/validator/objects';


const initialState: dbState = {
    byPath: {},
    listeners: {},
    error: null,
    loading: {}
}
export const post = createSlice({
    name: 'postReducer',
    initialState: initialState,
    reducers: {
        fetch: (state, action: PayloadAction<any>) => {
            state.byPath[action.payload.path] = action.payload.value;
        },
        error: (state: any, action: any) => {
            state.error = action.payload;
        },
        listener: (state:any, action: PayloadAction<{path: string; unSubscribe: Unsubscribe|null }>) => {
            state.listeners[action.payload.path] = action.payload;
        },
        // loading: (state, action) => {
        //     console.log("test");
        //     state.loading[action.payload.path] = hasAllValue(state.byPath, Object.keys(state.byPath));
        // }
    }
});


export const { fetch, error, listener } = post.actions; 
export default post.reducer;