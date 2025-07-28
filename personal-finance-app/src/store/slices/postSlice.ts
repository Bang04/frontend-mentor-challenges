import { initialDataState } from './types';
import { createSlice } from '@reduxjs/toolkit';

/* 임시로 assets밑에서 데이터 가져오는 클래스 */

const data = createSlice({
    name: 'dataReducer',
    initialState: initialDataState,
    reducers: {
        list: (state:any) => {
            return state;
        },
        add: (state: any, action: any) => {

        },
        modify: (state:any, action) => {

        },
        remove: (state:any, action:any) => {

        }
    }
});


export const { add, modify, remove, list } = data.actions; 
export default data.reducer;