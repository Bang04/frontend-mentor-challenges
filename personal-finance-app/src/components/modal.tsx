import { PropsWithChildren } from "react";
import close from "/images/icon-close-modal.svg";
import { Button } from "./Button";
export type modalType = "ADD" | "EDIT" | "REMOVE";

export type modal = {
	type: modalType,
	isOpen: boolean
	closeModal: () => void
	title?: string
	description?: string
	buttons?: { name: string, type: string, handler?: () => void, color: { text: string, background: string } }[]
	prop?: any
} & PropsWithChildren

export const Modal = ({ type, isOpen, closeModal, title, description, buttons, children }: modal) => {

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-100">
			<div className="absolute inset-0 bg-black opacity-50"></div>
			<div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full relative">
				<div className="flex justify-between pb-5">
					<span className="text-2xl self-center font-semibold">{title}</span>
					<button
						onClick={(e: any) => closeModal()}
						className="p-2 rounded hover:bg-gray-100">
						<img src={close} />
					</button>
				</div>
				<div className="pb-5">
					<p className="text-sm text-gray-500">{description}</p>
				</div>
				{children}
				{
					buttons?.map((button, _index) => (
						type == button.type ?
							<Button
								type='modal'
								name={button?.name}
								bg_color={button.color.background}
								text_color={button.color.text}
								closeModal={closeModal}
								handler={button.handler}
							></Button>
						: <></>

					))
				}
			</div>
		</div>
	);

};


