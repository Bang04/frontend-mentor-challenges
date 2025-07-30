import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Budget, Transaction } from "../store/slices/types";
import { commonType } from "../store/type";

const transactions = (state: RootState) => state.postReducer.transactions;
const budgets = (state: RootState) => state.postReducer.budgets;


const selectGroupedTransactions = createSelector(
    [transactions],
    (transaction:Transaction[]) =>(
        commonType.groupBy(transaction, item=>item.category)    
    )
);


const selectGroupedBudget = createSelector(
    [budgets],
    (budget: Budget[])=>(
         commonType.groupBy(budget, item=>item.category)
    )
);

const selectFilterTransaction = createSelector(
    [selectGroupedTransactions, selectGroupedBudget],
    (budget, transactions) => (
        commonType.filterByKey(budget, transactions,"catogory")
    )
);


export const selectAmountByLatestDate = createSelector(
    [selectFilterTransaction],
    (data)=> {

        commonType.entries(data).map((_data)=> {
            const [category, values] = _data;

            let latest = 0;
            let remaining = 0;
            

            // date별로 계산하고 값 return ?
            // reduce안에서 계산하는 법 찾아보기
            const topDates = values.reduce((curr: { date: number; },next: { date: number; })=> {
                new Date(curr.date).getMonth() > new Date(next.date).getMonth() ? curr : next
            });

            console.log(topDates.date);



        })


    }
)

//         const merged = commonType.filterByKey(categorisedBudget, categorisedTransaction, "category");


// export const selectTest = createSelector(
//     [selectGroupedTransactions],
//     (data) => {
//             const values = data.map((value: any)=> value.values);
//           //  const test2 = test.filter((value:any)=> console.log(value))

//             test.reduce((curr: any,next: any)=> {
//                 const dates = curr.map((v:any)=> new Date(v.date).getMonth()+1);

//                 console.log(dates);
//                 return next;
//             });

//             //console.log(test2);
//         // data.reduce((curr:number, next:{})=> {
//         //     curr += ()        

//         // }, 0);
//     }
// )



