import { createAsyncThunk } from "@reduxjs/toolkit";
import { Unsubscribe, off, onValue, push, ref, remove, update } from "firebase/database";
import { rtdb } from "./config";
import { post } from "../slices/postSlice";
import { set } from "firebase/database";

export type dbState = {
    byPath: Record<string, any>;
    listeners: Record<string, Unsubscribe|null>;
    error: string|null;
    loading: Record<string,any>;
}



export const subscribe =createAsyncThunk<
    { path: string },
    string
>("subscribe", async (path, { dispatch })=> {
    const _ref = ref(rtdb, path);

    //loading
    dispatch(post.actions.fetch({ path, value: undefined }));

    const unSubscribe = onValue(
        _ref,
        (snap) => {
            dispatch(
                post.actions.fetch({
                    path, 
                    value: snap.exists() ? snap.val() : null,
                })
            );
        },
        (e)=> {
            dispatch(post.actions.error(e as any));
            dispatch(post.actions.fetch({ path, value: null }))
        }
    );


    dispatch(post.actions.listener({ path, unSubscribe }));



    return { path };
});


export const unSubscribe = createAsyncThunk<void, string>(
    "unsubscribe",
    async (path, { getState, dispatch }) => {

        const state = getState() as { rtdb: dbState };
        const unsubscribe = state.rtdb.listeners[path];

        if(typeof unsubscribe === "function") {
            off(ref(rtdb, path), "value", unsubscribe as any);
            try {
                (unsubscribe as Unsubscribe)();
            }
            catch {}
        }
        dispatch(post.actions.listener({ path, unSubscribe: null}))
    }  
);


export const setData = createAsyncThunk<void, { path: string; value: any }> (
    "set", async ({ path, value}) => { await set(ref(rtdb, path), value); }
);

export const pushData = createAsyncThunk<string, { path: string; value: any }>(
    "push", async ({ path, value }) => {
        const newRef = push(ref(rtdb, path));
        await set(newRef, value);
        return newRef.key;
    }
);

export const updateData = createAsyncThunk<void, { path: string; partial: any }>(
    "update", 
    async ( { path, partial }) => {
        await update(ref(rtdb, path), partial);
    }
);

export const removeData = createAsyncThunk<void, { path: string }>(
    "remove",
    async ( { path }) => { await remove(ref(rtdb, path)); }
);

