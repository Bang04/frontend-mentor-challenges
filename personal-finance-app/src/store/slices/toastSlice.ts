import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Toast } from "./types";


export const TOAST_DELAY = 3000;

let  toasts: Toast[] = [];

const toast = createSlice({
    name: 'toastReducer',
    initialState: toasts,
    reducers: {
        setToast: (state, action: PayloadAction<Toast>) => {
            const targetIndex = state.findIndex(toast => toast.itemId == action.payload.itemId);
            if(targetIndex !== -1){
                state.splice(targetIndex, 1);//한 번 더 클릭했을때 toast 닫기
            }else{
                 state.push(action.payload);
            }
            
        },
        removeToast: (state, action: PayloadAction<number>) => {
            return state.filter(toast => toast.id !== action.payload);
        }
    }
});

export const { setToast, removeToast } = toast.actions;
export default toast.reducer;