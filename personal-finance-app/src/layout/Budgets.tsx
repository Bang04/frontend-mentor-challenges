import { useSelector } from "react-redux";
import { Card } from "../components/Card"
import { rootState } from "../store";
import { StringKeyObject } from "../store/type";
import { Bar } from "../components/Bar";
import { Circular } from "../components/Donut";
import { DonutChart } from "../components/DonutChart";


// 사용 예시
const sampleData = [
    { value: 40, color: "tomato" },
    { value: 6, color: "orange" },
    { value: 11, color: "mediumseagreen" },
    { value: 43, color: "royalblue" },
  ];

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
    //1. get redux data
    const budgets = useSelector((state:rootState)=> state.dataReducer.budgets);
    const transactions = useSelector((state:rootState)=>state.dataReducer.transactions);

    //2. budgets category name
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


    const info = latest.reduce((p:{ total: number, data: {value: number, color: string}[]}, n)=> {
            return {
                total: p.total + n.info[0].maximum,
                data:[   
                    ...p.data,
                    {
                        value: n.latestSpent,
                        color: n.info[0].theme
                    }
                ]
            };
    }, {total: 0, data: []});


    return (
        <div className="bg-[#F8F4F0] w-screen">
            <div className="flex justify-between m-10">
                <div className="font-semibold text-xl">Budgets</div>
                <button className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    + Add New Budgets</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mx-10 my-10">
                <div className="col-span-2">
                    <div className="p-3">
                        <Card link="">
                            <div className="">
                                <div>
                                    <Circular info={info}></Circular>
                                    {/* <DonutChart data={sampleData} /> */}
                                </div>
                                <div className="font-bold">
                                    Spending Summary
                                </div> 
                                <div>
                                {
                                    budgets.map((value,index)=> (
                                        <div key={index} className={"flex justify-between flex-row m-3 border-l-3"} style={{"borderLeftColor":`${value.theme}`}}>
                                            <span className="text-xs">{value.category}</span>
                                            <span className="text-xs font-[#cccccc]"> of ${value.maximum}</span>
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
                                    <div className="flex flex-col divide-y-3 p-3">
                                        <Card>
                                            <div className="font-bold text-xl">{value?.info[0].category}</div>
                                            <div className="text-xs my-3">
                                                Maxinum of {value?.info[0].maximum}
                                            </div>
                                            <div>
                                                <Bar total={value?.info[0].maximum} spent={value?.latestSpent} color={value?.info[0].theme}></Bar>
                                            </div>
                                            <div className="grid grid-cols-2 text-xs">
                                                <div className="col-span-1">
                                                    Spent {value?.latestSpent}
                                                </div>
                                                <div className="col-span-1">
                                                    Remaining {
                                                        Math.sign(value?.remaining) < 0 ? 0 : value?.remaining
                                                    }
                                                </div>
                                            </div>
                                            <div className="">
                                                <Card title="Latest Spending" link="See All" backColor="#F8F4F0">
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
        </div>
    )
}