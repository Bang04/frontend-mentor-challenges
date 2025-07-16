import { useEffect, useRef } from "react";

export const PotDropModal = ({ handleEditOpen, closeModal, position, id }: any) => {

	const dropMenuRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const handleDocumentClick = (e: {target : any}) => {
			//e.target 이 Ref div 영역 안이면 true , 아니면 false 
			if(!dropMenuRef.current?.contains(e.target)) closeModal();
		};
		document.addEventListener("mousedown", handleDocumentClick);
		return () => {
			document.removeEventListener("mousedown", handleDocumentClick);
		};
	}, [closeModal]);

	return (
		<div id="modal-backdrop"
			ref={dropMenuRef}
			className="absolute z-50 flex items-center bg-opacity-100 shadow-md" 
			style={{ top: position.top , left: position.left }}
		>
			<div className="flex flex-col bg-white rounded-xl shadow-xl relative">
				<button onClick={() => handleEditOpen("edit", id)}  className="py-3 px-6">Edit Pot</button>
				<button onClick={() => handleEditOpen("delete", id)} className="py-3 px-6 text-red-600" >Delete Pot</button>
			</div>
		</div>
	);
}