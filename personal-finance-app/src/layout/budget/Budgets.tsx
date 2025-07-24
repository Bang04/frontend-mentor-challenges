import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../components/card"
import { rootState } from "../../store";
import { StringKeyObject } from "../../store/type";
import { Donut } from "../../components/donut";
import { useState } from "react";
import { BudgetsModal } from "./BudgetsModal";
import { Bar } from "../../components/bar";
import { modalType } from "../../components/modal";


function entries<T extends object>(obj: T): [keyof T, T[keyof T]][] {
    return Object.entries(obj) as [keyof T, T[keyof T]][];
}

function setDate<T extends Date>  (date: T): string {
    const year = date.toLocaleDateString("en", { year: "numeric"});
    const month = date.toLocaleDateString("en", {month: "short"});
    const day = date.toLocaleDateString("en", {day: "numeric"});

    return [day, month, year].join(" ");
}

export const Budgets = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState<modalType>("ADD");
    const [selectedData, setSelectedData] = useState({});

    const handleModal = (type: modalType, value: any) => {
        setSelectedData(value);
        setModalType(type);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    }

    //1. get redux data
    const budgets = useSelector((state:rootState)=> state.budgetReducer);
    const transactions = useSelector((state:rootState)=>state.dataReducer.transactions);

    //2. budgets category name (already exist)
    const category = budgets.map((value)=>value.category);

    //3. filtering transactions of budgets category
    const budgetsCategory = transactions.filter((value)=>category.includes(value.category));
   
    //4. make groupded object data 
    const categoryGroupedData = budgetsCategory.reduce((acc:StringKeyObject, value)=> {
        acc[value.category] = acc[value.category] || [];
        acc[value.category].push(value);
        return acc;
    }, {});

    const latest = entries(categoryGroupedData).map(([key,value]:[string|number, {}[]])=> {
            const info = budgets.filter(v=>v.category==key);
            const latestSpent = value.reduce((curr:number,next:object)=> {
                curr +=  (new Date(next.date).getMonth() == 7) ?  Math.abs(next?.amount) : 0;
                return curr;
            }, 0);
            const remaining = info[0].maximum - latestSpent;

            return {
                info: info,
                latestSpent: latestSpent,
                remaining: remaining,
                values: value
            }
    });

    const info = latest.reduce((p:{ total: number, spent: number, data: {value: number, maximum: number, color: string, name: string}[]}, n)=> {
            return {
                total: p.total + n.info[0].maximum,
                spent: p.spent + n.latestSpent,
                data:[   
                    ...p.data,
                    {
                        value: n.latestSpent,
                        maximum: n.info[0].maximum,
                        color: n.info[0].theme,
                        name: n.info[0].category
                    }
                ]
            };
    }, {total: 0, spent: 0, data: []});

    const dispatch = useDispatch();

    // dispatch(test(info));

    return (
        <div className="bg-[#F8F4F0] w-screen">
            <div className="flex justify-between m-10">
                <div className="font-semibold text-xl">Budgets</div>
                <button className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>handleModal("ADD")}>
                    + Add New Budgets
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mx-10 my-10">
                <div className="col-span-2">
                    <div className="p-3">
                        <Card link="">
                            <div className="">
                                <div>
                                    <Donut info={info}></Donut>
                                </div>
                                <div className="font-bold">
                                    Spending Summary
                                </div> 
                                <div>
                                {
                                    info.data.map((info,index)=> (
                                        <div key={index} className={"flex justify-between flex-row m-3 border-l-3 px-3"} style={{"borderLeftColor":`${info.color}`}}>
                                            <span className="text-xs py-1">{info.name}</span>
                                            <span className="">
                                                <span className="font-bold text-md">${info.value}</span>
                                                <span className="text-xs text-gray-400"> of ${info.maximum}.00</span>
                                            </span>
                                        </div>
                                    ))
                                }
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
                <div className="col-span-3">
                    {

                        latest.map((value, index)=> {
                                return (
                                    <div className="flex flex-col divide-y-3 p-3" key={index}>
                                        {/* FIXME */}
                                        <Card link={0}>
                                            <div className="text-xs text-right">
                                                <div className="" onClick={()=> handleModal("EDIT", value)}>임시 EDIT</div>
                                                <div className="" onClick={()=> handleModal("REMOVE", value)}>임시 DELETE</div>
                                            </div>

                                            <div className="flex flex-row items-center">
                                                <div className={`w-3 h-3 rounded-full `} style={{ backgroundColor: value?.info[0].theme }}></div>
                                                <span className="font-semibold pl-3">{value?.info[0].category}</span>
                                            </div>
                                            <div className="text-sm text-gray-500 my-3">
                                                Maxinum of ${value?.info[0].maximum}.00
                                            </div>
                                            <div>
                                                <Bar total={value?.info[0].maximum} spent={value?.latestSpent} color={value?.info[0].theme}></Bar>
                                            </div>
                                            <div className="grid grid-cols-2 text-xs m-4">
                                                <div className="col-span-1 border-l-3 p-2" style={{"borderLeftColor": `${value.info[0].theme}`}}>
                                                    <div className="text-xs text-gray-500 py-1">Spent</div>
                                                    <div className="font-bold test-sm">${value?.latestSpent}.00</div>
                                                </div>
                                                <div className="col-span-1 border-l-3 p-2" style={{"borderLeftColor": "#F8F4F0"}}>
                                                    <div className="text-xs text-gray-500 py-1">Remaining</div>
                                                    <div className="font-bold text-sm">
                                                        ${
                                                            Math.sign(value?.remaining) < 0 ? 0 : value?.remaining
                                                        }.00
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="">
                                                <Card title="Latest Spending" link="See All ▸" backColor="#F8F4F0">
                                                    <div className="flex flex-col divide-y-1 divide-gray-200">
                                                    
                                                    {
                                                        value?.values.slice(0,3).map((value: any)=> {
                                                            return (
                                                                <>
                                                                    <div className="flex justify-between text-xs py-3">
                                                                        <div className="flex">
                                                                            <figure className="h-8 w-8 m-2">
                                                                                <img src={value.avatar} className="rounded-full" />
                                                                            </figure>
                                                                            <div className="font-bold m-auto text-xs">{value?.name}</div>
                                                                        </div>
                                                                        <div className="flex flex-col justify-center">
                                                                            <div className="font-bold ml-auto">${value?.amount}</div>
                                                                            <div className="">{ setDate(new Date(value.date)) }</div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                    </div>
                                                </Card>
                                            </div>
                                        </Card>
                                    </div>
                                )
                            }
                        )
                    }
                </div>
            </div>

            <BudgetsModal isOpen={isOpen} closeModal={closeModal} type={modalType} prop={selectedData}></BudgetsModal>
        </div>
    )
}