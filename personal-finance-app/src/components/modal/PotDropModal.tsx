
export const PotDropModal = ({ openModal, closeModal }: any) => {
	

	const handleBackdropClick = (e : React.MouseEvent<HTMLDivElement>) => {
          closeModal();  
    }


	return (
		<>
			{openModal == "menu" && (
				<div className="bg-white rounded-xl">
					<button onClick={openModal}>Edit Pot</button>
					<button className="text-red-100" onClick={closeModal}>Delete Pot</button>
				</div>
			)}
		</>
	);
}