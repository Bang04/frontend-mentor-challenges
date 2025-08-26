import { useSelector } from "react-redux";
import { Card } from "../../components/card"
import { commonType } from "../../store/common";
import { useState } from "react";
import { BudgetsModal } from "./BudgetsModal";
import { Bar } from "../../components/bar";
import { modalType } from "../../components/modal";
import { selectDataByLatestDate } from "../../store/selectors/transactionSelector";
import { Donut } from "../../components/donut";
import { useToast } from "../../hooks/useToast";
import dots from "/images/dots-three-thin.svg";


const Budgets = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState<modalType>("add");
    const [selectedData, setSelectedData] = useState({});
    const showToast = useToast();

    const handleEditOpen = (type: modalType, value?: any) => {
        setSelectedData(value);
        setModalType(type);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    }

    const handlerToast = (e: React.MouseEvent<HTMLElement>, itemId: number, handleEditOpen: any) => {
        const rect = (e.currentTarget).getBoundingClientRect();
        const X_OFFSET = 100; //100px 만큼 이동

        showToast.addToast({
            id: Date.now(),
            itemId: itemId,
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX - X_OFFSET,
            handleEditOpen
        });
    }

    const data = useSelector(selectDataByLatestDate);

    return (
        <div className="bg-[#F8F4F0]">
            <div className="flex justify-between m-10">
                <div className="font-semibold text-4xl">Budgets</div>
                <button className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-10" onClick={()=>handleEditOpen("add")}>
                    + Add New Budgets
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mx-10 my-10">
                <div className="col-span-2">
                    <div className="p-3">
                        <Card link="">
                            <div className="">
                                <div>
                                    <Donut></Donut>
                                </div>
                                <div className="font-bold">
                                    Spending Summary
                                </div> 
                                <div>
                                {
                                    data?.map((value:any, index:number)=> (
                                        <div key={index} className={"flex justify-between flex-row m-3 border-l-3 px-3"} style={{"borderLeftColor":`${value.info.theme}`}}>
                                            <span className="text-xs py-1">{value.info.category}</span>
                                            <span className="">
                                                <span className="font-bold text-md">${value.info.spent}</span>
                                                <span className="text-xs text-gray-400"> of ${value.info.maximum}.00</span>
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

                        data?.map((value:any, index:number)=> {
                                return (
                                    <div className="flex flex-col divide-y-3 p-3" key={index}>
                                        <Card>
                                            <div className="flex flex-row items-center">
                                                <div className={`w-3 h-3 rounded-full `} style={{ backgroundColor: value?.info.theme }}></div>
                                                <span className="font-semibold pl-3">{value?.info.category}</span>
                                                <div className="text-xs ml-auto">
                                                    <div className="w-10 cursor-pointer" onClick={(e) => handlerToast(e, value, handleEditOpen)} ><img src={dots} alt="" /></div>
                                                </div>
                                            </div>
                                            <div className="text-sm text-gray-500 my-3">
                                                Maxinum of ${value?.info.maximum}.00
                                            </div>
                                            <div>
                                                <Bar total={value?.info.maximum} spent={value?.info.spent} color={value?.info.theme}></Bar>
                                            </div>
                                            <div className="grid grid-cols-2 text-xs m-4">
                                                <div className="col-span-1 border-l-3 p-2" style={{"borderLeftColor": `${value.info.theme}`}}>
                                                    <div className="text-xs text-gray-500 py-1">Spent</div>
                                                    <div className="font-bold test-sm">${value?.info.spent}.00</div>
                                                </div>
                                                <div className="col-span-1 border-l-3 p-2" style={{"borderLeftColor": "#F8F4F0"}}>
                                                    <div className="text-xs text-gray-500 py-1">Remaining</div>
                                                    <div className="font-bold text-sm">
                                                        ${
                                                            Math.sign(value?.info.remaining) < 0 ? 0 : value?.info.remaining
                                                        }.00
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="">
                                                <Card title="Latest Spending" link="See All ▸" backColor="#F8F4F0">
                                                    <div className="flex flex-col divide-y-1 divide-gray-200">
                                                    
                                                    {
                                                        value?.values.slice(0,3).map((value: any, index:number)=> {
                                                            return (
                                                                <div key={index}>
                                                                    <div className="flex justify-between text-xs py-3">
                                                                        <div className="flex">
                                                                            <figure className="h-8 w-8 m-2">
                                                                                <img src={value.avatar} className="rounded-full" />
                                                                            </figure>
                                                                            <div className="font-bold m-auto text-xs">{value?.name}</div>
                                                                        </div>
                                                                        <div className="flex flex-col justify-center">
                                                                            <div className="font-bold ml-auto">${value?.amount}</div>
                                                                            <div className="">{ commonType.setDate(new Date(value.date)) }</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
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

export default Budgets;