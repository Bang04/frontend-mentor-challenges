import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TOAST_DELAY, removeToast } from "../../store/slices/toastSlice";

export const ToastItem = ({toast } : any) => {
    const dispatch = useDispatch();

    useEffect(() => {
        
        
        const timer = setTimeout(() => {
            dispatch(removeToast(toast.id));
        }, TOAST_DELAY); // 3초 후 자동 숨김

        return () => {
            clearTimeout(timer);
        };
    }, [toast]);
    
    return(
        <div className="absolute bg-white rounded-lg shadow-lg z-10"
            style={{ top: toast.top , left: toast.left }}>
            <div className="flex flex-col">
               <button onClick={() => toast.handleEditOpen("edit", toast.itemId)}  className="py-3 px-6 cursor-pointer">Edit Pot</button>
				<button onClick={() => toast.handleEditOpen("delete", toast.itemId)} className="py-3 px-6 text-red-600 cursor-pointer" >Delete Pot</button>
            </div>
        </div>
    )
    
} 