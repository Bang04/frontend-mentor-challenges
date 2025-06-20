import { useSelector } from "react-redux";
import { rootState } from "../store"
import { useState } from "react";

import { Card } from "../components/Card"
import { PotAddModal } from "../components/moals/PotAddModal";
import { PotDeleteModal } from "../components/moals/PotDeleteModal";
import { PotDropModal } from "../components/moals/PotDropModal";

import dots from "/images/dots-three-thin.svg";

export const Pots = () => {
    const _data = useSelector((state:rootState)=> state.dataReducer);
    
    const [openModal, setOpenModal] = useState(false);
    const [mode , setMode ] = useState("");
    const closeModal = () =>{
        setOpenModal(false);
    }
    const handlerAddPotModal = (mode:string) => {
        setOpenModal(true);
        setMode(mode);
    }
 
 
    return (
        <div className="flex flex-col ">
             <div className="flex flex-row flex-nowrap justify-between">
                <div className="text-5xl text-gray-900">Pots</div>
                 <button 
                    onClick={() => handlerAddPotModal("add")}
                    className="text-sm text-white  bg-black font-semibold py-4 px-4 rounded-lg"
                >
                    +Add New Pot
                </button>
            </div>

            <div className="flex flex-wrap md:flex-row justify-center">
            
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
                                    <div className="w-10"><img src={dots} alt="" /></div>
                                </div>
                                <div>
                                    <div className="flex justify-between"> 
                                    <span className="text-gray-500">Total Saved</span>
                                        <span>${item.total}</span>
                                    </div>
                                    <div>
                                        <div className="w-full h-3 bg-gray-100">
                                            <div className={``} style={{ backgroundColor: item.theme }}></div>
                                        </div>
                                    </div>
                                    <div  className="flex justify-between">
                                        <span className="text-gray-500">%</span>
                                        <span className="text-gray-500">Target of ${item.target}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <button className="text-lg bg-gray-100 font-semibold hover:bg-white  py-4 px-13 rounded-lg">+Add Money</button>
                                        <button className="text-lg bg-gray-100 font-semibold hover:bg-white  py-4 px-16 rounded-lg">Withdraw</button>
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
            
            <PotAddModal openModal={openModal} closeModal={closeModal} mode ={mode}/>

        </div>
  );
};