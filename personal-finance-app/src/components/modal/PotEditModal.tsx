import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { rootState } from "../../store";
import { useDispatch } from "react-redux";
import { updatePot } from "../../store";
import close from "/images/icon-close-modal.svg";

 type pot = {
	id : string;
	name : string;
	target : number;
	total : number;
	theme : string;
};

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

export const PotEditModal = ({ isOpen, closeModal, id }: any) => {
	const pot = useSelector((state: rootState) =>
		state.dataReducer.pots.find((pot: pot) => pot.id === id)
	);
	
	const [name, setName ] = useState('');
	const [target , setTarget ] = useState<number>(0);
	const [theme , setTheme ] = useState('');
	const [update , setUpdate ] = useState({
		id : id,
		name : '',
		theme: '',
		target : 0
	});

	const dispatch = useDispatch();
	
	const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
	const onTargetChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTarget(Number(e.target.value));
	const onThemeChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setTheme(e.target.value);
	}
		
	const handlerUpdateClick = () => {
		if(name && target && theme){
			setUpdate({id: id ,name, target, theme});
			console.log("update data : "+update);
			dispatch(updatePot(update));
		}
		closeModal();
	}
	const handleBackdropClick = (e : React.MouseEvent<HTMLDivElement>) => {
        closeModal();
    }

	useEffect(() => {
		if(pot) {
			setName(pot.name);
			setTarget(pot.target);
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
							<input type="text" name="name"  value={name} onChange={onNameChanged} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
							<p className="text-xs text-right text-gray-400 pt-1">30 characters left</p>
						</div>
						<div className="pb-3">
							<label className="block text-sm font-medium text-gray-700">Target</label>
							<input type="text" name="target" value={target} onChange={onTargetChanged} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
						</div>
						<div className="pb-5">
							<label className="block text-sm font-medium text-gray-700">Theme</label>
							<select name="theme" value={theme} onChange={onThemeChanged} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">	
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