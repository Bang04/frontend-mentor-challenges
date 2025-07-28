import { useDispatch } from "react-redux";
import { Modal, modal } from "../../components/modal";
import { Select } from "../../components/select";
import { CATEGORIES } from "../../constants/categories";
import { COLOR } from "../../constants/color";
import { useState } from "react";
import { MODAL_TEXT } from "../../constants/modalText";

export const BudgetsModal = ({ isOpen, closeModal, prop, type }: modal) => {
    if(!isOpen) return null;

    const [category, setCategory] = useState(prop?.info[0].category ?? "");
    const [color, setColor] = useState(prop?.info[0].theme ?? "");
    const [maximum, setMaximum] = useState(prop?.info[0].maximum);

    const dispatch = useDispatch();

    const getMaximum = (item: any)=> {
        setMaximum(item);
    }

    //FIXME 나중에 서버 붙이고 나서 id생성되면 수정
    const editBudget = () => {
        // if(type != "REMOVE"){
        //     dispatch(edit({
        //         "category": category,
        //         "maximum": maximum*1, //number
        //         "theme": color
        //     }));
        // }else {
        //     dispatch(remove({
        //         "category": category,
        //         "maximum": maximum*1,
        //         "theme": color
        //     }));
        // }
        
	};

    const buttons = [
        {name: "Add Budget",    type: "ADD",    color: {background: 'bg-black', text: 'text-white'}},
        {name: "Edit Budget",   type: "EDIT",   color: {background: 'bg-black', text: 'text-white'}},
        {name: "Yes, Confirm Deletion", type: "REMOVE", color: {background: 'bg-red-500', text: 'text-white'}},
        {name: "No, Go Back",   type: "REMOVE", color: {background: 'bg-white', text: 'text-gray-500'}}
    ];

   const customEdit = () => {
        return (
            <div>
                <div className="pb-3">
                    <label className="block text-sm font-medium text-gray-700">Budget Category</label>
                    <Select name="categories" disabled="true" items={CATEGORIES} defaultValue={prop?.info[0].category} onSelectChanged={setCategory}></Select>
                </div>
                <div className="pb-3">
					<label className="block text-sm font-medium text-gray-700">Maximum Spend</label>
					<input type="text" defaultValue={maximum} onChange={(e)=>getMaximum(e.target.value)} name="maximum" placeholder="$ e.g.2000" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div className="pb-3">
                    <label className="text-sm font-sm text-gray-700">Color Tag</label>
                    <Select items={COLOR} name="color" defaultValue={prop?.info[0].theme} onSelectChanged={setColor}></Select>
                </div>
            </div>
        )
   }



    return (
        <>
            <Modal isOpen={isOpen} 
                   closeModal={closeModal} 
                   title={MODAL_TEXT["budgets"][type]["title"]} 
                   description={MODAL_TEXT["budgets"][type]["description"]}
                   buttons={buttons}
                   edit={editBudget}
                   type={type}
                >
                    {
                        type != 'REMOVE' ?

                            customEdit() : <></>
                    }

            </Modal>
        </>
    )


};