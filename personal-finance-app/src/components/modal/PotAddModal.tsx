import React , { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setPot } from "../../store/_index";

import close from "/images/icon-close-modal.svg";
import { validateInputs , validateField } from "./PotValidators";

export const PotAddModal = ({ closeModal }: any) => {

	

	const [potName, setPotName ] = useState<string>("");
	const [target, setTarget ] = useState<number>(0);
	const [theme, setTheme ] = useState(colorOptions[0].value);

	const [errors, setErrors] = useState("");

	const dispatch = useDispatch();

	const onSavePotClick = () => {
		const error = validateInputs(potName,target);
		if(error == "" ){
			if (potName && target && theme) {
				dispatch(setPot({ name: potName, target, theme, id: "", total: 0 }));
				setPotName('');
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

	const handlerBackdropClick = (e : React.MouseEvent<HTMLDivElement>) => {
		closeModal();
	}
	useEffect(() => {
		handlerKeyUp
	},[name,target]);

	return (
		<div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-100">
				<div className="absolute inset-0 bg-black opacity-50"></div>
				<div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full relative">
					<div className="flex justify-between pb-5">
						<span className="text-2xl self-center font-semibold">Add New Pot</span>
						<button
								onClick={(e:any)=> handlerBackdropClick(e)}
								className="p-2 rounded hover:bg-gray-100"
							>
							<img src={close} />
						</button>
					</div>
					<div className="pb-5">
						<p className="text-sm text-gray-500">Create a pot to set savings targets. These can help keep you on track as you save for special purchases.</p>
					</div>
					<div className="pb-3">
						<label htmlFor="name" className="block text-sm font-medium text-gray-500">Pot Name</label>
						<input type="text" name="name" placeholder="e.g.Rainy Days" onChange={(e) => setPotName(e.target.value)} onKeyUp={handlerKeyUp}  maxLength={30} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
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
					<button type="button" onClick = {onSavePotClick} className="text-xs w-full py-3 px-4 bg-black text-white font-normal rounded-md focus:outline-none">Add Pot</button>
				</div>
		</div>
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