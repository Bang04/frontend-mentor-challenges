import { PropsWithChildren } from "react";
import close from "/images/icon-close-modal.svg";

export type modalType = "ADD" | "EDIT" | "REMOVE" | "ETC";

export type modal = {
	type: modalType,
    isOpen: boolean
    closeModal: ()=>void
	save?: ()=>void
    title?: string
    description?: string
	button?: {name: string, type: string}
	prop?: any
} & PropsWithChildren

export const Modal = ({ isOpen, closeModal, title, description, button, children, save }:modal) => {
    
    if(!isOpen) return null;

	const handleModal = (e: any) => {
		if(save){
			save();
			closeModal();
		}
	};

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-100">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full relative">
				<div className="flex justify-between pb-5">
					<span className="text-2xl self-center font-semibold">{ title }</span>
					<button
						onClick={(e:any)=> closeModal()}
						className="p-2 rounded hover:bg-gray-100">
							<img src={close} />
					</button>
				</div>
				<div className="pb-5">
					<p className="text-sm text-gray-500">{ description }</p>
				</div>
                { children }
                <button type="button" onClick = {(e)=>handleModal(e)} className="text-xs w-full py-3 px-4 bg-black text-white font-normal rounded-md focus:outline-none">{ button?.name  }</button>
            </div>
        </div>
    );

};