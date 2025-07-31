import { ToastItem } from "./item";

export const ToastContainer = ({ toasts, removeToast } : any) => {
	return(
		<>
			{toasts && toasts.map((toast: any) => (
				<ToastItem key={toast.id} toast = {toast} onClose= {()=> removeToast(toast.id)} />
			))}
		</>
	)
}

