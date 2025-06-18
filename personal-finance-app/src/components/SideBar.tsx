import overview from "/images/icon-nav-overview.svg"
import transactions from "/images/icon-nav-transactions.svg"
import budgets from "/images/icon-nav-budgets.svg"
import pots from "/images/icon-nav-pots.svg"
import recurringBills from "/images/icon-nav-recurring-bills.svg"
import logoL from "/images/logo-large.svg";

export const SideBar = () => {
    const menu = [
        {icon: overview, name: "OverView"},
        {icon: transactions, name: "Transactions"},
        {icon: budgets, name: "Budgets"},
        {icon: pots, name: "Pots"},
        {icon: recurringBills, name: "Recurring Bills"}
    ];

    return (
        <aside className="bg-black md:min-w-[10vw] text-white rounded-xl">
            <img src={logoL}/>
            {
                menu.map((value, _index)=> (
                    <div key={_index}>
                        <a href={"/"+value.name.toString().toLowerCase().replace(" ", "-")}> 
                            <figure>
                                <img src={value.icon}/>
                            </figure>
                            {value.name}
                        </a>
                    </div>
                ))
            }
        
        </aside>
    )
};