import { useDispatch, useSelector } from "react-redux"
import { rootState } from "../store"
import { useEffect, useState } from "react";
import { setFilter, setSortOption } from "../store/index"

import recurring from "/images/icon-recurring-bills.svg";
import  searchImg  from "/images/icon-search.svg"
import due  from "/images/icon-bill-due.svg";
import paid from "/images/icon-bill-paid.svg";


export const RecurringBills = () => {
    const dispatch = useDispatch();
    const transactions = useSelector((state:rootState)=> state.dataReducer.filteredTransactions);
    
    const [searchTerm, setSearchTerm ] = useState(""); 
    const [sortBy , setSortBy ]  = useState(""); 

    const [PaidBills , setPaidBills] = useState<number>(); 
    const [TotalUpcoming , setTotalUpcoming] = useState<number>(); 
    const [DueSoon , setDueSoon] = useState<number>(); 
    


    useEffect(()=> {
        const filterTransctions = transactions.filter(transaction => 
            transaction.recurring ==true && 
            transaction.category === "Bills" &&
            transaction.amount  < 0 
        );
        let BillsTotal = 0;
        filterTransctions.map((item) => {
            BillsTotal +=item.amount;
        })
        console.log("BillsTotal"+ BillsTotal);
        setPaidBills(BillsTotal);
    },[]);


    useEffect(()=> {
       dispatch(setFilter(searchTerm));
    },[searchTerm]);
   
    useEffect(() => {
        dispatch(setSortOption(sortBy));
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
             <div className="flex  w-4xl lg:flex-row">
                {/* <div className="mt-5 font-bold text-2xl">Recurring Bills</div> */}
                
                <div className="fle flex-col lg:basis-1/4  md:flex-row lg:flex-col">
                    <div className="flex flex-col justify-between p-6 rounded-md bg-black text-white">
                        <img className="w-7  pb-6" src={recurring}></img>
                        <span className="text-xs">Total Bills</span>
                        <span className="text-3xl font-bold">$190.00</span>
                    </div>
                    <div className="flex-1 bg-white p-6 rounded-md shadow-md">
                        <span className="text-sm font-semibold">Summary</span>
                        <ul>
                            <li className="text-xs py-2 border-gray-200">
                                <div className="flex justify-between">
                                    <span>Paid Bills</span>
                                    <span className="font-semibold">$190.00</span>
                                </div>
                            </li>
                            <li className="text-xs py-2 border-gray-200">
                                <div className="flex justify-between">
                                    <span>Total Upcoming</span>
                                    <span className="font-semibold">$194.98</span>
                                </div>
                            </li>
                            <li className="text-xs py-2">
                                <div className="flex justify-between">
                                    <span className="text-red-500">Due Soon</span>
                                    <span className="text-red-500 font-semibold">$59.98</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col w-[90vw] lg:basis-3/4 bg-white rounded-md shadow-md">
                    <div className="flex gap-4 w-full mb-4">
                        <div className="flex items-center basis-full lg:basis-1/2 relative">
                            <input type="text" 
                            // onChange={(e)=>{dispatch(setQuery(e.target.value))}}
                                onChange={(e)=>{ setSearchTerm(e.target.value); }}
                                className="rounded-md p-2 border-1 placeholder:text-slate-300overflow-hidden" 
                                placeholder={"Search bills"}
                            >
                            </input>
                            <img src={searchImg} className="absolute top-[43%] right-[60%] bg-white"></img>
                        </div>
                        <div className="flex items-center basis-full lg:basis-1/2 gap-2">
                            <span className="text-gray-500 text-sm">Sort by</span>
                            <select name="sort"  onChange={(e)=>{ setSortBy(e.target.value); }} className="text-gray-500 text-base rounded-md w-[60%] p-2 border-1 border-slate-300 overflow-hidden">
                                <option value="Latest">Latest</option>
                                <option value="Oldest">Oldest</option>
                                <option value="AtoZ">A to Z</option>
                                <option value="ZtoA">Z to A</option>
                                <option value="Highest">Highest</option>
                                <option value="Lowest">Lowest</option>
                            </select>
                        </div>
                    </div>
                    <div className="max-w-2xl mx-auto p-4">
                        <ul className="flex text-gray-400">
                            <li className="basis-1/2 p-3 text-left">
                               Blill Title
                            </li>
                            <li className="basis-1/4 p-3 text-left text-sm">
                                Due Date
                            </li>
                            <li className="basis-1/4 p-3 text-center">
                                Amount
                            </li>
                        </ul>     
                        <ul  className="divide-y  rounded-b-lg">
                        { transactions.length > 0 ? (
                            transactions.map((transaction, index) => {
                                const profileName = transaction.name.toLowerCase().replace(/\s+/g,'-');
                                const profilePath = `/images/avatars/`+profileName+`.jpg`;
                                const ordinalSuffixDate = 'Monthly-'+ordinal_suffix_of(transaction.date);
                                const amount = Math.abs(transaction.amount).toLocaleString();
                            
                                return (
                                   <li className="flex items-center hover:bg-gray-50 cursor-pointer">
                                        <div className="basis-1/2 flex items-center gap-2 p-3 text-left">
                                            <img src={profilePath}  className="w-[32px] h-[32px] rounded-full"/>
                                            <div>{transaction.name}</div>
                                        </div>
                                                
                                        <div className={`basis-1/4 flex items-center justify-center gap-2 p-3 text-center ${transaction.recurring ? 'text-gray-500' : 'text-green-800'}`}>
                                            <div  className="whitespace-nowrap">{ordinalSuffixDate}</div>
                                            <img  className="w-5 h-5 shrink-0" src={transaction.recurring? due : paid} />
                                        </div>
                                        <div className={`basis-1/4 p-3 text-center ${transaction.recurring ? 'text-red-400' : 'text-black'}`}>
                                            ${amount}
                                        </div>                                    
                                    </li>
                                )
                            
                            }
                        )
                            ) : (
                                <li>No results found</li>
                            )
                        }
                        </ul>
                    </div>  
                </div>
             </div>
        </div>
    )
}
