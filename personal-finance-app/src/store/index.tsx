import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import data from '../assets/data.json';

export interface Balance {
  current: number;
  income: number;
  expenses: number;
}

export interface Transaction {
    avatar : string;
    name : string;
    category : string;
    date : string;
    amount : number;
    recurring : boolean;
}

export interface Budget {
  category: string;
  maximum: number;
  theme: string; // hex color
}

export interface Pot{
    name : string;
    target : number;
    total : number;
    theme : string;
}

const initialState: { balance: Balance, transactions: Transaction[], budgets: Budget[], pots: Pot[] } = {
    balance: data.balance,
    transactions: data.transactions,
    budgets: data.budgets,
    pots: data.pots
}

const _data = createSlice({
    name: 'dataReducer',
    initialState,
    reducers: {
        get: (state, action) => {
            return state;
        },
        addPot : (state, action: PayloadAction<Pot>) => {
            state.pots.push(action.payload);
        }
    
    }
});

// const searchReducer : any = createSlice({
//     name : 'recurringReducer',
//     initialState : data.transactions,
//     reducers : {
//         setNameQuery : (state, action) => {
//             const value = action.payload.value.toLowerCase();

//             if(!value) return state;

//             return 
//         },  
//         getResult : (state, action) => {

//         }
//     }
// })


const store = configureStore({
    reducer: {
        dataReducer: _data.reducer   
    }
});

export const { get, addPot } = _data.actions;
export default store;
export type rootState = ReturnType<typeof store.getState>

