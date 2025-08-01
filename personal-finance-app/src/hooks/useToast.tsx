import { useContext } from "react";
import { ToastContext } from "../components/toast/provider";

export const useToast = () => {
    return useContext(ToastContext);
}