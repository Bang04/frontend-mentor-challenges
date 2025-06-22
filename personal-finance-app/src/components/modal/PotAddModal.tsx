import React , { useState } from "react";

import { useDispatch } from "react-redux";
import { addPot } from "../../store";

import close from "/images/icon-close-modal.svg";

 type pot = {
	name : string;
	target : number;
	total : number;
	theme : string;
};

export const PotAddModal = ({ openModal, closeModal, Mode }: any) => {

	const [ pot, setPot ] = useState<pot>({name: "", target:0, total:0,theme:""});
	const dispatch = useDispatch();
	

const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
	e.preventDefault();
	const form = e.currentTarget;
	const formData = new FormData(form);
	const name = formData.get("name") as string;
	const target = Number(formData.get("target"));
	const theme = formData.get("theme") as string;

	const newPot: pot = {
		name,
		target,
		total: 0,
		theme
	};
	setPot(newPot);
	dispatch(addPot(newPot));
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
		<>
			{openModal && (
				<form onSubmit={handlerSubmit}>
					<div className="fixed inset-0 z-50 flex items-center bg-opacity-100">
						<div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full relative">
							<div className="flex justify-between ">
								<span className="text-2xl self-center">Add New Pot</span>
								<button
										onClick={(e:any)=> handleBackdropClick(e)}
										className="p-2 rounded hover:bg-gray-100"
									>
									<img src={close} />
								</button>
							</div>

							<div>
								<p>Create a pot to set savings targets. These can help keep you on track as you save for special purchases.</p>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">Pot Name</label>
								<input type="text" name="name" placeholder="e.g.Rainy Days" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">Target</label>
								<input type="text" name="target" placeholder="$ e.g.2000" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700">Theme</label>
								<select name="theme" defaultValue="" className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">	
									{ 	
										colorOptions.map((color) =>
											<option value={color.value}>{color.key}</option>
									)}
								</select>
							</div>
							<button type="submit" className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">Add Pot</button>
						</div>
					</div>
				</form>
			)}
		</>
	);

}