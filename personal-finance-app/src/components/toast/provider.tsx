// 전역 상태 관리, Context 생성/제공, 로직 공유	useContext,
// 상태 저장 (useState, useReducer) 등
import { createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "./container";
import { RootState } from "../../store";
import { removeToast, setToast } from "../../store/slices/toastSlice";

type ToastContextType = {
    handlerAddToast: ({ id, itemId , handleEditOpen}: any) => void;
};

export const ToastContext = createContext<ToastContextType>({
    handlerAddToast: () => {},
});


export const ToastProvider = ({children} : any) => {
    
    const dispatch = useDispatch();
    const toasts = useSelector((state:RootState)=> state.toastReducer);//토스트 저장목록


    const handleRemoveToast = (id: number) => {//해당 토스트 삭제
        dispatch(removeToast(id));
    };

    const handlerAddToast = ({ id, itemId }: Toast) => {
        dispatch(setToast({ id, itemId }));
    }

    return (
        <ToastContext.Provider value={{ handlerAddToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={handleRemoveToast}/>
        </ToastContext.Provider>
    );
}