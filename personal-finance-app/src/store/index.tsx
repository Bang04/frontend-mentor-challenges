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




const initialDataState: { 
    balance: Balance, 
    transactions: Transaction[], 
   // filteredTransactions: Transaction[],  
    budgets: Budget[], 
    pots: Pot[] ,
    filterKeyword : String,
    sortOption: string,
} = {
    balance: data.balance,
    budgets: data.budgets,
    pots: data.pots,
    transactions: data.transactions,
    //filteredTransactions: data.transactions,
    filterKeyword: '',
    sortOption: ''
}

const _data = createSlice({
    name: 'dataReducer',
    initialState: initialDataState,
    reducers: {
        getKeyword: (state) =>  {
            return state
        },
        setKeyword: (state, action) =>  {
            state.filterKeyword = action.payload;
        }
        ,setSortOption(state, action) {
            state.filterKeyword = action.payload;
        }
        ,setFilter(state, action) {
            const keyword = action.payload.toLowerCase();
            state.transactions =  state.transactions.filter(transaction =>
            transaction.name.toLowerCase().includes(keyword));
        }, 
        setSortData : (state, action ) => {
            const sortData = [...state.transactions];
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
              state.transactions = sortData;
        },
    }
});

const pot = createSlice({
    name: 'potReducer',
    initialState: initialDataState.pots,
    reducers: {
        getPot: (state) =>  {
            state.map((k,v)=>console.log(k,v));
            
            return state;
        },
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

export interface Toast{
    id : string;
    name : string;
    target : number;
    total : number;
    theme : string;
}
interface ToastState {
    toasts: Toast[];
}
const initialToastState: ToastState = { toasts: [] };

const toast = createSlice({
    name: 'toastReducer',
    initialState: initialToastState,
    reducers: {
        setToast: (state, action: PayloadAction<Toast>) => {
            state.toasts.push(action.payload);
        },
        removeToast: (state, action: PayloadAction<string>) => {
            state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
        }
    }
});


const store = configureStore({
    reducer: {
        dataReducer: _data.reducer,
        potReducer : pot.reducer,
        toastReducer : toast.reducer,
    }
});



// Rename get from _data.actions to dataGet to avoid naming conflict
export const { getKeyword,setKeyword, setFilter , setSortData } = _data.actions;
export const { getPot , setPot, updatePot, removePot } = pot.actions;
export const { setToast,removeToast} = toast.actions;

export default store;
export type rootState = ReturnType<typeof store.getState>

