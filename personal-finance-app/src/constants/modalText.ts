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
              "none": {},
              "deposit": {},
              "withdraw": {},
    },
        "pots": {
              "add": {
                        "title": "Add New Pot",
                        "description": "Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
              },
              "edit": {
                        "title": "Edit Pot",
                        "description": "If your saving targets change, feel free to update your pots."
              },
              "remove": {
                        "title": "Delete ‘Savings’?",
                        "description": "Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever."
              },
               "deposit": {
                  "title": "Add to ‘Savings’",
                  "description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus  hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet.",
                  "graph" : "New Amount",
                  "input": "Amount to Add",
                },
            "withdraw": {
                  "title": "Withdraw from ‘Savings’’",
                  "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus  hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet.",
                  "graph" : "New Amount",
                  "input": "Amount to Withdraw",
                    }, 
            "none": { },
    }
}


type modalText<K extends modalType, V> = {
    [key:string]: {
        [key in K]: {
            [innerKey: string]: V;
        };
    };
};
    
