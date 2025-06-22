import React , { useState } from "react";

import { useDispatch } from "react-redux";
import close from "/images/icon-close-modal.svg";

export const PotDeleteModal = ({ openModal, closeModal, Mode }: any) => {

	const dispatch = useDispatch();
	

	const handleBackdropClick = (e : React.MouseEvent<HTMLDivElement>) => {
        closeModal();
    }


	return (
		<>
			{openModal == "del" && (
				<div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-100">
						 <div className="absolute inset-0 bg-black opacity-50"></div>
						<div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full relative">
							<div className="flex justify-between pb-5">
								<span className="text-2xl self-center font-semibold">Delets 'Savings'?</span>
								<button
										onClick={(e:any)=> handleBackdropClick(e)}
										className="p-2 rounded hover:bg-gray-100"
									>
									<img src={close} />
								</button>
							</div>

							<div className="pb-5">
								<p className="text-sm text-gray-500">Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.</p>
							</div>
							
							<button type="button" className="text-xs w-full py-3 px-4 bg-black text-white font-normal rounded-md focus:outline-none">Yes, Confirm Deletion</button>
							<button type="button">No, Go Back</button>
						</div>
					</div>
			)}
		</>
	);

}