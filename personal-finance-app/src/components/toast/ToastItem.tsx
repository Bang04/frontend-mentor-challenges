export const ToastItem = ({toast, onClose} : any) => {
    return(
        <div>
            {toast.message}
            <button onClick={onClose}>❌</button>
        </div>
    )
    
} 