import { modalType } from "../components/modal"

export const MODAL_TEXT: modalText<modalType, string> = {
    "budgets": {
              "add": {
                        "title": "Add New Budget",
                        "description": "Choose a category to set a spending budget. These catogories can help you monitor spending."
              },
              "edit": {
                        "title": "Edit Budget",
                        "description": "As your budgets change, feel free to update your spending limits."
              },
              "remove": {
                        "title": "Delete",
                        "description": "Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever."
              },
              "none": {
                
              }
    }
}


type modalText<K extends modalType, V> = {
    [key:string]: {
        [key in K]: {
            [innerKey: string]: V;
        };
    };
};
    
