// 실제 렌더링되는 UI 컨테이너 (화면에 표시됨)	
// JSX로 토스트 메시지 리스트 렌더링
//  포지션 스타일 등
import { ToastItem } from "./item";

export const ToastContainer = ({ toasts, removeToast } : any) => {
	return(
		<div className="absolute bottom-0 right-0">
			<div className="flex flex-col">
				{toasts && toasts.map((toast: any) => (
					<ToastItem key={toast.id} toast = {toast} onClose= {()=> removeToast(toast.id)} />
				))}
			</div>
		</div>
	)
}

