// 실제 렌더링되는 UI 컨테이너 (화면에 표시됨)	
// JSX로 토스트 메시지 리스트 렌더링
//  포지션 스타일 등
import { useState, useEffect } from "react"
import { ToastProvider } from "./ToastProvider";

import { ToastItem } from "./ToastItem";

export const ToastContainer = ({ toasts, removeToast } : any) => {

	return(

		<div className="absolute z-50 flex items-center bg-opacity-100 shadow-md" style={{ top: 0 , left: 0 }}>
			{toasts && toasts.map((toast: { id: number; message : string; }) => {
				<ToastItem toast = {toast} onClose= {()=> removeToast(toast.id)}/>
			})}
		</div>
		
	)
}

