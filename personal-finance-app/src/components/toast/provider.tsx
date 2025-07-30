// 전역 상태 관리, Context 생성/제공, 로직 공유	useContext,
// 상태 저장 (useState, useReducer) 등
import { createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "./container";
//import { RootState } from "../../store"; 원래 데이터
//import { removeToast, setToast } from "../../store/slices/toastSlice";원래 데이터

import { rootState,  setToast, removeToast  } from "../../store/_index";

import { Toast } from "../../store/slices/types";

type ToastContextType = {
    handlerAddToast: ({ id, itemId , handleEditOpen}: Toast) => void;
};

export const ToastContext = createContext<ToastContextType>({
    handlerAddToast: () => {},
});


export const ToastProvider = ({children} : any) => {
    
    const dispatch = useDispatch();

    //const toasts = useSelector((state:RootState)=> state.toastReducer);  원래 데이터
    const toasts = useSelector((state:rootState)=> state.toastReducer);//토스트 저장목록


    const handleRemoveToast = (id: number) => {//해당 토스트 삭제
        dispatch(removeToast(id));
    };

    const handlerAddToast = ({ id, itemId, top, left, handleEditOpen }: Toast) => {
        dispatch(setToast({
            id, itemId, top, left, handleEditOpen
        }));
    }

    return (
        <ToastContext.Provider value={{ handlerAddToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={handleRemoveToast}/>
        </ToastContext.Provider>
    );
}