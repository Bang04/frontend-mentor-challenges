import { useSelector } from "react-redux";
import { rootState } from "../store"
import { useState } from "react";

import { Card } from "../components/Card"
import { PotAddModal } from "../components/modal/PotAddModal";
import { PotDeleteModal } from "../components/modal/PotDeleteModal";
import { PotDropModal } from "../components/modal/PotDropModal";

import dots from "/images/dots-three-thin.svg";

export const Pots = () => {
    const _data = useSelector((state:rootState)=> state.dataReducer);
    
    const [openModal, setOpenModal] = useState(false);
    const [modalType , setModalType ] = useState(""); //add | menu | del | edit
    const closeModal = () =>{
        setOpenModal(false);
    }
    const handlerModal = (s:string) => {
        setOpenModal(true);
        setModalType(s);
    }


 
    return (
        <div className="flex flex-col p-8 mx-auto my-auto">
             <div className="flex flex-row flex-nowrap justify-between mb-8">
                <div className="text-5xl text-gray-900">Pots</div>
                 <button 
                    onClick={() => handlerModal("add")}
                    className="text-sm text-white  bg-black font-semibold py-4 px-4 rounded-lg"
                >
                    +Add New Pot
                </button>
            </div>

            <div className="flex flex-wrap md:flex-row">
            
                {
                    _data.pots.length > 0 ? (
                    _data.pots.map((item, index) => (
                    
                        <div className="flex w-full  md:w-1/2 ">
                            <Card key={index} title="" link="">
                                <div className="flex justify-between">
                                    
                                    <div className="flex flex-row items-center">
                                        <div className={`w-3 h-3 rounded-full `} style={{ backgroundColor: item.theme }}></div>
                                        <span className="">{item.name}</span>
                                    </div>
                                    <div className="w-10" onClick={()=> handlerModal("menu")}><img src={dots} alt="" /></div>
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
                                        <button className="text-sm bg-gray-100 font-semibold hover:bg-white w-full max-w-9/10 rounded-lg">+Add Money</button>
                                        <button className="text-sm bg-gray-100 font-semibold hover:bg-white w-full  max-w-9/10 py-3 rounded-lg">Withdraw</button>
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
            
            <PotAddModal openModal={openModal} closeModal={closeModal} modalType ={modalType}/>
            <PotDeleteModal openModal={openModal} closeModal={closeModal} modalType ={modalType}/>
            <PotDropModal openModal={openModal} closeModal={closeModal} modalType ={modalType}/>

        </div>
  );
};