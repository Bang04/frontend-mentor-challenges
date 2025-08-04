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
        <aside className="bg-black flex flex-col h-screen text-white rounded-r-3xl p-1" style={{width: minimize ? "5rem" : "16rem"}}>
            <div className="mx-2 py-10 pl-4">
                <img src={minimize ? logoS : logoL} />
            </div>
            {
                menu.map((value, _index)=> (
                     <Link to={"/"+value.name.toString().toLowerCase().replace(" ", "-")}>
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
    )
};