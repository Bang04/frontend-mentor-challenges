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

const initialDataState: { balance: Balance, transactions: Transaction[], filteredTransactions: Transaction[],  budgets: Budget[], pots: Pot[] } = {
    balance: data.balance,
    budgets: data.budgets,
    pots: data.pots,
    transactions: data.transactions,
    filteredTransactions: data.transactions
}

const _data = createSlice({
    name: 'dataReducer',
    initialState: initialDataState,
    reducers: {
        setFilter(state, action) {
            const keyword = action.payload.toLowerCase();
            state.filteredTransactions =  state.transactions.filter(transaction =>
            transaction.name.toLowerCase().includes(keyword));
        }, 
        setSortOption : (state, action ) => {
            const sortData = [...state.filteredTransactions];
            switch(action.payload){
                case 'Latest':
                    sortData.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                    break;
                case 'Oldest':
                    sortData.sort((a,b) => new Date(a.date).getTime() -new Date(b.date).getTime());
                    break;
                case 'AtoZ':
                    sortData.sort((a,b) => a.name.localeCompare(b.name));
                    break;
                case 'ZtoA':
                    sortData.sort((a,b) => b.name.localeCompare(a.name));
                    break;
                case 'Highest':
                    sortData.sort((a,b)=> b.amount - a.amount);
                    break;
                case 'Lowest':
                    sortData.sort((a,b) => a.amount - b.amount);
                    break;
                default :
                    break;
            }
              state.filteredTransactions = sortData;
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
                ...action.payload,
                id: (state.length + 1).toString(),
                total: 0,
            });
        },
        updatePot :(state, action) =>{
            const idx = state.findIndex(pot => pot.id === action.payload.id);
             if(idx !== -1) {
                state[idx] = {
                    ...state[idx],
                    ...action.payload,
                };
            }
        },
        removePot :(state, action ) =>{
            return state.filter(pot => pot.id !== action.payload);
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
export const { setFilter , setSortOption } = _data.actions;
export const { getPot , setPot, updatePot, removePot } = pot.actions;
export default store;
export type rootState = ReturnType<typeof store.getState>

