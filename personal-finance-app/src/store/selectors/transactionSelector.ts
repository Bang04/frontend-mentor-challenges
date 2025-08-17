import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Budget, Transaction } from "../slices/types";
import { commonType } from "../type";

const transactions = (state: RootState) => state.postReducer.data.transactions;
const budgets = (state: RootState) => state.postReducer.data.budgets;


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

        console.log(transaction, budget);

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



