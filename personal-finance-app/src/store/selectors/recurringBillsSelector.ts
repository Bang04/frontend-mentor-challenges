import { createSelector } from "@reduxjs/toolkit";
import { Transaction } from "../slices/types";
import { dbState } from "../firebase/subscribe";
 
const transactions = (state: {postReducer: dbState}) => state.postReducer.byPath["transactions"]
const bills_txt = ["Paid Bills", "Total Upcoming", "Due Soon"];

export const recurringBillsValue = createSelector(
    [transactions],
    (transactions : Transaction[] )=> { 
        
        if(transactions === undefined || Object.keys(transactions).length == 0)
            return;

        const filterBills = transactions
            ?.filter(
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
        const paidCount = paidBills.length;

        
        //Upcoming : true / 아직 결제되지 않은 청구서 합
        //다가오는 청구서 금액 / 다가오는 청구서 Count
        const filterUpcomingBills = filterBills
            .filter((item) => 
                item.recurring === true &&
                new Date(item.date) > new Date()); //오늘 이후
        const upcomingSum = filterUpcomingBills.reduce((sum, item) => sum + Math.abs(item.amount), 0).toFixed(2);
        const upcomingCount = filterUpcomingBills.length;

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
                return {  name, money : paidBillsSum, count : paidCount, theme:"#277c78" }  
            }else if(name ==="Total Upcoming"){
                return {  name, money : upcomingSum, count : upcomingCount, theme:"#f2cdac"}  
            }else{
                return {  name, money : dueSum, count : dueSumCount, theme:"#82c9d7"}  
            }
        });
        return {    
            items ,
            billsTotal
        };
    }
)