import { useSelector } from "react-redux";
import { Card } from "../components/Card"
import { rootState } from "../store";
import { StringKeyObject } from "../store/type";



export const Budgets = () => {
    const budgets = useSelector((state:rootState)=> state.dataReducer.budgets);
    const transactions = useSelector((state:rootState)=>state.dataReducer.transactions);


    const categoryGroupedData = transactions.reduce((acc:StringKeyObject, value)=> {
        acc[value.category] = acc[value.category] || [];
        acc[value.category].push(value);

        return acc;
    }, {});


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
                        Object.values(categoryGroupedData).map((value)=> (
                            <Card>
                                {
                                    value.map((k,v)=> {
                                        console.log(k, v);
                                        return k[];
                                    })
                                }
                            </Card>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}