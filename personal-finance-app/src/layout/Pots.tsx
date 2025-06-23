import { useSelector } from "react-redux";
import { rootState } from "../store"
import { useState } from "react";

import { Card } from "../components/Card"
import { PotAddModal } from "../components/modal/PotAddModal";
import { PotDeleteModal } from "../components/modal/PotDeleteModal";
import { PotDropModal } from "../components/modal/PotDropModal";
import { PotAmountModal } from "../components/modal/PotAmountModal";
import dots from "/images/dots-three-thin.svg";

export const Pots = () => {
    const _data = useSelector((state:rootState)=> state.dataReducer);
    
    const [isOpen, setIsOpen] = useState(false);
    const [ idx , setIdx ] = useState<number>();
    const [modalType , setModalType ] = useState(""); //add | menu | del | edit
    const [ modalPosition, setModalPosition ] = useState({top: 0, left:0});
    const closeModal = () =>{
        setIsOpen(false);
    }
    // 1.NewAdd, 2.DropMenu 
    const handleOpenModal = (type:string, e: React.MouseEvent<HTMLElement>) => {
        const rect = (e.currentTarget).getBoundingClientRect(); // 클릭된 position 값 얻기
        const X_OFFSET = 100; //100px 만큼 이동

        setIsOpen(true); // modal open 여부
        setModalType(type); // modal 타입(수정,삭제,드롭메뉴 등등)
        setModalPosition({ 
            top: rect.bottom + window.scrollY, // 버튼의 아래쪽 + 스크롤 보정
            left: rect.left + window.scrollX - X_OFFSET  // 버튼의 왼쪽});
        });
   
    }
    //3.Edit Add, 4.Edit Withdraw
    const handleEditOpen = (type:string, e: React.MouseEvent<HTMLElement>, index : number) => {
        const rect = (e.currentTarget).getBoundingClientRect(); // 클릭된 position 값 얻기
        const X_OFFSET = 100; //100px 만큼 이동

        setIsOpen(true); // modal open 여부
        setModalType(type); // modal 타입(수정,삭제,드롭메뉴 등등)
        setModalPosition({ 
            top: rect.bottom + window.scrollY, // 버튼의 아래쪽 + 스크롤 보정
            left: rect.left + window.scrollX - X_OFFSET  // 버튼의 왼쪽});
        });
        setIdx(index);//선택된 index
    }

    return (
        <div className="flex flex-col p-8 mx-auto my-auto">
             <div className="flex flex-row flex-nowrap justify-between mb-8">
                <div className="text-5xl text-gray-900">Pots</div>
                 <button onClick={(e) => handleOpenModal("add", e)}  className="text-sm text-white  bg-black font-semibold py-4 px-4 rounded-lg">+Add New Pot</button>
            </div>

            <div className="flex flex-wrap md:flex-row">
                {
                    _data.pots.length > 0 ? (
                    _data.pots.map((item, index) => (
                    
                        <div key={index} className="flex w-full  md:w-1/2 ">
                            <Card  title="" link="">
                                <div className="flex justify-between">
                                    
                                    <div className="flex flex-row items-center">
                                        <div className={`w-3 h-3 rounded-full `} style={{ backgroundColor: item.theme }}></div>
                                        <span className="">{item.name}</span>
                                    </div>
                                    <div className="w-10" onClick={(e) => handleOpenModal("drop", e)} ><img src={dots} alt="" /></div>
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
                                        <button onClick={(e) => handleEditOpen("money", e, index)}  className="text-sm bg-gray-100 font-semibold hover:bg-white w-full max-w-9/10 rounded-lg">+Add Money</button>
                                        <button onClick={(e) => handleEditOpen("withdraw",e, index)} className="text-sm bg-gray-100 font-semibold hover:bg-white w-full  max-w-9/10 py-3 rounded-lg">Withdraw</button>
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
                    case "add":
                        return <PotAddModal closeModal={closeModal} />;
                    case "delete":
                        return <PotDeleteModal closeModal={closeModal} />;
                    case "drop":
                        return <PotDropModal closeModal={closeModal}  position={modalPosition} handleOpenModal={handleOpenModal}  />;
                    case "money":
                        return <PotAmountModal closeModal={closeModal} modalType={modalType} idx={idx} />;
                    case "withdraw":
                        return <PotAmountModal closeModal={closeModal} modalType={modalType} idx={idx}  />;
                    default:
                        return null;
                }
            })()}
        </div>
  );
};