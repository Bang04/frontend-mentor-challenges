
export const PotDropModal = ({ handleEditOpen, closeModal, position, id }: any) => {


	console.log("삭제할 id : "+id);
	const handleBackdropClick = (e : React.MouseEvent<HTMLDivElement>) => {
		if((e.target as HTMLElement).id === "modal-backdrop"){
          closeModal();  
		}
    }

	return (
		<div
			className="absolute z-50 flex items-center bg-opacity-100 shadow-md" 
			style={{ top: position.top , left: position.left }}
		>
			{/* <div id="modal-backdrop"   onClick={handleBackdropClick}  className="absolute inset-0 bg-black opacity-50"></div> */}
			<div className="flex flex-col bg-white rounded-xl shadow-xl relative">
				<button onClick={(e) => handleEditOpen("edit", id)}  className="py-3 px-6">Edit Pot</button>
				<button onClick={(e) => handleEditOpen("delete", id)} className="py-3 px-6 text-red-600" >Delete Pot</button>
			</div>
		</div>
	);
}