import { useDispatch } from "react-redux";
import { Modal, modal } from "../../components/modal";
import { Select } from "../../components/select";
import { add } from "../../store";
import { CATEGORIES } from "../../constants/categories";
import { COLOR } from "../../constants/color";
import { useState } from "react";

export const BudgetsModal = ({ isOpen, closeModal, prop, type }: modal) => {
    if(!isOpen) return null;

    const [category, setCategory] = useState("");
    const [color, setColor] = useState("");
    const [maximum, setMaximum] = useState(0);

    const dispatch = useDispatch();

    const getMaximum = (item: any)=> {
        setMaximum(item);
    }

    const saveBudget = () => {
        dispatch(add({
            "category": category,
            "maximum": maximum*1, //number
            "theme": color
        }));
	};

    const title =  {
        "ADD": "Add New Budget",
        "EDIT": "Edit Budget",
        "REMOVE": "Delete '"+prop+"'?"
    } as any;


    return (
        <>
            <Modal isOpen={isOpen} 
                   closeModal={closeModal} 
                   title={title[type]} 
                   description="Choose a category to set a spending budget. These catogories can help you monitor spending."
                   button={{name: "Add Budget", type: "ADD"}}
                   save={saveBudget}
                   type={type}
                >
                <div className="pb-3">
                <label className="block text-sm font-medium text-gray-700">Budget Category</label>
                    <Select name="categories" disabled="true" items={CATEGORIES} onSelectChanged={setCategory}></Select>
                </div>
                <div className="pb-3">
					<label className="block text-sm font-medium text-gray-700">Maximum Spend</label>
					<input type="text" onChange={(e)=>getMaximum(e.target.value)} name="maximum" placeholder="$ e.g.2000" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div className="pb-3">
                    <label className="text-sm font-sm text-gray-700">Color Tag</label>
                    <Select items={COLOR} name="color" onSelectChanged={setColor}></Select>
                </div>
            </Modal>
        </>
    )


};