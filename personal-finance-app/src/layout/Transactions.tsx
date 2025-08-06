import { useDispatch, useSelector } from "react-redux";
import { Card } from "../components/card"
import { ChangeEvent, useEffect, useState } from "react";
import  search  from "/images/icon-search.svg"
import { Dropdown } from "../components/dropdown";
import { CATEGORIES } from "../constants/categories";
import { SORT_TEXT } from "../constants/sort";
import { RootState } from "../store";
import filterIcon from "/images/icon-filter-mobile.svg";
import sortIcon  from "/images/icon-sort-mobile.svg"
import { commonType } from "../store/type";
import { filteredByCategory, filteredByKeyword, getFilteredData, setData, sortByOptions } from "../store/slices/filterSlice";
import { Button } from "../components/Button";

export const Transactions = () => {
    //나중에 서버에 청구할 데이터
    const data = useSelector((state:RootState)=> state.postReducer.transactions);
    const filteredData = useSelector((state:RootState)=>state.filterReducer.filteredData);
    
    const [category, setCategory] = useState<string>("");
    const [keyword, setKeyword] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("");


    const dispatch = useDispatch();

    useEffect(()=> {
        if(data.length > 0){
            dispatch(setData(data));
        }
    }, [data]);

    /* 검색 */
    useEffect((()=> {
        dispatch(filteredByKeyword(keyword));
    }), [keyword]);

     /* 카테고리 */
    useEffect(()=> {
        dispatch(filteredByCategory(category));
    }, [category]);

     /* 정렬 */
    useEffect(()=> {
        dispatch(sortByOptions(sortBy));
    }, [sortBy]);

    const countPerPage = 10;
    const totalCounts = Array.from({length: Math.ceil(filteredData.length/countPerPage)}).map((_,i)=> i+1);

    const [pageNum, setPageNum] = useState(1);

    const setPage = (_num: number) => {
        setPageNum(_num);
    };

    return (
        <div className="bg-[#F8F4F0]">
            <div className="lg:w-full sm:w-screen m-10">
                <div className="font-semibold text-4xl my-5">Transactions</div>
                <Card title="" link="">
                    <div className="">
                        <div className="flex justify-between">
                            <div className="relative">
                                <input type="text" onChange={(e:ChangeEvent<HTMLInputElement>)=> setKeyword(e.target.value)} className="rounded-md py-2 sm:px-10 border-1 placeholder:text-gray border-gray-400 overflow-hidden text-sm" placeholder={"Search transaction"}>
                                </input>
                                <img src={search} className="absolute top-[30%] right-[10%] bg-white"></img>
                            </div>
                            <div className="hidden sm:block">
                                <span>
                                    <span className="text-sm text-gray-500">Sort by</span>
                                    <Dropdown onDropdownChanged={setSortBy} options={SORT_TEXT}></Dropdown>
                                </span>
                                <span>
                                    <span className="text-sm text-gray-500">Category</span>
                                    <Dropdown onDropdownChanged={(value:string)=>setCategory(value)} options={CATEGORIES}></Dropdown>
                                </span>
                            </div>
                            <div className="flex gap-5 sm:gap-10 items-center sm:hidden">
                                <span>
                                    <img src={sortIcon} className="w-5"/>
                                </span>
                                <span>
                                    <img src={filterIcon} className="w-5"/>
                                </span>
                            </div>
                        </div>
                        <div className="my-5 text-xs">
                            <ul>
                                <li className="grid grid-cols-10 border-b-1 border-[#B3B3B3] pb-5 hidden sm:grid">
                                    <span className="col-span-4">Recipient / Sender</span>
                                    <span className="col-span-3">Category</span>
                                    <span className="col-span-2">Transaction Date</span>
                                    <span className="col-span-1 ml-auto">Amount</span>
                                </li>
                                {
                                    filteredData.slice(((pageNum*countPerPage)-countPerPage), pageNum*countPerPage).map((value:any,_index:any)=> (
                                        <li key={_index} className="grid grid-cols-10 border-b-1 border-[#B3B3B3] py-3">
                                            <span className="flex sm:col-span-4 col-span-5">
                                                <img src={value.avatar} className="h-12 w-12 rounded-full" />
                                                <div className="font-bold my-auto mx-3 flex flex-col gap-2">
                                                    <span>{value.name}</span> 
                                                    <span className="text-gray-400 sm:hidden">{value.category}</span>
                                                </div>
                                            </span>
                                            <span className="col-span-3 place-content-center hidden sm:block">
                                                {value.category}
                                            </span>
                                            <span className="col-span-2 place-content-center hidden sm:block">
                                                {
                                                   commonType.setDate(new Date(value.date))
                                                }
                                            </span>
                                            <span className="sm:col-span-1 col-span-5 ml-auto text-right place-content-center">
                                                <div className={"font-bold text-sm"}>{
                                                    Math.sign(value.amount) < 1 
                                                        ? <span className="">{ "-$"+Math.abs(value.amount) }</span>
                                                        : <span className="text-green-700"> {"+$"+value.amount} </span>
                                                }</div>
                                                <span className="col-span-2 place-content-center text-gray-400 sm:hidden">
                                                    {
                                                        commonType.setDate(new Date(value.date))
                                                    }
                                                </span>
                                            </span>
                                        </li>
                                    ))                                
                                }
                            </ul>
                        </div>
                        <div className="grid grid-cols-6">
                            <div className="col-span-1">
                                <button type="button" disabled={pageNum==1} className="button px-5 py-1 rounded-sm border-1 cursor-pointer hover:bg-black hover:text-white hover:opacity-50" onClick={()=>setPage(pageNum-1)}>
                                    <span className="hidden sm:block">❰Prev</span>
                                    <span className="sm:hidden">❰</span>
                                </button>
                            </div>
                            <div className="col-span-4 place-content-center m-auto">
                                {
                                    totalCounts.map((value:any)=> (        
                                        <button key={value} onClick={()=>setPage(value)} type="button" 
                                                className={`hover:bg-black hover:text-white hover:opacity-50 cursor-pointer w-8 h-8 rounded-sm border-1 mx-1 ${pageNum == value ? "bg-black text-white":""}`}>
                                                {value}
                                        </button>))
                                }
                            </div>
                            <div className="col-span-1 ml-auto">
                                <button type="button" disabled={pageNum==totalCounts.length} className="button px-5 py-1 rounded-sm border-1 cursor-pointer hover:bg-black hover:text-white hover:opacity-50" onClick={()=>setPage(pageNum+1)}> 
                                    <span className="hidden sm:block">Next❱</span>
                                    <span className="sm:hidden">❱</span>
                                </button>
                            </div>
                            </div>
                                {/* <Button type='page' name='Prev'  disabled={pageNum==1}   handler={() =>setPage(pageNum-1)} ></Button>
                            <div className="col-span-8 place-content-center m-auto">
                                {
                                    Array.from({length: totalCounts}, (_,i)=>i+1).map((value:number)=> (        
                                         <Button type='page' key={value} name={value} handler={()=>setPage(value)} ></Button>
                                       ))
                                }
                            </div>
                            <div className="col-span-1 ml-auto">
                                 <Button type='page' name='Next'  disabled={pageNum==totalCounts}  handler={()=>setPage(pageNum+1)} ></Button>
                             </div> */}
                        </div>
                </Card>
            </div>
        </div>
    )
}