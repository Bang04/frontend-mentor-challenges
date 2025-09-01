import { createSelector } from "@reduxjs/toolkit";
import { Budget, Transaction } from "../slices/types";
import { commonType } from "../common";
import { dbState } from "../firebase/subscribe";


const transactions = (state: {postReducer: dbState}) => state.postReducer.byPath["transactions"];
const budgets = (state: {postReducer: dbState}) => state.postReducer.byPath["budgets"];


export const selectedTheme = createSelector(
    [budgets],
    (data)=> (
        data.map((v: { theme: any; })=>v.theme)
    )
)


const selectGroupedTransactions = createSelector(
    [transactions],
    (transactions:Transaction[]) =>{
        if(transactions == undefined)
            return;
        
        return commonType.groupBy(transactions, item=>item.category)    
    }
);


const selectGroupedBudget = createSelector(
    [budgets],
    (budget: Budget[])=>{
        if(budget == undefined)
            return;
        
        return commonType.groupBy(budget, item=>item.category)
    }
);

const selectFilterTransaction = createSelector(
    [selectGroupedTransactions, selectGroupedBudget],
    (budget, transactions) => {
        if(budget == undefined || transactions == undefined)
            return;

        return commonType.filterByKey(budget, transactions,"category");
    }
);


export const selectDataByLatestDate = createSelector(
    [selectGroupedBudget, selectFilterTransaction],
    (budget, transaction)=> {
        if(budget == undefined || transaction == undefined)
            return;

        return commonType.entries(transaction).map((data)=> {
            const [category, values] = data;

            const latestMonth = Math.max(...values.map((value:Transaction)=> new Date(value.date).getMonth()));

            const latestSpent = values.reduce((acc:number, curr:Transaction)=> {
                const currMonth = new Date(curr.date).getMonth();
                return latestMonth == currMonth ? acc += Math.abs(curr.amount) : acc;
            }, 0);

            const remainingSpent = budget[category.toString()][0].maximum - latestSpent;

            return {
                info: {
                    spent: latestSpent,
                    remaining: remainingSpent,
                    ... budget[category.toString()][0]
                },
                values: values
            }
        });


    }
)



