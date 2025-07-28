 import data from '../../assets/data.json';

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

export interface Toast{
    id: number; 
    itemId : number;
}

  //임시!!!
export const initialDataState: { 
    balance: Balance, 
    transactions: Transaction[], 
    budgets: Budget[], 
    pots: Pot[] ,
    filterKeyword : String,
    sortOption: string,
} = {
    balance: data.balance,
    budgets: data.budgets,
    pots: data.pots,
    transactions: data.transactions,
    filterKeyword: '',
    sortOption: ''
}