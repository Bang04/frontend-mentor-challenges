import { useSelector } from "react-redux";
import close from "/images/icon-close-modal.svg";
import { rootState } from "../../store";

export const PotAddModal = ({ openModal, closeModal, Mode }: any) => {
	 const _data = useSelector((state:rootState)=> state.dataReducer);
    
	 
	const handleBackdropClick = (e : React.MouseEvent<HTMLDivElement>) => {
        closeModal();
    }
	const theme = _data.pots.map(item => item.theme);
	const uniqueTheme = [...new Set(theme)];
	return (
		<>
			{openModal && (
				 <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-100">
					<div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full relative">
						<div>
							<span>Add New Pot</span>
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
							<label htmlFor="name" className="block text-sm font-medium text-gray-700">Pot Name</label>
							<input
								type="text"
								id="name"
								name="name"
								placeholder="e.g.Rainy Days"
								required
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div>
							<label htmlFor="target" className="block text-sm font-medium text-gray-700">Target</label>
							<input
								type="text"
								id="target"
								name="target"
								placeholder="$ e.g.2000"
								required
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div>
							<label htmlFor="role" className="block text-sm font-medium text-gray-700">역할</label>
							<select
								id="role"
								name="role"
								required
								className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							>	
							{ uniqueTheme.map((item, index) => (
									<option value=""><div className={`w-3 h-3 rounded-full `} style={{ backgroundColor: item }}></div></option>
							))}
								<option value="">역할 선택</option>
								<option value="admin">관리자</option>
								<option value="user">사용자</option>
								<option value="guest">게스트</option>
							</select>
						</div>

						<button 
							onClick={closeModal}
							className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							Add Pot
						</button>
					</div>
				</div>
			)}
		</>
	);

}