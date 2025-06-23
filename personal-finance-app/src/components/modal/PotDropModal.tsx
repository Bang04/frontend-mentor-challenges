
export const PotDropModal = ({ handleOpenModal, closeModal, position, }: any) => {

	const handleBackdropClick = (e : React.MouseEvent<HTMLDivElement>) => {
		if((e.target as HTMLElement).id === "modal-backdrop"){

          closeModal();  
		}
    }


	return (
		<div id="modal-backdrop"  
			//onClick={handleBackdropClick} 
			className="absolute z-50 flex items-center bg-opacity-100 shadow-md" 
			style={{ top: position.top , left: position.left }}
		>
			<div className="flex flex-col bg-white rounded-xl shadow-xl relative">
				<button onClick={(e) => handleOpenModal("edit", e)}  className="py-3 px-6">Edit Pot</button>
				<button onClick={(e) => handleOpenModal("delete", e)} className="py-3 px-6 text-red-600" >Delete Pot</button>
			</div>
		</div>
	);
}