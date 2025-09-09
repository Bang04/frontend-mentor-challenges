import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card } from "../../components/card"
import { modalType } from "../../components/modal";
import { Pot } from "../../store/slices/types";
import { useToast } from "../../hooks/useToast";
import dots from "/images/dots-three-thin.svg";
import { selectByPath } from "../../store/selectors/postSelector";
import { PotsModal } from "./PotsModal";


const Pots = () => {
    //let pots: Pot[] = useSelector((state: RootState) => state.postReducer.data.pots);
    const pots: Pot[] = useSelector(selectByPath("pots"));
    
    const [data, setData] = useState<Pot[]>();
    const [isOpen, setIsOpen] = useState(false);
    const showToast = useToast();
    const [modalType, setModalType] = useState<modalType>();
    const [selectedData, setSelectedData] = useState({});

    useEffect(() => {
        setData(pots);

    }, [data, isOpen]);

    const closeModal = () => {
        setIsOpen(false);
    }

    //Toast 호출
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

    //NewAdd, Edit Add, 4.Edit Withdraw
    const handleEditOpen = (type: modalType, value?: any) => {
        setSelectedData(value);
        setModalType(type);
        setIsOpen(true); // modal open 여부
    }


    return (
        <div className="flex flex-col w-[100%] p-10 my-auto">
            <div className="flex flex-row flex-nowrap justify-between items-center  min-w-xs mb-8">
                <div className="flex mt-5 font-semibold text-4xl mb-8">Pots</div>
                <button onClick={()=>handleEditOpen("add")} className="text-sm text-white  bg-black font-semibold py-4 px-4 rounded-lg cursor-pointer">+Add New Pot</button>
            </div>    

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {
                    data && data.length > 0 ? (
                        data?.map((value: any, index) => {
                            const target = value.target? value.target : 0;
                             const total = value.total? value.total : 0;

                            return(
                                      <div key={index} className="flex w-full md:w-100">
                                <input type="hidden" name="id" value={value.id} />
                                <Card link="">
                                    <div className="flex justify-between mb-6">
                                        <div className="flex flex-row values-center">
                                            <div className={`w-3 h-3 rounded-full `} style={{ backgroundColor: value.theme }}></div>
                                            <span className="font-semibold pl-3">{value.name}</span>
                                        </div>

                                        <div className="w-10 cursor-pointer" onClick={(e) => handlerToast(e, value, handleEditOpen)} ><img src={dots} alt="" /></div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-4">
                                            <span className="text-gray-500">Total Saved</span> 
                                            <span className="text-3xl font-semibold">${total}</span> 
                                        </div>
                                        <div className="mb-4">
                                            <div className="w-full h-3 bg-gray-100 overflow-hidden">
                                                <div className={`h-3`} style={{
                                                    width: `${(total / target) * 100}%`,
                                                    backgroundColor: value.theme
                                                }}>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between mb-6">
                                            <span className="text-gray-500">{((total / target) * 100).toFixed(2)}%</span>
                                            <span className="text-gray-500">Target of ${target}</span>
                                        </div>
                                        <div className="flex gap-[10px] justify-between  mb-3">
                                            <button onClick={() => handleEditOpen("deposit", value)} className="p-3 text-sm bg-[#F8F4F0] font-semibold flex-1 rounded-lg cursor-pointer ">+Add Money</button>
                                            <button onClick={() => handleEditOpen("withdraw",value)} className="p-3 text-sm bg-[#F8F4F0] font-semibold flex-1 rounded-l cursor-pointer">Withdraw</button>
                                        </div>
                                    </div>
                                </Card>
                            </div>
 
                            )
                        })
                    ) : (
                        <div>No results found</div>
                    )
                }
            </div>

            {(() => {
                if (!isOpen) return null;
                switch (modalType) {
                    case "add":
                        return <PotsModal isOpen={isOpen} closeModal={closeModal} type={modalType} ></PotsModal>
                    case "edit":
                    case "remove":
                    case "deposit":
                    case "withdraw":
                        return <PotsModal isOpen={isOpen} closeModal={closeModal} type={modalType} prop={selectedData}></PotsModal>
                    default:
                        return null;
                }
            })()}
        </div>
    );
};

export default Pots;