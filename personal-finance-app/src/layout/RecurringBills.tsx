import { useDispatch, useSelector } from "react-redux"
import { rootState, Transaction } from "../store"
import { useEffect, useState } from "react";
import { setFilter, setSortData } from "../store/index"

import iconsort from "/images/icon-sort-mobile.svg";
import recurring from "/images/icon-recurring-bills.svg";
import  searchImg  from "/images/icon-search.svg"
import due  from "/images/icon-bill-due.svg";
import paid from "/images/icon-bill-paid.svg";
import { Card } from "../components/Card";


export const RecurringBills = () => {
    const dispatch = useDispatch();
    const transactions = useSelector((state: rootState) => state.dataReducer.transactions);
    const searchKeyword = useSelector((state:any) => state.dataReducer);

    const [keyword, setKeyword ] = useState(""); 
    const [sortBy , setSortBy ]  = useState(""); 

    const [BillsTotal , setBillsTotal] = useState<number>(); 
    const [PaidBills , setPaidBills] = useState<number>();     //지불 완료 total
    const [PaidCount, setPaidCount] = useState<number>();      //지불 완료 Count
    const [Upcoming , setUpcoming] = useState<number>();       //다가오는 청구서 금액
    const [UpcomingCount, setUpcomingCount] = useState<number>();//다가오는 청구서 Count
    const [DueSoon , setDueSoon] = useState<number>();          //곧 마감될 청구서 총 금액
    const [DueSoonCount, setDueSoonCount] = useState<number>(); //곧 마감될 청구서 총 Count
    
    useEffect(()=> {
        const filteredBills = (transactions ?? [])
            .filter(
                (item) =>
                item.category === "Bills" &&
                item.amount < 0
            );
        
        //Total
        let BillsTotal = filteredBills
            .reduce((sum, item) =>  sum + Math.abs(item.amount), 0);
            setBillsTotal(BillsTotal);
      
        //Paid , 이미결제 된 청구서 / 
        let paidBillsArr = filteredBills
            .filter((item) => item.recurring === false);

        let paidBillsSum = paidBillsArr.reduce((sum, item) => sum + Math.abs(item.amount), 0);

        setPaidBills(paidBillsSum);
        setPaidCount(paidBillsArr.length);
        


        //Upcoming : true / 아직 결제되지 않은 청구서 합
        let upcomingArr = filteredBills
            .filter((item) => 
                item.recurring === true &&
                new Date(item.date) > new Date()); //오늘 이후
        let upcomingSum = upcomingArr.reduce((sum, item) => sum + Math.abs(item.amount), 0);
        setUpcoming(upcomingSum);
        setUpcomingCount(upcomingArr.length);


        //Due : 7일 이내 납부일 청구서 
        const oneWeekLater = new Date();
        oneWeekLater.setDate(new Date().getDate() + 7);

        let dueArr = upcomingArr.filter(item => (
            item.recurring === true &&
            new Date(item.date) <= oneWeekLater
        ));
        let dueSum = dueArr.reduce((sum, item) => sum + Math.abs(item.amount), 0);
        setDueSoon(dueSum);
        setDueSoonCount(dueArr.length);

    },[]);



    useEffect(()=> {
       dispatch(setFilter(keyword));
    },[keyword]);
   
    useEffect(() => {
        dispatch(setSortData(sortBy));
    },[sortBy])

    // 서수 접미사 붙이기 함수
    function ordinal_suffix_of(d:any) {
        const dateObj = new Date(d);
        const day = dateObj.getDate();
        let j = day % 10;
        let k = day % 100;

        if (j === 1 && k !== 11) return day + "st";
        else if (j === 2 && k !== 12)return day + "nd";
        else if (j === 3 && k !== 13)return day + "rd";
        return day+'th';
    }



    return (
        <div className="flex p-6 mx-auto my-auto">
             <div className="flex flex-col min-w-xs md:w-3xl lg:w-5xl">
                <div className="flex mt-5 font-semibold text-4xl mb-8">Recurring Bills</div>
                
                <div className="flex flex-col lg:flex-row  gap-5 md:gap-0 lg:gap-5">
                    <div className="flex flex-col md:flex-row lg:w-1/3 lg:flex-col md:mb-8 gap-5">
                        <Card link="" backColor="#000">
                            <div className="flex flex-row md:flex-col text-white ">
                                <img className="w-12" src={recurring}></img>
                                <div className="flex flex-col pl-8 md:pl-0 md:pt-8">
                                    <span className="leading-10 text-base">Total Bills</span>
                                    <span className="text-4xl font-bold">${BillsTotal}</span>
                                </div>
                            </div>
                        </Card>
                        <Card link="">
                            <div className="leading-8 text-2xl font-semibold sm:mb-5">Summary</div>
                            <div className="flex">
                                <ul className="flex flex-col w-full">
                                    <li className="text-gray-400 leading-10 text-lg">Paid Bills</li>
                                    <li className="text-gray-400 leading-10">Total Upcoming</li>
                                    <li className="text-red-400 leading-10 ">Due Soon</li>
                                </ul>
                                <ul className="flex flex-col w-full text-right">
                                    <li className="leading-10 text-lg font-semibold"> {PaidCount}(${PaidBills})</li>
                                    <li className="leading-10 text-lg font-semibold">{UpcomingCount}(${Upcoming})</li>
                                    <li className="leading-10 text-lg font-semibold text-red-500">{DueSoonCount}(${DueSoon})</li>
                                </ul>
                            </div>
                        </Card>
                    </div>
                    
                           
                    <Card link="">
                        <div className="flex ">
                            <div className="flex relative w-5/6  md:w-1/2">
                                <input type="text" 
                                    onChange={(e)=>{setKeyword(e.target.value)}}
                                    className="w-full rounded-md p-2 border-1 placeholder:text-slate-300 overflow-hidden" 
                                    placeholder={"Search bills"}
                                >
                                </input>
                                <img src={searchImg} className="absolute top-[34%] right-[4%] bg-white"></img>
                            </div>
                            <div className="flex w-1/6  md:w-1/2 justify-end">
                                <button id="toggleMobileBtn" className="block md:hidden">
                                    <img className="w-6"  src={iconsort} onClick={()=>{}}/>
                                </button>
                                <span className="flex  hidden md:flex md:items-center md:mr-3 text-gray-500 text-sm ">Sort by</span>
                                <select name="sort"
                                    id="toggleSelectBtn"  
                                    onChange={(e)=>{ setSortBy(e.target.value); }} 
                                    className="hidden md:block text-gray-500 text-base rounded-md p-2 border-1 border-slate-300 overflow-hidden">
                                    <option value="Latest">Latest</option>
                                    <option value="Oldest">Oldest</option>
                                    <option value="AtoZ">A to Z</option>
                                    <option value="ZtoA">Z to A</option>
                                    <option value="Highest">Highest</option>
                                    <option value="Lowest">Lowest</option>
                                </select>
                            </div>
                            <div className="block md:hidden">
                            </div>
                        </div>
                        
                        <div className="w-full mx-auto pt-3">
                            <div className="flex text-gray-400  hidden md:flex">
                                <div className="w-3/5  pt-3 pb-3">Blill Title</div>
                                <div className="w-1/5  pt-3 pb-3">Due Date</div>
                                <div className="w-1/5 text-right pt-3 pb-3 ">Amount</div>
                            </div>     
                            <ul  className="divide-y  rounded-b-lg border-b-indigo-100">
                            { transactions && transactions.length > 0 ? 
                                transactions.map((transaction, index) => {
                                    const profileName = transaction.name.toLowerCase().replace(/\s+/g,'-').replace(/&/g, "and");
                                    const profilePath = `/images/avatars/`+profileName+`.jpg`;
                                    const ordinalSuffixDate = 'Monthly-'+ordinal_suffix_of(transaction.date);
                                    const amount = Math.abs(transaction.amount).toLocaleString();
                                
                                    return (
                                        <li key={index} className="flex flex-col w-full md:flex-row hover:bg-gray-50 cursor-pointer pt-5 pb-5">
                                            <div className="flex md:w-3/5 items-center gap-2 text-left">
                                                <img src={profilePath}  className="w-[45px] h-[45px] rounded-full"/>
                                                <div className="text-xl font-semibold pl-2">{transaction.name}</div>
                                            </div>
                                            <div className="flex  md:w-2/5  justify-between md:justify-start">
                                                <div className={`flex md:w-2/3  justify-start items-center gap-2 text-center ${transaction.recurring ? 'text-gray-500' : 'text-green-800'}`}>
                                                    <div className=" whitespace-nowrap">{ordinalSuffixDate}</div>
                                                    <img className=" w-4 h-4 shrink-0" src={transaction.recurring? due : paid} />
                                                </div>
                                                <div className={` flex md:w-1/3 justify-end text-xl font-semibold ${transaction.recurring ? 'text-red-400' : 'text-black'}`}>
                                                    ${amount}
                                                </div>    
                                            </div>                            
                                        </li>
                                    )
                                }
                                )
                                :  <li>No results found</li>
                            }
                            </ul>
                        </div>  
                    </Card>
                </div>
             </div>
        </div>
    )
}
