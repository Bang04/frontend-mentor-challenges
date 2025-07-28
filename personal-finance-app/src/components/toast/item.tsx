import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TOAST_DELAY, removeToast } from "../../store/slices/toastSlice";

export const ToastItem = ({toast} : any) => {
    const dispatch = useDispatch();
    console.log("ToastItem 컴포넌트 호출");

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(removeToast(toast.id));
        }, TOAST_DELAY); // 3초 후 자동 숨김

        return () => {
            clearTimeout(timer);
        };
    }, [toast]);
    
    return(
        <div className="bg-white rounded-lg shadow-lg z-10">
            <div className="flex flex-col">
               <button onClick={() => toast.handleEditOpen("edit", toast.itemId)}  className="py-3 px-6">Edit Pot</button>
				<button onClick={() => toast.handleEditOpen("delete", toast.itemId)} className="py-3 px-6 text-red-600" >Delete Pot</button>
            </div>
        </div>
    )
    
} 