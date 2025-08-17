import logoL from "/images/logo-large.svg";
import logoS from "/images/logo-small.svg";

import { Link } from "react-router"


import Overview from "../assets/icon/icon-nav-overview.svg?react"
import Transaction from "../assets/icon/icon-nav-transactions.svg?react"
import Budgets from "../assets/icon/icon-nav-budgets.svg?react"
import Pots from "../assets/icon/icon-nav-pots.svg?react"
import RecurringBills from "../assets/icon/icon-nav-recurring-bills.svg?react"
import MinimizeMenu from "../assets/icon/icon-minimize-menu.svg?react"
import { useState } from "react";



export const SideBar = () => {
    const menu = [
        {icon: Overview, name: "OverView"},
        {icon: Transaction, name: "Transactions"},
        {icon: Budgets, name: "Budgets"},
        {icon: Pots, name: "Pots"},
        {icon: RecurringBills, name: "Recurring Bills"}
    ];

    const [minimize, setMinimize] = useState(false);

    const onMinimizeMenu = () => {
        setMinimize(!minimize);
    };

    return (
        <div className="fixed">
            <div className="hidden lg:block">
                <aside className="bg-black flex flex-col h-screen text-white rounded-r-3xl p-1" style={{width: minimize ? "5rem" : "16rem"}}>
                    <div className="mx-2 py-10 pl-4">
                        <img src={minimize ? logoS : logoL} />
                    </div>
                    {
                        menu.map((value, index)=> (
                            <Link key={index} to={"/"+value.name.toString().toLowerCase().replace(" ", "-")}>
                                <div className="group flex gap-3 py-5 px-6 text-gray-400 hover:bg-white hover:text-black font-bold" >
                                    <value.icon className="fill-gray-400 group-hover:fill-[#277C78]"></value.icon>
                                    <div style={{"display": minimize ? "none" : "block"}}>
                                    {value.name}
                                    </div>
                                </div>
                            </Link>

                        ))
                    }
                    <div className="flex mt-auto gap-3 px-6 font-bold my-3 text-gray-400 cursor-pointer" onClick={()=> onMinimizeMenu()}>
                        <MinimizeMenu style={{"scale": minimize ? -1 : 1}}></MinimizeMenu>
                        <div style={{"display": minimize ? "none" : "block"}}>Minimize Menu</div>
                    </div>
                </aside>
            </div>
            <div className="lg:hidden flex h-screen">
                <div className="mt-auto bg-black rounded-r-xs w-screen flex items-center justify-center">
                    {
                        menu.map((value, index)=> (
                            <Link key={index} to={"/"+value.name.toString().toLowerCase().replace(" ", "-")}>
                                <div className="group px-5 py-2 gap-1 text-gray-400 hover:bg-white hover:rounded-t-xl hover:text-black font-bold text-xs flex flex-col" >
                                    <value.icon className="fill-gray-400 group-hover:fill-[#277C78] m-auto"></value.icon>
                                    <div className="hidden sm:block">
                                        {value.name}
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div> 
        </div>
    )
};