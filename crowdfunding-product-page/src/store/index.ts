import {  PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';
import pledgeData from "../json/pledge-data_.json";
import backerData from "../json/backer-data.json";
import { stat } from 'fs';

// 기부 
interface Pledge {
    id: string;           // 약정의 고유 ID
    title: string;         // 약정 이름 
    amount: number;       // 약정 금액 (예: 50,000원)
    content: string;  // 약정에 대한 설명
    left : number; // 약정 유효 일수 (기부 가능한 기간)
    miniprice : number; // 최소기부액
  }

//후원자
export interface Backer {
    id: string;           // 후원자의 고유 ID
    pledgeId: string;     // 선택한 약정의 ID
    amount: number;       // 후원 금액
}

//후원 총목록
interface Progress {
    targetAmount: number;  // 목표 금액
    currentAmount: number; // 현재 후원 금액
    backersCount: number;  // 후원자 수
    percentage: number; // 목표 달성 비율 (currentAmount / targetAmount * 100)
    endDays : number; // 목표 남을 일자 
}

const initialState : { pledges : Pledge [], backers : Backer [], progress : Progress } = {
    pledges: pledgeData,
    backers: backerData,
    progress: {
        targetAmount : 0,
        currentAmount : 0,
        backersCount : 0,
        percentage : 0,
        endDays : 0,
    }
}

const crowdReducer = createSlice({
    name : 'crowdReducer',
    initialState,
    reducers: {
        update(state){                      
            const targetAmount = state.pledges.reduce((acc:number, pledge) => acc + Number(pledge.amount), 0); 
            const currentAmount = state.backers.reduce((acc:number, backer) => acc + Number(backer.amount), 0); 
            const backersCount = state.backers.length;
            const percentage = (currentAmount / targetAmount)* 100;

            state.progress = {
                targetAmount,
                currentAmount: currentAmount,
                backersCount: backersCount,
                percentage,
                endDays: 56, 
            }
        },
        add(state:{ pledges:Pledge[], backers: Backer[], progress:Progress}, action: PayloadAction<Backer>){
            state.backers.push(action.payload);
        }
    }
});

const bookmarkReducer = createSlice({
    name : "bookmarkReducer",
    initialState: false,
    reducers : {
        toggle : (state : boolean ) => {
            return !state;
        }
    }
});


// const pledgeReducer = createSlice({
//     name: "pledgeReducer",
//     initialState: 0,
//     reducers: {
//         add: (state: number, action: PayloadAction<number>) => {
//             state = action.payload;
//             return state;
//         }
//     }
// });

const store = configureStore({
    reducer : {
        bookmarkReducer : bookmarkReducer.reducer,
        crowdReducer : crowdReducer.reducer,
    },
});

export const { toggle } = bookmarkReducer.actions;
export const { update, add } = crowdReducer.actions;

export default store;