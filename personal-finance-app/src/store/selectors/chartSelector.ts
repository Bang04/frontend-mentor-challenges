import { createSelector } from "@reduxjs/toolkit";
import { selectDataByLatestDate } from "./transactionSelector";

export type donut = {
    totalAmount: number
    sumSpent: number
    data: {
        spent: number
        maximum: number
        theme: string
        category: string
    }[]
  };
  


export const selectChartData = createSelector(
    [selectDataByLatestDate],
    (data)=> {
        if(data == undefined || data.length == 0)
            return;

        return data?.reduce((acc:donut, curr:any)=> {
            return {
                totalAmount: acc.totalAmount + curr.info.maximum,
                sumSpent: acc.sumSpent + curr.info.spent,
                data: [
                    ...acc.data,
                    curr.info
                ]

            }
        }, {totalAmount: 0, sumSpent: 0, data: []});
    }
)


export const selectRoundingValues = createSelector(
    [selectChartData],
    (values)=> {
        if(values == undefined || Object.keys(values).length === 0)
            return;

        const data = values.data;

        // get raw point
        const raw = data.map((v,i)=> Math.round((v.spent/v.maximum)*100));
    
        // get raw total point
        const rawTotal = raw.reduce((a,b)=> a+b) ?? 1;
    
        const percent = raw?.map((v,i)=> Math.round(v*100/rawTotal));
    
        // 반올림 하는거 잘 분배하는 필요!
        const graphData = data?.map((v,i)=> ({
            ...v,
            value: percent?.[i]
        })); 

        return graphData;
    }
)