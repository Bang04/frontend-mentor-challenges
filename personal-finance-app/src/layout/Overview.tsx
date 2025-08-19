import { Card } from "../components/card";
import pot from "/images/icon-pot.svg";
import { Donut } from "../components/donut";
import { useAppDispatch, useAppSelector } from "../store";
import { recurringBillsValue } from "../store/selectors/recurringBillsSelector";
import { Key, useEffect } from "react";
import { subscribe, unSubscribe } from "../store/firebase/subscribe";
import { useSelector } from "react-redux";
import { selectAll } from "../store/selectors/postSelector";

export const OverView = () => {

        const dispatch = useAppDispatch();
        const data = useSelector(selectAll());  

        //const sPath = useMemo(()=> "data", ["data"]);

        useEffect(()=> {
            dispatch(subscribe("transactions"));
            dispatch(subscribe("budgets"));
            dispatch(subscribe("balance"));
            dispatch(subscribe("pots"));
            
            return () => { 
                dispatch(unSubscribe("transactions"));
                dispatch(unSubscribe("budgets"));
                dispatch(unSubscribe("balance"));
                dispatch(unSubscribe("pots"));

            }
        }, [dispatch]);
        
        
        const balance_txt = ["Current Balance", "Income", "Expenses"];
        const bills_data = useAppSelector(recurringBillsValue);   
                        
        const _pots = () => {
            const total = data.pots.reduce((prev:number, next:{total: number})=> {
                return prev += next.total
            }, 0);

            return (
                <Card title="Pots" link="See details">
                    {/* <div className="grid md:grid-cols-3">
                        <div className="md:col-span-2 xs:row-span-2">
                            <img src={pot}/>
                            <div className="">Total Saved</div>
                            <div className="">
                                { total }
                            </div>
                        </div>                        
                    </div> */}
                    <div className="flex justify-between gap-10 m-5">
                        <div className="flex justify-evenly bg-[#F8F4F0] w-[20vw] rounded-2xl">
                            <div className="my-auto mx-5">
                                <img src={pot}></img>
                            </div>
                            <div className="m-auto">
                                <div className="row-span-1 text-sm mt-auto mb-2">Total Saved</div>
                                <div className="row-span-1 text-4xl mb-auto">
                                    {"$"+ total }
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:w-[20vw]">
                            {
                                data?.pots?.map((value: any,index: Key | null | undefined)=> (
                                    <div key={index} className={`flex flex-col m-2 border-l-3`} style={{"borderLeftColor":`${value.theme}`}}>
                                        <span className="text-xs ml-2">{value.name}</span>
                                        <span className="ml-2">${value.total}</span>
                                    </div>
                                ))
                            }
                        </div>
                </div>
                </Card>
            );
    }

    const _transactions = () => {
        return (
            <Card title="Transactions" link="View All">
                <ul>
                {
                    data?.transactions?.slice(0,5).map((value: any,_index: any | null | undefined)=> (
                            <li key={_index} className="border-b-1 border-[#B3B3B3] my-9">
                                <div className="flex justify-between text-xs">
                                    <div className="flex">
                                        <figure className="h-8 w-8 m-2">
                                            <img src={value.avatar} className="rounded-full" />
                                        </figure>
                                        <div className="font-bold m-auto">
                                            {value.name}
                                        </div>
                                    </div>
                                    <div className="flex flex-col"> 
                                        <div className="font-bold text-right">
                                            {
                                                Math.sign(value.amount) < 1 
                                                    ? <span className="">{ "-$"+Math.abs(value.amount) }</span>
                                                    : <span className="text-green-700"> {"+$"+value.amount} </span>
                                            }
                                        </div>
                                        <div className="my-1 text-gray-400">
                                            {
                                                new Date(value.date)
                                                    .toLocaleString("en-GB", 
                                                    {day:"numeric", month:"short", year:"numeric"})
                                            
                                            }
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))                                
                    }
                </ul>
            </Card>
        )
    }

    const _budgets = () => {
        return (
            <Card title="Budgets" link="See Details">
            <div className="grid md:grid-cols-3 justify-center">
                <div className="md:col-span-2 xs:row-span-2">
                    <Donut></Donut>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-1 sm:grid-cols-1 gap-4">
                    {
                        data?.budgets?.map((value: any,index: number)=> (
                            <div key={index} className={"m-3 px-3 border-l-3"} style={{"borderLeftColor":`${value.theme}`}}>
                                <div className="text-xs">{value.category}</div>
                                <div className="font-bold">${value.maximum}</div>
                            </div>
                        ))
                    }     
                </div>
            </div>
        </Card>
        )
    }

    const _recurringBills = () => {
        return (
            <Card title="Recurring Biils" link="See Details">
                <ul>
                    {
                        bills_data?.items.map((value, index)=> (
                            <li className="my-5" key={index}>
                                <div className="border-l-3  rounded" style={{"borderLeftColor":`${value.theme}`}}>
                                    <Card backColor="#F8F4F0" padding={20} link={""}>
                                        <div className="flex items-center justify-between">
                                            <span>{value.name}</span>
                                            <span>${value.money}</span>
                                        </div>
                                    </Card>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </Card>
        )
    }

        return (
            <div className="grid w-screen lg:w-auto p-5">
                <div className="m-5 pt-5 font-bold text-3xl">OverView</div>
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {
                            data?.balance != undefined ?
                                balance_txt.map((value: any, index: number)=> (
                                    <div className="m-5"> 
                                        <Card key={index} link="" backColor={index == 0 ? "black" : "white"} fontColor={index == 0 ? "white" : "black"}>
                                            <div >
                                                <div className="text-xs mb-5">{value}</div>
                                                <div className="text-4xl font-bold w-[100%]">${data?.balance.current}</div>
                                            </div>
                                        </Card>
                                    </div>
                                )) :
                            <div>로딩중...</div>
                    } 
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-9 md:grid-cols-5">
                    <div className="lg:col-span-5 md:col-span-5">
                        <div className="m-5">
                            {
                                data?.pots != undefined ?
                                    _pots()
                                    :
                                    <div>로딩중...</div>
                            }
                        </div>
                        <div className="m-5 ">
                            {
                                data?.transactions != undefined ?
                                    _transactions()
                                    :
                                    <div>로딩중...</div>
                            }
                        </div>
                    </div>
                    <div className="lg:col-span-4 md:col-span-5">
                        <div className="m-5">
                            {
                                data?.budgets != undefined || data?.transactions != undefined ?
                                _budgets() 
                                : 
                                <div>로딩중...</div>
                            }
                        </div>
                        <div className="m-5">
                            {
                                data?.transactions != undefined ?
                                _recurringBills()
                                :
                                <div>로딩중...</div>
                            }
                        </div>
                    </div>
                </div>
            </div>            
        )

 };