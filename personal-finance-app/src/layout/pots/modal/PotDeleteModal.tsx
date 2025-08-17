import React from "react";

import { useDispatch } from "react-redux";
import { Modal } from "../../../components/modal";
// TODO: Modal 공통 모듈로 리팩토링 하기 
export const PotDeleteModal = ({ closeModal, id }: any) => {

	const dispatch = useDispatch();
	const onClickHandler = () => {
		//dispatch(removePot(id));
		closeModal();
	}

	const handleBackdropClick = (e : React.MouseEvent<HTMLDivElement>) => {
        closeModal();
    }
	
	return (
		<Modal 
			type={"remove"} 
			isOpen={true} 
			closeModal={closeModal}
			title = "Delets 'Savings'?"
			description = 'Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.'
			buttons = {[
				{
					name: 'Yes, Confirm Deletion',
					type: 'REMOVE',
					 handler: onClickHandler	,
					color: {
						text : 'text-white',
						background : 'bg-red-600'
					},
				},
				{
					name: 'No, Go Back',
					type: 'REMOVE',
					color: {
						text : 'text-white',
						background : 'bg-black'
					},
				}
			]}
		>	
		</Modal>
	);

}