import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Transaction } from "../slices/types";

    const transactions = (state: RootState) => state.postReducer.transactions;
    const bills_txt = ["Paid Bills", "Total Upcoming", "Due Soon"];


export const recurringBillsValue = createSelector(
    [transactions],
    (transactions : Transaction[] )=> { 
       
        const filterBills = transactions
            .filter(
                (item :any) =>
                item.category === "Bills" &&
                item.amount < 0
            );

        //Total
        let billsTotal = filterBills
            .reduce((sum, item) =>  sum + Math.abs(item.amount), 0);
        //Paid , 이미결제 된 청구서 
        //지불 완료 total / 지불 완료 Count
        const paidBills = filterBills.filter((item) => item.recurring === false);
        const paidBillsSum = paidBills.reduce((sum, item) => sum + Math.abs(item.amount), 0).toFixed(2);
        const paidBillsCount = paidBills.length;

        
        //Upcoming : true / 아직 결제되지 않은 청구서 합
        //다가오는 청구서 금액 / 다가오는 청구서 Count
        const filterUpcomingBills = filterBills
            .filter((item) => 
                item.recurring === true &&
                new Date(item.date) > new Date()); //오늘 이후
        const upcomingSum = filterUpcomingBills.reduce((sum, item) => sum + Math.abs(item.amount), 0).toFixed(2);
        const upcomingSumCount = filterUpcomingBills.length;

        //Due : 7일 이내 납부일 청구서 
        //곧 마감될 청구서 총 금액 / 곧 마감될 청구서 총 Count
        const oneWeekLater = new Date();
        oneWeekLater.setDate(new Date().getDate() + 7);

        const filterDueBills = filterUpcomingBills.filter(item => (
            item.recurring === true &&
            new Date(item.date) <= oneWeekLater
        ));
        const dueSum = filterDueBills.reduce((sum, item) => sum + Math.abs(item.amount), 0).toFixed(2);
        const dueSumCount = filterDueBills.length;

        const items = bills_txt.map((name) => {
            if(name ==="Paid Bills"){
                return {  name, money : paidBillsSum, count : paidBillsCount, color: 'black'}  
            }else if(name ==="Total Upcoming"){
                return {  name, money : upcomingSum, count : upcomingSumCount, color: 'black'}  
            }else{
                return {  name, money : dueSum, count : dueSumCount, color : 'red'}  
            }
        });
        return {    
            items ,
            billsTotal
        };
    }
)