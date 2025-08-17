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
import { filteredByCategory, filteredByKeyword, setData, sortByOptions } from "../store/slices/filterSlice";
import { Paging } from "../components/paging";
import { Modal } from "../components/modal";

export const Transactions = () => {
    //나중에 서버에 청구할 데이터
    const data = useSelector((state:RootState)=> state.postReducer.data.transactions);
    const filteredData = useSelector((state:RootState)=>state.filterReducer.filteredData);
    
    const [category, setCategory] = useState<string>("");
    const [keyword, setKeyword] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("");

    //mobile version of dropdown
    const [type, setType] = useState("");

    const closeModal = () => {
        setType("");
    }

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
            <div className="lg:w-[69rem] sm:w-screen m-10">
                <div className="font-semibold text-4xl my-5">Transactions</div>
                <Card title="" link="">
                        <div className="flex justify-between">
                            <div className="relative">
                                <input type="text" onChange={(e:ChangeEvent<HTMLInputElement>)=> setKeyword(e.target.value)} className="rounded-md py-2 sm:px-10 border-1 placeholder:text-gray border-gray-400 overflow-hidden text-sm" placeholder={"Search transaction"}>
                                </input>
                                <img src={search} className="absolute top-[30%] right-[10%] bg-white"></img>
                            </div>
                            <div className="hidden sm:block">
                                <div className="flex">
                                    <div className="flex items-center gap-1 px-3">
                                        <div className="text-sm text-gray-500 whitespace-nowrap">Sort by</div>
                                        <Dropdown onDropdownChanged={setSortBy} options={SORT_TEXT} props="w-full px-3 py-2" ></Dropdown>
                                     </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm text-gray-500 w-25">Category</span>
                                        <Dropdown onDropdownChanged={(value:string)=>setCategory(value)} options={CATEGORIES} props="w-full px-3 py-2"></Dropdown>
                                    </div>
                                </div>

                            </div>
                            <div className="sm:hidden flex gap-3 items-center z-10">
                                <div>
                                    <img src={sortIcon} className="w-5 cursor-pointer" onClick={()=>setType("sort")}/>
                                </div>
                                <div>
                                    <img src={filterIcon} className="w-5 cursor-pointer z-10" onClick={()=>setType("category")}/>
                                </div>
                                <Modal isOpen={type === "sort"} type={"none"} closeModal={closeModal}>
                                    <Dropdown showOnlyOptions={true}  onDropdownChanged={(value)=>{
                                        setSortBy(value);
                                        closeModal();
                                    }} options={SORT_TEXT} props="w-full px-3 py-2" ></Dropdown>
                                </Modal>
                                <Modal isOpen={type === "category"} type={"none"} closeModal={closeModal}>
                                    <Dropdown showOnlyOptions={true} onDropdownChanged={(value:string)=>{
                                        setCategory(value);
                                        closeModal();
                                    }} options={CATEGORIES} props="w-full px-3 py-2"></Dropdown>
                                </Modal>
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
                        <Paging current={pageNum} total={totalCounts} setPage={setPage}></Paging>
                </Card>
            </div>
        </div>
    )
}