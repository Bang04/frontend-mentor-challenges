import { useSelector } from "react-redux";
import { Card } from "../components/card"
import { rootState } from "../store";
import { useState } from "react";
import  search  from "/images/icon-search.svg"

export const Transactions = () => {
    const _data = useSelector((state:rootState)=> state.dataReducer);

    const countPerPage = 10;
    const totalCounts = Math.ceil(_data.transactions.length/countPerPage);

    const [pageNum, setPageNUm] = useState(1);

    const setPage = (_num: number) => {
        setPageNUm(_num);
    };

    return (
        <div className="bg-[#F8F4F0] flex mx-auto my-auto">
            <Card title="" link="">
                <div className="">
                    <div className="grid">
                        <div className="relative">
                            <input type="text" className="rounded-md w-[30%] p-2 border-1 placeholder:text-slate-300 border-slate-300 overflow-hidden" placeholder={"Search transaction"}>
                            </input>
                            <img src={search} className="absolute top-[30%] right-[71%] bg-white"></img>
                        </div>
                        <div>
                            
                        </div>
                        <div>
                            
                        </div>
                    </div>
                    <div className="w-[80vw] my-5 text-xs">
                        <ul>
                            <li className="grid grid-cols-10 border-b-1 border-[#B3B3B3] pb-5">
                                <span className="col-span-4">Recipient / Sender</span>
                                <span className="col-span-3">Category</span>
                                <span className="col-span-2">Transaction Date</span>
                                <span className="col-span-1 ml-auto">Amount</span>
                            </li>
                            {/* { pageNum*countPerPage-countPerPage} {pageNum*countPerPage} */}
                            {
                                _data.transactions.slice(((pageNum*countPerPage)-countPerPage), pageNum*countPerPage).map((value,_index)=> (
                                    <li key={_index} className="grid grid-cols-10 border-b-1 border-[#B3B3B3] py-3">
                                        <span className="flex col-span-4">
                                            <img src={value.avatar} className="h-12 w-12 rounded-full" />
                                            <div className="font-bold my-auto mx-3">
                                                {value.name}
                                            </div>
                                        </span>
                                        <span className="col-span-3 place-content-center">
                                            {value.category}
                                        </span>
                                        <span className="col-span-2 place-content-center">
                                            {
                                                new Date(value.date)
                                                    .toLocaleString("en-GB", 
                                                    {day:"numeric", month:"short", year:"numeric"})
                                                
                                            }
                                        </span>
                                        <span className="col-span-1 ml-auto place-content-center">
                                            <div>{value.amount}</div>
                                        </span>
                                    </li>
                                ))                                
                            }
                        </ul>
                    </div>
                    <div className="grid grid-cols-10">
                        <div className="col-span-1">
                            <button type="button" className="button px-5 py-1 rounded-sm border-1">Prev</button>
                        </div>
                        <div className="col-span-8 place-content-center m-auto">
                            {
                                Array.from({length: totalCounts}, (_,i)=>i+1).map((value:number)=> (        
                                        <button key={value} onClick={()=>setPage(value)} type="button" 
                                                className={`pointer w-8 h-8 rounded-sm border-1 mx-1 ${pageNum == value ? "bg-black text-white":""}`}>
                                                {value}
                                        </button>))
                            }
                        </div>
                        <div className="col-span-1 ml-auto">
                            <button type="button" className="button px-5 py-1 rounded-sm border-1"> Next</button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}