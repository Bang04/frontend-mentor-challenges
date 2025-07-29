import React, { useContext, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Card } from "../../components/card"
import { PotAddModal } from "./modal/PotAddModal";
import { PotEditModal } from "./modal/PotEditModal";
import { PotDeleteModal } from "./modal/PotDeleteModal";
import { PotAmountModal } from "./modal/PotAmountModal";


import dots from "/images/dots-three-thin.svg";
import { RootState } from "../../store";
import { ToastContext } from "../../components/toast/provider";
import { Pot } from "../../store/slices/types";

export const Pots = () => {
    
    const context = useContext(ToastContext);
   
    //let pots : Pot[] = useSelector((state:RootState)=> state.postReducer.pots);
    let pots : Pot[] = useSelector((state:RootState)=> state.postReducer.pots);
    const [ data , setData ] = useState<Pot[]>();
    const [ isOpen, setIsOpen ] = useState(false);
    const [ id , setId ] = useState<string>();
    const [ modalType , setModalType ] = useState("");
   

    useEffect(() =>{
        setData(pots);
    },[data,isOpen]);

    const closeModal = () =>{
        setData(pots);
        setIsOpen(false);
    }
    // 1.NewAdd,
    const handleInsertModal = (type:string) => {
        setIsOpen(true); // modal open 여부
        setModalType(type); // modal 타입
   
    }

    //Toast 호출
    const handlerToast = ( e: React.MouseEvent<HTMLElement>, itemId: number, handleEditOpen : any) =>{
        
        const rect = (e.currentTarget).getBoundingClientRect(); 
        const X_OFFSET = 100; //100px 만큼 이동
        
        context.handlerAddToast({
          id : Date.now(), 
          itemId: itemId, 
          top: rect.bottom + window.scrollY, 
          left: rect.left + window.scrollX - X_OFFSET, 
          handleEditOpen
       } )
    }

    //3.NewAdd, Edit Add, 4.Edit Withdraw
    const handleEditOpen = (type:string, id : string) => {
        setIsOpen(true); // modal open 여부
        setModalType(type); // modal 타입(수정,삭제,드롭메뉴 등등)
        setId(id);//선택된 id
    }

    return (
        <div className="flex flex-col min-w-sm md:w-3xl lg:w-5xl mx-auto my-auto">
             <div className="flex flex-row flex-nowrap justify-between items-center  mb-8">
                 <div className="flex mt-5 font-semibold text-4xl mb-8">Pots</div>
                 <button onClick={() => handleInsertModal("insert")}  className="text-sm text-white  bg-black font-semibold py-4 px-4 rounded-lg">+Add New Pot</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {
                    data && data.length > 0 ? (
                        data.map((item, index) => (
                            <div key={index} className="flex">
                                <input type="hidden" name="id" value={item.id} />
                                <Card link="">
                                    <div className="flex justify-between mb-6">
                                        <div className="flex flex-row items-center">
                                            <div className={`w-3 h-3 rounded-full `} style={{ backgroundColor: item.theme }}></div>
                                            <span className="font-semibold pl-3">{item.name}</span>
                                        </div>
                    
                                        <div className="w-10" onClick={(e) => handlerToast(e, Number(item.id), handleEditOpen)} ><img src={dots} alt="" /></div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-4"> 
                                            <span className="text-gray-500">Total Saved</span>
                                            <span className="text-3xl font-semibold">${(item.total).toFixed(2)}</span>
                                        </div>
                                        <div className="mb-4">
                                            <div className="w-full h-3 bg-gray-100 overflow-hidden">
                                                <div  className={`h-3`} style={{ 
                                                    width: `${(item.total / item.target) * 100}%`,
                                                    backgroundColor: item.theme }}>
                                                </div>
                                            </div>
                                        </div>
                                        <div  className="flex justify-between mb-6">
                                            <span className="text-gray-500">{((item.total / item.target) * 100).toFixed(2)}%</span>
                                            <span className="text-gray-500">Target of ${item.target}</span>
                                        </div>
                                        <div className="flex gap-[10px] justify-between  mb-3">
                                            <button onClick={() => handleEditOpen("add", item.id)}      className="p-3 text-sm bg-[#F8F4F0] font-semibold flex-1 rounded-lg">+Add Money</button>
                                            <button onClick={() => handleEditOpen("withdraw", item.id)} className="p-3 text-sm bg-[#F8F4F0] font-semibold flex-1 rounded-lg">Withdraw</button>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))
                    ) : (
                    <div>No results found</div>
                    )
                }
            </div>
            
            {(() => {
                if (!isOpen) return null;
                switch (modalType) {
                    case "insert":
                        return <PotAddModal closeModal={closeModal} />;
                    case "edit":
                        return <PotEditModal closeModal={closeModal} id={id}/>;
                    case "delete":
                        return <PotDeleteModal closeModal={closeModal} handleEditOpen = {handleEditOpen} id={id} />;
                    case "add":
                        return <PotAmountModal closeModal={closeModal} modalType={modalType} id={id} />;
                    case "withdraw":
                        return <PotAmountModal closeModal={closeModal} modalType={modalType} id={id}  />;
                    default:
                        return null;
                }
            })()}
        </div>
  );
};