import { useSelector } from "react-redux"
import { Card } from "../components/Card"
import { rootState } from "../store"
import recurring from "/images/icon-recurring-bills.svg";
import  search  from "/images/icon-search.svg"
import due  from "icon-bill-due.svg";
import paid from "icon-bill-paid.svg";

import i from "aqua-flow-utilities.jpg";
export const RecurringBills = () => {
    const _data = useSelector((state:rootState)=> state.dataReducer);
    
   
    

    // 서수 접미사 붙이기 함수
    function getOrdinalSuffix(d:any) {
        const date = new Date(d);
        const day = date.getUTCDate();
        if (d >= 11 && d <= 13) return `${d}th`;
        const lastDigit = d % 10;
        if (lastDigit === 1) return `${d}st`;
        if (lastDigit === 2) return `${d}nd`;
        if (lastDigit === 3) return `${d}rd`;

        return `monthly-${date}th`;
    }

    return (
        <>
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
                        <input type="text" className="rounded-md w-[100%] p-2 border-1 placeholder:text-slate-300 
                        border-slate-300 overflow-hidden" placeholder={"Search bills"}>
                        </input>
                        <img src={search} className="absolute top-[43%] right-[60%] bg-white"></img>
                    </div>
                     <div className="w-1/2">
                        <span>Sort by</span>
                        <select name="sort" className="rounded-md w-[60%] p-2 border-1
                        border-slate-300 overflow-hidden">
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

                        {_data.transactions.map((transaction, index) => (
                            <li key={index} className="p-2 border-b border-gray-200">
                                <div className="flex justify-between">
                                    <span><img src="" />{transaction.name}</span>
                                    <span>{getOrdinalSuffix(transaction.date)}</span>
                                    <span>${transaction.amount}</span>
                                </div>
                            </li>
                        ))}  
                    </ul> 
                </div>  
            </Card>
            
        </div>
        </>
    )
}
