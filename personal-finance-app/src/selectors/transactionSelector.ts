import { RootState } from "../store";
import { Budget, initialDataState } from "../store/slices/types";
import { StringKeyObject, commonType } from "../store/type";

export const groupByCategory = (state: RootState) => {
    const transaction = initialDataState.transactions;
    const budget = initialDataState.budgets;

    const budgetCategory = budget.map((value: Budget)=>value.category);
    const transactionByBudgetCategory = 
         transaction.filter((value)=>budgetCategory.includes(value.category))
                    .reduce((acc:StringKeyObject, value)=> {
                        acc[value.category] = acc[value.category] || [];
                        acc[value.category].push(value);
                        return acc;
                    }, {});

    const recentData = commonType.entries(transactionByBudgetCategory).map(([key,value]:[string|number, {}[]])=> {
        const budgetInfo = budget.filter((v=>v.category==key))[0];

        const recent = value.reduce((curr:number,next:any)=> {
            curr +=  (new Date(next.date).getMonth() == 7) ?  Math.abs(next.amount) : 0;
            return curr;
        }, 0);

        const remaining = budgetInfo.maximum - recent;

        return {
            info: Object.assign(budgetInfo, {recent: recent, remaining: remaining}),
            values: value
        }
    });




}