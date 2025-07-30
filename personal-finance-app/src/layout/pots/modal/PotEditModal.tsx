import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { RootState } from "../../../store";
import { Pot } from "../../../store/slices/types";
import { Modal } from "../../../components/modal";


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

// TODO: Modal 공통 모듈로 리팩토링 하기 
export const PotEditModal = ({ closeModal, id }: any) => {
	
	const dispatch = useDispatch();
	console.log(typeof id);
	const pot = useSelector((state: RootState) =>
		state.postReducer.pots.find((pot: Pot) => pot.id === id+"")
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
			// 	id : id.toString(),
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
		 <Modal 
				type={"EDIT"} 
				isOpen={true} 
				closeModal={closeModal}
				title = 'Edit Pot'
				description = 'If your saving targets change, feel free to update your pots.'
				buttons = {[
					{
						name: 'Save Chages',
						type: 'EDIT',
						handler: handlerUpdateClick ,
						color: {
							text : 'text-white',
							background : 'bg-black'
						},
					}
				]}
			>
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
			</Modal>
		);	
}