import close from "/images/icon-close-modal.svg";

export const PotDeleteModal = ({ openModal, closeModal }: any) => {
	// Use the destructured props to avoid the error
	return (
		<div>
			<button onClick={openModal}>Edit Pot</button>
			<button onClick={closeModal}>Delete Pot</button>
		</div>
	);
}