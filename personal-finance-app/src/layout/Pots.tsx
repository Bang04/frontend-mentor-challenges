import React, { useState } from "react";


import { useSelector } from "react-redux";
import { rootState } from "../store"

import { Card } from "../components/Card"
import { PotAddModal } from "../components/modal/PotAddModal";
import { PotEditModal } from "../components/modal/PotEditModal";
import { PotDeleteModal } from "../components/modal/PotDeleteModal";
import { PotDropModal } from "../components/modal/PotDropModal";
import { PotAmountModal } from "../components/modal/PotAmountModal";

import dots from "/images/dots-three-thin.svg";

export const Pots = () => {
    const pots = useSelector((state:rootState)=> state.potReducer);
    
    const [ isOpen, setIsOpen ] = useState(false);
    const [ id , setId ] = useState<string>();
    const [ modalType , setModalType ] = useState("");
    const [ modalPosition, setModalPosition ] = useState({top: 0, left:0});

    const closeModal = () =>{
        setIsOpen(false);
    }
    // 1.NewAdd,
    const handleInsertModal = (type:string, e: React.MouseEvent<HTMLElement>) => {  
        setIsOpen(true); // modal open 여부
        setModalType(type); // modal 타입
   
    }
    //2.DropMenu 
    const handleDropModal = (type:string, e: React.MouseEvent<HTMLElement>,id : string) => {
        const rect = (e.currentTarget).getBoundingClientRect(); // 클릭된 position 값 얻기
        const X_OFFSET = 100; //100px 만큼 이동
        setId(id);
        setIsOpen(true); // modal open 여부
        setModalType(type); // modal 타입(수정,삭제,드롭메뉴 등등)
        setModalPosition({ 
            top: rect.bottom + window.scrollY, // 버튼의 아래쪽 + 스크롤 보정
            left: rect.left + window.scrollX - X_OFFSET  // 버튼의 왼쪽});
        });
   
    }

    //3.NewAdd, Edit Add, 4.Edit Withdraw
    const handleEditOpen = (type:string, id : string) => {
        setIsOpen(true); // modal open 여부
        setModalType(type); // modal 타입(수정,삭제,드롭메뉴 등등)
        setId(id);//선택된 id
    }

    return (
        <div className="flex flex-col p-8 mx-auto my-auto">
             <div className="flex flex-row flex-nowrap justify-between mb-8">
                 <div className="flex mt-5 font-semibold text-4xl mb-8">Pots</div>
                
                 <button onClick={(e) => handleInsertModal("insert", e)}  className="text-sm text-white  bg-black font-semibold py-4 px-4 rounded-lg">+Add New Pot</button>
            </div>

            <div className="flex flex-wrap md:flex-row">
                {
                    pots.length > 0 ? (
                    pots.map((item, index) => (
                    
                        <div key={index} className="flex w-full  md:w-1/2 ">
                            <input type="hidden" name="id" value={item.id} />
                            <Card  title="" link="">
                                <div className="flex justify-between">
                                    
                                    <div className="flex flex-row items-center">
                                        <div className={`w-3 h-3 rounded-full `} style={{ backgroundColor: item.theme }}></div>
                                        <span className="">{item.name}</span>
                                    </div>
                                    <div className="w-10" onClick={(e) => handleDropModal("drop", e,item.id)} ><img src={dots} alt="" /></div>
                                </div>
                                <div>
                                    <div className="flex justify-between"> 
                                        <span className="text-gray-500">Total Saved</span>
                                        <span>${item.total}</span>
                                    </div>
                                    <div>
                                        <div className="w-full h-3 bg-gray-100">
                                            <div  className={`h-3 `} style={{ 
                                                  width: `${(item.total / item.target) * 100}%`,
                                                  backgroundColor: item.theme }}></div>
                                        </div>
                                    </div>
                                    <div  className="flex justify-between">
                                        <span className="text-gray-500">{((item.total / item.target) * 100).toFixed(2)}%</span>
                                        <span className="text-gray-500">Target of ${item.target}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <button onClick={() => handleEditOpen("add", item.id)}  className="text-sm bg-gray-100 font-semibold hover:bg-white w-full max-w-9/10 rounded-lg">+Add Money</button>
                                        <button onClick={() => handleEditOpen("withdraw", item.id)} className="text-sm bg-gray-100 font-semibold hover:bg-white w-full  max-w-9/10 py-3 rounded-lg">Withdraw</button>
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
                    case "drop":
                        return <PotDropModal closeModal={closeModal}  position={modalPosition} handleEditOpen={handleEditOpen}  id={id}/>;
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