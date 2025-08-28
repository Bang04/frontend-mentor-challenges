import { Card } from "../components/card";
import { Loading } from "../components/Loading";
import pot from "/images/icon-pot.svg";
import { Donut } from "../components/donut";
import { useAppDispatch, useAppSelector } from "../store";
import { recurringBillsValue } from "../store/selectors/recurringBillsSelector";
import { Key, useEffect } from "react";
import { subscribe, unSubscribe } from "../store/firebase/subscribe";
import { useSelector } from "react-redux";
import { selectAll } from "../store/selectors/postSelector";
import { BALANCE } from "../constants/balance";

const OverView = () => {

    const dispatch = useAppDispatch();
    const data = useSelector(selectAll());

    useEffect(() => {
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


    const bills_data = useAppSelector(recurringBillsValue);

    console.log(data);

    const _pots = () => {
        const total = data.pots.reduce((prev: number, next: { total: number }) => {
            return prev += next.total
        }, 0);

        return (
            <Card title="Pots" link="See details">
                <div className="flex justify-between gap-10 m-5">
                    <div className="flex bg-[#F8F4F0] w-[40vw] rounded-2xl">
                        <div className="my-auto ml-10">
                            <img src={pot} className="w-10"></img>
                        </div>
                        <div className="m-auto">
                            <div className="text-sm mb-2 text-gray-500">Total Saved</div>
                            <div className="text-4xl mb-2 font-bold">
                                {"$" + total}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:w-[20vw]">
                        {
                            data?.pots?.map((value: any, index: Key | null | undefined) => (
                                <div key={index} className={`flex flex-col m-2 border-l-3`} style={{ "borderLeftColor": `${value.theme}` }}>
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
                        data?.transactions?.slice(0, 5).map((value: any, _index: any | null | undefined) => (
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
                                                    ? <span className="">{"-$" + Math.abs(value.amount)}</span>
                                                    : <span className="text-green-700"> {"+$" + value.amount} </span>
                                            }
                                        </div>
                                        <div className="my-1 text-gray-400">
                                            {
                                                new Date(value.date)
                                                    .toLocaleString("en-GB",
                                                        { day: "numeric", month: "short", year: "numeric" })

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
                            data?.budgets?.map((value: any, index: number) => (
                                <div key={index} className={"m-3 px-3 border-l-3"} style={{ "borderLeftColor": `${value.theme}` }}>
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
                        bills_data?.items.map((value, index) => (
                            <li className="my-5" key={index}>
                                <div className="border-l-3  rounded" style={{ "borderLeftColor": `${value.theme}` }}>
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

    const isLoading = [data?.pots, data?.transactions, data?.budgets].some((d) => d == undefined);


    return (
        isLoading ?
            <Loading />
            :
            <div className="grid w-screen lg:w-auto p-5">
                <div className="m-5 pt-5 font-bold text-3xl">OverView</div>
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {
                        BALANCE.map((obj, index) => (
                            <div className="m-5">
                                <Card key={index} link="" backColor={index == 0 ? "black" : "white"} fontColor={index == 0 ? "white" : "black"}>
                                    <div >
                                        <div className="text-xs mb-5">{obj.value}</div>
                                        <div className="text-4xl font-bold w-[100%]">${data?.balance?.[obj.key]}</div>
                                    </div>
                                </Card>
                            </div>
                        ))
                    }
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-9 md:grid-cols-5">
                    <div className="lg:col-span-5 md:col-span-5">
                        <div className="m-5">
                            {
                                _pots()
                            }
                        </div>
                        <div className="m-5 ">
                            {
                                _transactions()
                            }
                        </div>
                    </div>
                    <div className="lg:col-span-4 md:col-span-5">
                        <div className="m-5">
                            {
                                _budgets()
                            }
                        </div>
                        <div className="m-5">
                            {
                                _budgets()
                            }
                        </div>
                    </div>
                </div>
            </div>
    )

};

export default OverView;