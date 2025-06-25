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
    id : string;
    name : string;
    target : number;
    total : number;
    theme : string;
}

const initialDataState: { balance: Balance, transactions: Transaction[], budgets: Budget[], pots: Pot[] } = {
    balance: data.balance,
    transactions: data.transactions,
    budgets: data.budgets,
    pots: data.pots
}

const _data = createSlice({
    name: 'dataReducer',
    initialState: initialDataState,
    reducers: {
        get: (state, action) => {
            return state;
        },
    
    }
});

const pot = createSlice({
    name: 'potReducer',
    initialState: initialDataState.pots,
    reducers: {
        getPot: (state) =>  state,
        setPot : (state, action: PayloadAction<Pot>) => {
            state.push({
                id: (state.length + 1).toString(),
                name: action.payload.name,
                target: action.payload.target,
                theme: action.payload.theme,
                total: 0
            });
        },
        updatePot :(state, action) =>{
            const idx = state.findIndex(pot => pot.id === action.payload.id);
            if(idx !== -1) {
                state[idx] = {
                    ...state[idx],
                    ...action.payload
                };
            }
        },
        removePot :(state, action) =>{

        }
    
    }
});


const store = configureStore({
    reducer: {
        dataReducer: _data.reducer,
        potReducer : pot.reducer
    }
});


// Rename get from _data.actions to dataGet to avoid naming conflict
export const { get } = _data.actions;
export const { getPot , setPot } = pot.actions;
export default store;
export type rootState = ReturnType<typeof store.getState>

