import { useSelector } from "react-redux";
import { Card } from "../components/card";
import { rootState } from "../store";
import pot from "/images/icon-pot.svg";

export const OverView = () => {
    const _data = useSelector((state:rootState)=> state.dataReducer);
  
    const balance = Object.values(_data.balance);
    const pots = _data.pots.slice(0, 4);
    const transactions = _data.transactions.slice(0,5);
    const budgets = _data.budgets.slice(0, 4);
    const bills = _data.transactions.filter((value)=>value.recurring);


const _pots = () => {
    return (
        <Card title="Pots" link="See details">
            <div className="flex justify-between">
                    <div className="grid grid-cols-2 bg-[#F8F4F0] w-[25vw]">
                        <div className="col-span-1 m-auto">
                            <img src={pot}></img>
                        </div>
                        <div className="col-span-1 grid grid-rows-2">
                            <div className="row-span-1 my-auto text-xs">Total Saved</div>
                            <div className="row-span-1 my-auto text-4xl pb-5">{"$"+
                                pots.reduce((prev,next)=> {
                                    return prev += next.total
                                }, 0)}
                            </div>
                        </div>
                    </div>
                <div className="grid grid-cols-2 md:w-[20vw]">
                    {
                        pots.map((value,index)=> (
                            <div key={index} className={`flex flex-col m-2 border-l-3`} style={{"borderLeftColor":`${value.theme}`}}>
                                <span className="text-xs ml-2">{value.name}</span>
                                <span className="ml-2">${value.total}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Card>
    )
}

const _transactions = () => {
    return (
        <Card title="Transactions" link="View All">
            <ul>
            {
                transactions.map((value,_index)=> (
                        <li key={_index} className="border-b-1 border-[#B3B3B3] my-5">
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
                                    <div>{value.amount}</div>
                                    <div>
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
        <div className="flex">
            <div className="w-[70%]">

            </div>
            <div className="">
                {
                    budgets.map((value,index)=> (
                        <div key={index} className={"flex flex-col m-3 border-l-3"}
                        style={{"borderLeftColor":`${value.theme}`}}>
                            <span className="text-xs">{value.category}</span>
                            <span className="">${value.maximum}</span>
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
    )
}

    return (
        <div className="min-w-[90vw]">
            <div className="mx-5 mt-5 font-bold text-2xl">OverView</div>
            <div className="grid md:grid-cols-3">
                    {
                        balance.map((value:number, index:number)=> (
                            <div className="m-5">
                                <Card key={index} link="">
                                    <div className="">
                                        <div className="text-xs mb-5">Current Balance</div>
                                        <div className="text-4xl font-bold w-[100%]">${value}</div>
                                    </div>
                                </Card>
                            </div>
                        ))
                    }
            </div>
            <div className="flex grid grid-cols-5">
                <div className="col-span-3">
                    <div className="ml-5 mt-5">
                        {_pots()}
                    </div>
                    <div className="ml-5 mt-5">
                        {_transactions()}
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="mt-5 mx-5">
                        {_budgets()}
                    </div>
                    <div className="mt-5 mx-5">
                        {_recurringBills()}
                    </div>
                </div>
            </div>
          
        </div>
    )








};