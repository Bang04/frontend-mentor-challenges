import React , { useState } from "react";

import { useDispatch } from "react-redux";
import { setPot } from "../../store";

import close from "/images/icon-close-modal.svg";


export const PotAddModal = ({ isOpen, closeModal, modalType }: any) => {

	const [name, setName ] = useState('');
	const [target , setTarget ] = useState<number>(0);
	const [theme , setTheme ] = useState('');

	const dispatch = useDispatch();

	const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
	const onTargetChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTarget(Number(e.target.value));
	const onThemeChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setTheme(e.target.value);


	const onSavePotClick = () => {
		if(name && target && theme){}
		dispatch(setPot({id: "",name, target, theme,total: 0}));
		setName('');
		setTarget(0);

		//e.preventDefault();
		// const formData = new FormData(e.currentTarget);
		// const name = formData.get("name") as string;
		// const target = Number(formData.get("target"));
		// const theme = formData.get("theme") as string;

		// const newPot: pot = {name,target,total: 0,theme};

		//dispatch(addPot(newPot));
		closeModal();
	}
	const handleBackdropClick = (e : React.MouseEvent<HTMLDivElement>) => {
        closeModal();
    }
	const colorOptions = [
		{ key: 'Green', value: '#277C78' },
		{ key: 'Yellow', value: '#FFFF00' },
		{ key: 'Cyan', value: '#00FFFF' },      
		{ key: 'Navy', value: '#000080' },
		{ key: 'Red', value: '#FF0000' },
		{ key: 'Purple', value: '#826CB0' },
		{ key: 'Turquoise', value: '#40E0D0' },  
		{ key: 'Brown', value: '#A52A2A' },
		{ key: 'Megenta', value: '#FF00FF' },   
		{ key: 'Blue', value: '#0000FF' },
		{ key: 'Gray', value: '#626070' },
		{ key: 'Army', value: '#4B5320' },        
		{ key: 'Pink', value: '#FFC0CB' },
	];

	return (
		<div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-100">
				<div className="absolute inset-0 bg-black opacity-50"></div>
				<div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full relative">
					<div className="flex justify-between pb-5">
						<span className="text-2xl self-center font-semibold">Add New Pot</span>
						<button
								onClick={(e:any)=> handleBackdropClick(e)}
								className="p-2 rounded hover:bg-gray-100"
							>
							<img src={close} />
						</button>
					</div>
					<div className="pb-5">
						<p className="text-sm text-gray-500">Create a pot to set savings targets. These can help keep you on track as you save for special purchases.</p>
					</div>
					<div className="pb-3">
						<label className="block text-sm font-medium text-gray-500">Pot Name</label>
						<input type="text" name="name" id="name" placeholder="e.g.Rainy Days" onChange={onNameChanged} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
						<p className="text-xs text-right text-gray-400 pt-1">30 characters left</p>
					</div>
					<div className="pb-3">
						<label className="block text-sm font-medium text-gray-700">Target</label>
						<input type="text" name="target" placeholder="$ e.g.2000" onChange={onTargetChanged} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
					</div>
					<div className="pb-5">
						<label className="block text-sm font-medium text-gray-700">Theme</label>
						<select name="theme" defaultValue="" onChange={onThemeChanged} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">	
							{ 	
								colorOptions.map((color, index) =>
									<option key={index} value={color.value}>{color.key}</option>
							)}
						</select>
					</div>
					<button type="button" onClick = {onSavePotClick} className="text-xs w-full py-3 px-4 bg-black text-white font-normal rounded-md focus:outline-none">Add Pot</button>
				</div>
		</div>
	);

}