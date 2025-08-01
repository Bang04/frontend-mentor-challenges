import { useDispatch, useSelector } from "react-redux";
import { Card } from "../components/card"
import { ChangeEvent, useEffect, useState } from "react";
import  search  from "/images/icon-search.svg"
import { Dropdown } from "../components/dropdown";
import { CATEGORIES } from "../constants/categories";
import { SORT_TEXT } from "../constants/sort";
import { RootState } from "../store";
import { filteredByCategory, filteredByKeyword, getFilteredData, setData, sortByOptions } from "../store/slices/filterSlice";

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
    const totalCounts = Math.ceil(filteredData.length/countPerPage);

    const [pageNum, setPageNum] = useState(1);

    const setPage = (_num: number) => {
        setPageNum(_num);
    };

    return (
        <div className="bg-[#F8F4F0]">
            <div className="w-full m-10">
                <div className="font-semibold text-4xl my-5">Transactions</div>
                <Card title="" link="">
                    <div className="">
                        <div className="flex justify-between">
                            <div className="relative">
                                <input type="text" onChange={(e:ChangeEvent<HTMLInputElement>)=> setKeyword(e.target.value)} className="rounded-md py-2 px-10 border-1 placeholder:text-black border-black-300 overflow-hidden text-sm" placeholder={"Search transaction"}>
                                </input>
                                <img src={search} className="absolute top-[30%] right-[10%] bg-white"></img>
                            </div>
                            <div>
                                <span>
                                    <span className="text-sm text-gray-500">Sort by</span>
                                    <Dropdown onDropdownChanged={setSortBy} options={SORT_TEXT}></Dropdown>
                                </span>
                                <span>
                                    <span className="text-sm text-gray-500">Category</span>
                                    <Dropdown onDropdownChanged={(value:string)=>setCategory(value)} options={CATEGORIES}></Dropdown>
                                </span>
                            </div>
                        </div>
                        <div className="my-5 text-xs">
                            <ul>
                                <li className="grid grid-cols-10 border-b-1 border-[#B3B3B3] pb-5">
                                    <span className="col-span-4">Recipient / Sender</span>
                                    <span className="col-span-3">Category</span>
                                    <span className="col-span-2">Transaction Date</span>
                                    <span className="col-span-1 ml-auto">Amount</span>
                                </li>
                                {
                                    filteredData.slice(((pageNum*countPerPage)-countPerPage), pageNum*countPerPage).map((value:any,_index:any)=> (
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
                                                <div className={"font-bold text-sm"}>{
                                                    Math.sign(value.amount) < 1 
                                                        ? <span className="">{ "-$"+Math.abs(value.amount) }</span>
                                                        : <span className="text-green-700"> {"+$"+value.amount} </span>
                                                }</div>
                                            </span>
                                        </li>
                                    ))                                
                                }
                            </ul>
                        </div>
                        <div className="grid grid-cols-10">
                            <div className="col-span-1">
                                <button type="button" disabled={pageNum==1} className="button px-5 py-1 rounded-sm border-1 cursor-pointer hover:bg-black hover:text-white hover:opacity-50" onClick={()=>setPage(pageNum-1)}>Prev</button>
                            </div>
                            <div className="col-span-8 place-content-center m-auto">
                                {
                                    Array.from({length: totalCounts}, (_,i)=>i+1).map((value:number)=> (        
                                            <button key={value} onClick={()=>setPage(value)} type="button" 
                                                    className={`hover:bg-black hover:text-white hover:opacity-50 cursor-pointer w-8 h-8 rounded-sm border-1 mx-1 ${pageNum == value ? "bg-black text-white":""}`}>
                                                    {value}
                                            </button>))
                                }
                            </div>
                            <div className="col-span-1 ml-auto">
                                <button type="button" disabled={pageNum==totalCounts} className="button px-5 py-1 rounded-sm border-1 cursor-pointer hover:bg-black hover:text-white hover:opacity-50" onClick={()=>setPage(pageNum+1)}> Next</button>
                            </div>
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    )
}