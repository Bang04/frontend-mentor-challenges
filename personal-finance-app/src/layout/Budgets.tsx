import { useSelector } from "react-redux";
import { Card } from "../components/Card"
import { rootState } from "../store";
import { StringKeyObject } from "../store/type";

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
    const budgets = useSelector((state:rootState)=> state.dataReducer.budgets);
    const transactions = useSelector((state:rootState)=>state.dataReducer.transactions);

    const _budgets = budgets.map((value)=>value.category);
    const budgetsCategory = transactions.filter((value)=>_budgets.includes(value.category))
   
    const categoryGroupedData = budgetsCategory.reduce((acc:StringKeyObject, value)=> {
        acc[value.category] = acc[value.category] || [];
        acc[value.category].push(value);

        return acc;
    }, {});


    console.log(budgets);
    return (
        <div className="bg-[#F8F4F0] w-screen h-screen">
            <div className="grid grid-cols-3 gap-5 mx-10 my-10">
                <div className="col-span-1">
                    <Card link="">
                        <div className="">
                            <div className="font-bold">
                                Spending Summary
                            </div> 
                            <div>
                            {
                                budgets.map((value,index)=> (
                                    <div key={index} className={"flex flex-row m-3 border-l-3"} style={{"borderLeftColor":`${value.theme}`}}>
                                        <span className="text-xs">{value.category}</span>
                                        <span className="">${value.maximum}</span>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="col-span-2">
                    {

                        entries(categoryGroupedData).map(([key,value]:[string|number, {}[]])=> {
                            const latest = value.slice(0,3);

                            return (
                                <div className="flex flex-col divide-y-3">
                                    <Card>
                                        <div className="font-bold text-xl">{key}</div>
                                        <div className="">

                                        </div>
                                        <div className="grid grid-cols-2 text-xs">
                                            <div className="col-span-1">
                                                Spent
                                            </div>
                                            <div className="col-span-1">
                                                Remaining
                                            </div>
                                        </div>
                                        <Card title="Latest Spending" link="See All">
                                            <div className="flex flex-col divide-y-1 divide-gray-200">
                                            {
                                                latest.map((value: any)=> {
                                                    return (
                                                        <>
                                                            <div className="flex justify-between text-xs py-3">
                                                                <div className="flex ">
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
                                    </Card>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}