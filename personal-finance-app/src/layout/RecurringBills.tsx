import { useDispatch, useSelector } from "react-redux"
import { Card } from "../components/Card"
import { rootState } from "../store"
//import { setQuery, setResult } from '../store/index';

import recurring from "/images/icon-recurring-bills.svg";
import  searchImg  from "/images/icon-search.svg"
import due  from "/images/icon-bill-due.svg";
import paid from "/images/icon-bill-paid.svg";
import { useEffect, useRef, useState } from "react";


export const RecurringBills = () => {
    const dispatch = useDispatch();
    const _data = useSelector((state:rootState)=> state.dataReducer);
    
    const [search, setSearch ] = useState(""); 
    
    const filterData = _data.transactions.filter(transaction =>
        transaction.name.toLowerCase().includes(search.toLowerCase())
    );

   // dispatch(setResult(filterData));


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
        <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col  md:flex-row lg:flex-col">
                <Card title="" link="">
                    <div className="flex flex-col justify-between bg-black text-white w-[25vw]">
                        <img className="w-8 py-8" src={recurring}></img>
                        <span className="">Total Bills</span>
                        <span className="pt-3 pb-5">$190.00</span>
                    </div>
                </Card>
                <Card title="" link="">
                    <span className="">Summary</span>
                    <ul>
                            <li>
                                <div className="flex justify-between">
                                    <span>Paid Bills</span>
                                    <span>$190.00</span>
                                </div>
                            </li>
                            <li>
                                <div className="flex justify-between">
                                    <span>Total Upcoming</span>
                                    <span>$194.98</span>
                                </div>
                            </li>
                            <li>
                                <div className="flex justify-between">
                                    <span>Due Soon</span>
                                    <span>$59.98</span>
                                </div>
                            </li>
                        </ul>
                </Card>
            </div>
            <Card>
                <div className="flex ">
                    <div className="w-1/2">
                        <input type="text" 
                           // onChange={(e)=>{dispatch(setQuery(e.target.value))}}
                              onChange={(e)=>{}}
                            className="rounded-md w-[100%] p-2 border-1 placeholder:text-slate-300 border-slate-300 overflow-hidden" 
                            placeholder={"Search bills"}
                        >
                        </input>
                        <img src={searchImg} className="absolute top-[43%] right-[60%] bg-white"></img>
                    </div>
                        <div className="w-1/2">
                        <span>Sort by</span>
                        <select name="sort" className="rounded-md w-[60%] p-2 border-1 border-slate-300 overflow-hidden">
                            <option value="Latest">Latest</option>
                            <option value="Oldest">Oldest</option>
                            <option value="AtoZ">A to Z</option>
                            <option value="ZtoA">Z to A</option>
                            <option value="Highest">Highest</option>
                            <option value="Lowest">Lowest</option>
                        </select>
                        
                    </div>
                </div>
                <div>
                    <ul>
                        <li className="grid grid-cols-10 border-b-1 border-[#B3B3B3] pb-5">
                            <span className="col-span-5">Blill Title</span>
                            <span className="col-span-3">Due Date</span>
                                <span className="col-span-2 ml-auto">Amount</span>
                        </li>

                        { _data.transactions.length > 0 ? (
                            _data.transactions.map((transaction, index) => {
                                const profileName = transaction.name.toLowerCase().replace(/\s+/g,'-');
                                const profilePath = `/images/avatars/`+profileName+`.jpg`;
                                const ordinalSuffixDate = 'Monthly-'+ordinal_suffix_of(transaction.date);
                                const amount = Math.abs(transaction.amount).toLocaleString();
                            
                                return (
                                    <li key={index} className="p-2 border-b border-gray-200">
                                        <div className="flex justify-between">
                                            <span>
                                                <img src={profilePath}  className="w-[32px] h-[32px] rounded-full"/>{transaction.name}</span>
                                            <span className={` ${transaction.recurring? 'text-gray-500' : 'text-green-800'}`}>
                                                {ordinalSuffixDate}
                                                <img src={transaction.recurring? due : paid} />
                                            </span>
                                            <span className={`font-bold ${transaction.recurring === true? 'text-red-400':'text-black' }`}>${amount}</span>
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
            </Card>
        </div>
    )
}
