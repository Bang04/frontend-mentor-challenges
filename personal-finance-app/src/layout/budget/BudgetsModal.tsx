import { Modal, modal } from "../../components/modal";
import { Select } from "../../components/select";
import { CATEGORIES } from "../../constants/categories";
import { COLOR } from "../../constants/color";
import { useState } from "react";
import { MODAL_TEXT } from "../../constants/modalText";
import { pushData, removeData, updateData } from "../../store/firebase/subscribe";
import { useAppDispatch } from "../../store";

export const BudgetsModal = ({ isOpen, closeModal, prop, type }: modal) => {
    if(!isOpen) return null;
    
    const [category, setCategory] = useState(prop?.info.category ?? "");
    const [color, setColor] = useState(prop?.info.theme ?? "");
    const [maximum, setMaximum] = useState(prop?.info.maximum);

    const dispatch = useAppDispatch();

    const getMaximum = (item: any)=> {
        setMaximum(item);
    }

    const addBudget = () => {
        dispatch(pushData({ 
            "path": "budgets",
            "value": {
                category: category,
                theme: color,
                maximum: maximum*1
            }
        }));

        closeModal();
	};

    const editBudget = () => {
        dispatch(updateData({
            path: "budgets/"+prop.info.id,
            partial: {
                "category": category,
                "theme": color,
                "maximum": maximum*1
            }
        }));

        closeModal();
    }

    const deleteBudget = () => {
        dispatch(removeData({
            path: "budgets/"+prop.info.id
        }));

        closeModal();
    }

    const buttons = [
        {name: "Add Budget",    type: "add",    color: {background: 'bg-black', text: 'text-white'}, handler: addBudget},
        {name: "Edit Budget",   type: "edit",   color: {background: 'bg-black', text: 'text-white'}, handler: editBudget},
        {name: "Yes, Confirm Deletion", type: "remove", color: {background: 'bg-red-500', text: 'text-white'}, handler: deleteBudget},
        {name: "No, Go Back",   type: "remove", color: {background: 'bg-white', text: 'text-gray-500'}, handler: closeModal}
    ];

   const customEdit = () => {
        return (
            <div>
                <div className="pb-3">
                    <label className="block text-sm font-medium text-gray-700">Budget Category</label>
                    <Select name="categories" disabled="true" items={CATEGORIES} defaultValue={prop?.info.category} onSelectChanged={setCategory}></Select>
                </div>
                <div className="pb-3">
					<label className="block text-sm font-medium text-gray-700">Maximum Spend</label>
					<input type="text" defaultValue={maximum} onChange={(e)=>getMaximum(e.target.value)} name="maximum" placeholder="$ e.g.2000" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div className="pb-3">
                    <label className="text-sm font-sm text-gray-700">Color Tag</label>
                    <Select items={COLOR} name="color" defaultValue={prop?.info.theme} onSelectChanged={setColor}></Select>
                </div>
            </div>
        )
   }



    return (
        <>
            <Modal isOpen={isOpen} 
                   closeModal={closeModal} 
                   title={MODAL_TEXT["budgets"]?.[type]["title"]} 
                   description={MODAL_TEXT["budgets"]?.[type]["description"]}
                   buttons={buttons}
                   type={type}
                >
                    {
                        type != 'remove' ?

                            customEdit() : <></>
                    }

            </Modal>
        </>
    )


};