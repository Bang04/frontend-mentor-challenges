import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import close from "/images/icon-close-modal.svg";
import { RootState } from "../../store";
import { Pot } from "../../store/slices/types";


export 	const colorOptions = [
		{ key: 'Green', value: '#277C78' },
		{ key: 'Yellow', value: '#FFFF00' },
		{ key: 'Cyan', value: '#00FFFF' },      
		{ key: 'Navy', value: '#000080' },
		{ key: 'Red', value: '#FF0000' },
		{ key: 'Purple', value: '##826CB0' },
		{ key: 'Turquoise', value: '#82C9D7' },  
		{ key: 'Brown', value: '#A52A2A' },
		{ key: 'Megenta', value: '#FF00FF' },   
		{ key: 'Blue', value: '#0000FF' },
		{ key: 'Gray', value: '#626070' },
		{ key: 'Army', value: '#4B5320' },        
		{ key: 'Pink', value: '#F2CDAC' },
];

export const PotEditModal = ({ closeModal, id }: any) => {
	const dispatch = useDispatch();
	const pot = useSelector((state: RootState) =>
		//state.potReducer.find((pot: Pot) => pot.id === id)
		state.postReducer.pots.find((pot:Pot)=>pot.id === id)
	);
	
	const [name, setName ] = useState("");
	const [target , setTarget ] = useState("");
	const [theme , setTheme ] = useState("");


	useEffect(() => {
		if(pot){
			setName(pot.name);
			setTarget(pot.target.toString());
			setTheme(pot.theme);
		}
	},[pot]);
	

	const handlerUpdateClick = () => {
	const targeNumber = Number(target);
		if(name && !isNaN(targeNumber) && theme){
			// dispatch(updatePot({
			// 	id : id,
			// 	name: name, 
			// 	target:targeNumber, 
			// 	theme: theme
			// }));
		}
		closeModal();
	}

	const handleBackdropClick = (e : React.MouseEvent<HTMLDivElement>) => {
        closeModal();
    }

	useEffect(() => {
		if(pot) {
			setName(pot.name);
			setTarget(pot.target.toString());
			setTheme(pot.theme);
		}
	},[pot]);

	return (
			<div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-100">
					<div className="absolute inset-0 bg-black opacity-50"></div>
					<div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full relative">
						<div className="flex justify-between pb-5">
							<span className="text-2xl self-center font-semibold">Edit Pot</span>
							<button
									onClick={(e:any)=> handleBackdropClick(e)}
									className="p-2 rounded hover:bg-gray-100"
								>
								<img src={close} />
							</button>
						</div>
						<div className="pb-5">
							<p className="text-sm text-gray-500">If your saving targets change, feel free to update your pots.</p>
						</div>
						<div className="pb-3">
							<label className="block text-sm font-medium text-gray-500">Pot Name</label>
							<input type="text" name="name"  value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
							<p className="text-xs text-right text-gray-400 pt-1">30 characters left</p>
						</div>
						<div className="pb-3">
							<label className="block text-sm font-medium text-gray-700">Target</label>
							<input type="text" name="target" value={target} onChange={(e) => setTarget(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
						</div>
						<div className="pb-5">
							<label className="block text-sm font-medium text-gray-700">Theme</label>
							<select name="theme" value={theme} onChange={(e) => setTheme(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">	
								{ colorOptions.map((color) =>
									<option value={color.value}>{color.key}</option>
								)}
							</select>
						</div>
						<button type="button" 
							onClick={(e) => handlerUpdateClick() }
							className="text-xs w-full py-3 px-4 bg-black text-white font-normal rounded-md focus:outline-none">
								Save Chages
						</button>
					</div>
			</div>
		);	
}