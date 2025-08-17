import { get, getDatabase, ref, remove, serverTimestamp, set } from "firebase/database";
import { rtdb } from "../../App";
import { useAppDispatch } from "..";
import { list } from "../slices/postSlice";



export const getApiOneTime = async (name: string) => {
    const snap = await get(ref(rtdb, name));

    const val = snap.val();

    return (val && typeof val === "object") ? val as Record<string,any> : {};
}


export const createById = async (path: string, id: number, data: any) => {
    await set(ref(rtdb, `${path}/${id}`), { ...data, createdAt: serverTimestamp() });
}

export const updateById = async (path: string, id: number, data:any) => {
    await set(ref(rtdb, `${path}/${id}`), { ...data, updatedAt: serverTimestamp() });
}

export const deleteById = async(path: string, id: number) => {
    await remove(ref(rtdb, `${path}/${id}`));
}

export const initData = () => {
    const dispatch = useAppDispatch();

    getApiOneTime("/")
    .then((data)=> {
        dispatch(list(data));
    }).catch((err)=> {
        console.log(err);
        dispatch(list({}));
    });

    console.log("=====init=====")

};
