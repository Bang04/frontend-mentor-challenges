import React , { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { Modal } from "../../../components/modal";
import { validateInputs , validateField } from "./PotValidators";
import { add } from "../../../store/slices/postSlice";

export const PotAddModal = ({ closeModal }: any) => {

	const [name, setName ] = useState<string>("");
	const [target, setTarget ] = useState<number>(0);
	const [theme, setTheme ] = useState(colorOptions[0].value);

	const [errors, setErrors] = useState("");

	const dispatch = useDispatch();

	const onSavePotClick = () => {
		const error = validateInputs(name,target);
		if(error == "" ){
			if (name && target && theme) {
				//dispatch(add({ name: name, target: target, theme: theme, id: "", total: 0 }));
				setName('');
				setTarget(0);
				closeModal();
			}
		}else{
			setErrors(error);
		}
	}

	const handlerKeyUp = (e : React.KeyboardEvent<HTMLInputElement>) => {
		const msg = validateField( e.currentTarget.name, e.currentTarget.value );
		setErrors(msg);
	}

	useEffect(() => {
		handlerKeyUp
	},[name,target]);

	return (
		<Modal 
			type={"ADD"} 
			isOpen={true} 
			closeModal={closeModal}
			edit = {onSavePotClick}	
			title = 'Add New Pot'
			description = 'Create a pot to set savings targets. These can help keep you on track as you save for special purchases.'
			buttons = {[
				{
					name: 'Add Pot',
					type: 'ADD',
					color: {
						text : 'text-white',
						background : 'bg-black'
					},
				}
			]}
		>
			<div className="pb-3">
				<label htmlFor="name" className="block text-sm font-medium text-gray-500">Pot Name</label>
				<input type="text" name="name" placeholder="e.g.Rainy Days" onChange={(e) => setName(e.target.value)} onKeyUp={handlerKeyUp}  maxLength={30} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
				<p className="text-xs text-right text-gray-400 pt-1">30 characters left</p>
			</div>
			<div className="pb-3">
				<label htmlFor="target" className="block text-sm font-medium text-gray-700">Target</label>
				<input type="text" name="target" placeholder="$ e.g.2000" onChange={(e) => setTarget(Number(e.target.value))} onKeyUp={handlerKeyUp} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
				
			<div className="pb-5">
				<label className="block text-sm font-medium text-gray-700">Theme</label>
				<select name="theme" defaultValue="" onChange={(e) =>setTheme(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">	
					{ 	
						colorOptions.map((color, index) =>
							<option key={index} value={color.value}>{color.key}</option>
					)}
				</select>
			</div>
				{errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
			</div>
		</Modal>
	);

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