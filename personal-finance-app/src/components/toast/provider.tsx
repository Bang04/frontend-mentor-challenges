import { createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "./container";
import { RootState } from "../../store"; 
import { removeToast, setToast } from "../../store/slices/toastSlice"; 
import { Toast } from "../../store/slices/types";

type ToastContextType = {
    addToast: ({ id, itemId , handleEditOpen}: Toast) => void;
}

export const ToastContext = createContext<ToastContextType>({
    addToast: () => {},
});


export const ToastProvider = ({children} : any) => {
    
    const dispatch = useDispatch();
    const toasts = useSelector((state:RootState)=> state.toastReducer);

    const handleRemoveToast = (id: number) => {//해당 토스트 삭제
        dispatch(removeToast(id));
    };

    const addToast = ({ id, itemId, top, left, handleEditOpen }: any) => {
        dispatch(setToast({
            id, itemId, top, left, handleEditOpen
        }));
    }

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={handleRemoveToast}/>
        </ToastContext.Provider>
    );
}