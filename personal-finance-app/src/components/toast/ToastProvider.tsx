// 전역 상태 관리, Context 생성/제공, 로직 공유	useContext,
// 상태 저장 (useState, useReducer) 등
import { useEffect, createContext } from "react";
import { rootState ,setToast, removeToast } from "../../store";
import { useDispatch, useSelector } from "react-redux";

type ToastContextType = {
    handlerShowToast: ({ id, message, dismissTimer }: { id: number; message: string; dismissTimer: number; }) => void;
};

const ToastContext = createContext<ToastContextType>(null);

import { ToastContainer } from "./ToastContainer";

export const ToastProvider = ({children} : any) => {
    
    const dispatch = useDispatch();
    const toasts = useSelector((state:rootState)=> state.toastReducer);//토스트 저장목록

    const handleRemoveToast = (id: number) => {//해당 토스트 삭제
        dispatch(removeToast(id));
    };

    const handlerShowToast = ({}: {
        id : number;
        message : string ;
        dismissTimer: number;
    }) => {
       

        useEffect(() => {
            


            //시간에 따라 토스 닫힘
            let timer = setTimeout(()=>{
                 dispatch(removeToast(toastId));
            }, 3000);
    
            return () => {
                clearTimeout(timer);
            };
        }, [toasts]);
    }
    
    return (
        <ToastContext.Provider value={{ handlerShowToast }}>
            {children}
            <ToastContainer toasts = {toasts} removeToast = {handleRemoveToast} />
        </ToastContext.Provider>
    );
}
