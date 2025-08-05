import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";

import { RootState } from "../store";
import { setFilter } from "../store/slices/filterSlice";
import { commonType } from "../store/type";
import { recurringBillsValue } from "../store/selectors/recurringBillsSelector";

import { Card } from "../components/card";

import iconsort from "/images/icon-sort-mobile.svg";
import recurring from "/images/icon-recurring-bills.svg";
import  searchImg  from "/images/icon-search.svg"
import due  from "/images/icon-bill-due.svg";
import paid from "/images/icon-bill-paid.svg";

export const RecurringBills = () => {
    const dispatch = useDispatch();
    const transactions = useSelector((state: RootState) => state.postReducer.transactions);
    const searchKeyword = useSelector((state:any) => state.dataReducer);
    const bills_total= useSelector(recurringBillsValue);

    const [keyword, setKeyword ] = useState(""); 
    const [sortBy , setSortBy ]  = useState(""); 

    useEffect(()=> {
       dispatch(setFilter(keyword));
    },[keyword]);
   
    useEffect(() => {
       // dispatch(setSortData(sortBy));
    },[sortBy])

    return (
        <div className="flex m-10">
             <div className="flex flex-col min-w-xs md:w-3xl lg:w-5xl">
                <div className="flex mt-5 font-semibold text-4xl mb-8">Recurring Bills</div>
                
                <div className="flex flex-col lg:flex-row  gap-5 md:gap-0 lg:gap-5">
                    <div className="flex flex-col md:flex-row lg:w-1/3 lg:flex-col md:mb-8 gap-5">
                        <Card link="" backColor="#000">
                            <div className="flex flex-row md:flex-col text-white ">
                                <img className="w-12" src={recurring}></img>
                                <div className="flex flex-col pl-8 md:pl-0 md:pt-8">
                                    <span className="leading-10 text-base">Total Bills</span>
                                    <span className="text-4xl font-bold">${bills_total.billsTotal}</span>
                                </div>
                            </div>
                        </Card>
                        <Card link="">
                            <div className="leading-8 text-2xl font-semibold sm:mb-5">Summary</div>
                            {
                                bills_total.items.map((item)=> {
                                    return (
                                        <div className="flex flex-row justify-between">
                                            <div className={`${item.color == 'black'? 'text-gray-400' : 'text-red-400'} leading-10`}>{item.name}</div>
                                            <div className={`${item.color == 'black'? '' : 'text-red-500'} leading-10`}>{item.count}($ {item.money})</div>
                                        </div>
                                    )
                                })
                            }
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
                                    const profile = `/images/avatars/`+profileName+`.jpg`;
                                    const osfx = 'Monthly-'+commonType.formatOrdinal(transaction.date);
                                    const amount = Math.abs(transaction.amount).toLocaleString();
                                
                                    return (
                                        <li key={index} className="flex flex-col w-full md:flex-row hover:bg-gray-50 cursor-pointer pt-5 pb-5">
                                            <div className="flex md:w-3/5 items-center gap-2 text-left">
                                                <img src={profile}  className="w-[45px] h-[45px] rounded-full"/>
                                                <div className="text-xl font-semibold pl-2">{transaction.name}</div>
                                            </div>
                                            <div className="flex  md:w-2/5  justify-between md:justify-start">
                                                <div className={`flex md:w-2/3  justify-start items-center gap-2 text-center ${transaction.recurring ? 'text-gray-500' : 'text-green-800'}`}>
                                                    <div className=" whitespace-nowrap">{osfx}</div>
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
