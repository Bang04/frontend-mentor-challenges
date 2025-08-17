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
    itemId : number | undefined;
    top : number| undefined;   //postion X
    left : number| undefined;  //position Y
    handleEditOpen : (() => void )| undefined;
}
