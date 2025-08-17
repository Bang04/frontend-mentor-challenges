import { useDispatch, useSelector } from "react-redux"
import { ChangeEvent, useEffect, useState } from "react";

import { RootState } from "../store";
import { setData, filteredByKeyword, sortByOptions } from "../store/slices/filterSlice";
import { commonType } from "../store/type";
import { recurringBillsValue } from "../store/selectors/recurringBillsSelector";

import { Card } from "../components/card";
import { Dropdown } from "../components/dropdown";
import { SORT_TEXT } from "../constants/sort";

import sort from "/images/icon-sort-mobile.svg";
import recurring from "/images/icon-recurring-bills.svg";
import  search  from "/images/icon-search.svg"
import due  from "/images/icon-bill-due.svg";
import paid from "/images/icon-bill-paid.svg";

export const RecurringBills = () => {
    //const searchKeyword = useSelector((state:any) => state.dataReducer);
    const bills_total= useSelector(recurringBillsValue);

    const data = useSelector((state: RootState) => state.postReducer.data.transactions);
    const filteredData = useSelector((state:RootState)=>state.filterReducer.filteredData);
    const [keyword, setKeyword] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("");

    const dispatch = useDispatch();
    
    useEffect(()=> {
        //setIsRender(true);
        if(data.length > 0){
            dispatch(setData(data));
        }
    }, [data]);

    useEffect(()=> {
       dispatch(filteredByKeyword(keyword));
    },[keyword]);
   
    useEffect(() => {
        dispatch(sortByOptions(sortBy));
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
                                    <span className="text-4xl font-bold">${bills_total?.billsTotal}</span>
                                </div>
                            </div>
                        </Card>
                        <Card link="">
                            <div className="leading-8 text-2xl font-semibold sm:mb-5">Summary</div>
                            {
                                bills_total?.items.map((item, index)=> {
                                    const isLast = bills_total.items.length-1;
                                    return (
                                        <div className="flex flex-row justify-between">
                                            <div className={`${index === isLast ? 'text-red-400' : 'text-gray-400'} leading-10`}>{item.name}</div>
                                            <div className={`${index === isLast ? 'text-red-500': ''} leading-10`}>{item.count}($ {item.money})</div>
                                        </div>
                                    )
                                })
                            }
                        </Card>
                    </div>
                    <Card link="">
                        <div className="flex justify-between">
                             <div className="relative">
                                <input type="text" onChange={(e:ChangeEvent<HTMLInputElement>)=> setKeyword(e.target.value)} className="rounded-md py-2 px-10 border-1 placeholder:text-black border-black-300 overflow-hidden text-sm" placeholder={"Search Bills"}>
                                </input>
                                <img src={search} className="absolute top-[30%] right-[10%] bg-white"></img>
                            </div>
                            <div>
                                <button id="toggleMobileBtn" className="block md:hidden">
                                    <img src={sort} onClick={()=>{}}/>
                                </button>
                                <span className="hidden md:block">
                                    <span className="text-sm text-gray-500">Sort by</span>
                                    <Dropdown onDropdownChanged={setSortBy} options={SORT_TEXT}></Dropdown>
                                </span>
                            </div>
                        </div>
                        
                        <div className="w-full mx-auto pt-3">
                            <div className="flex text-gray-400  hidden md:flex">
                                <div className="w-3/5  pt-3 pb-3">Blill Title</div>
                                <div className="w-1/5  pt-3 pb-3">Due Date</div>
                                <div className="w-1/5 text-right pt-3 pb-3 ">Amount</div>
                            </div>     
                            <ul  className="divide-y  rounded-b-lg border-b-indigo-100">
                            { data && data.length > 0 ? 
                                filteredData.map((transaction, index) => {
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
                                })
                                :  
                                <li>No results found</li>
                            }
                            </ul>
                        </div>  
                    </Card>
                </div>
             </div>
        </div>
    )
}