import { configureStore, createSlice } from "@reduxjs/toolkit";
import data from '../assets/data.json';

export interface Transaction {
    avatar : string;
    name : string;
    category : string;
    date : string;
    amount : number;
    recurring : boolean;
}

const _data = createSlice({
    name: 'dataReducer',
    initialState: data,
    reducers: {
        get: (state, action) => {
            return state;
        }
    
    }
});

const searchReducer : any = createSlice({
    name : 'recurringReducer',
    initialState : data.transactions,
    reducers : {
        setNameQuery : (state, action) => {
            const value = action.payload.value.toLowerCase();

            if(!value) return state;

            return 
        },  
        getResult : (state, action) => {

        }
    }
})


const store = configureStore({
    reducer: {
        dataReducer: _data.reducer   
    }
});

export const { get } = _data.actions;
export default store;
export type rootState = ReturnType<typeof store.getState>

