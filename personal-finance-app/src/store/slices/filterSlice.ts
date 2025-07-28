import { createSlice } from "@reduxjs/toolkit";
import { Transaction, initialDataState } from "./types";


const filterSlice = createSlice({
    name: 'filter',
    initialState: {data: initialDataState.transactions, filteredData: [] as Transaction[], filterKeyword: {}},
    reducers: {
        getKeyword: (state:any) =>  {
            return state
        },
        setKeyword: (state, action) =>  {
            state.filterKeyword = action.payload;
        }
        ,setFilter(state, action) {
            const keyword = action.payload.toLowerCase();
            state.data =  state.data.filter((transaction:any) => transaction.name.toLowerCase().includes(keyword));
        },
        filteredByKeyword: (state, action) => {
            if(action.payload=="")
                state.filteredData = state.data;
            else
                state.filteredData = state.data.filter((value, index)=> value.name.indexOf(action.payload) > -1);

            return state;
        },
        filteredByCategory: (state, action) => {
            if(action.payload=="")
                state.filteredData = state.data;
            else
                state.filteredData = state.data.filter((value, index)=> value.category == action.payload);

            return state;
        },
        setSortOption(state, action) {
            state.filterKeyword = action.payload;
        },
        sortByOptions : (state, action) => {
            const sortData = [...state.filteredData] ?? [...state.data];

            switch(action.payload){
                case 'Latest':
                    sortData.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                    break;
                case 'Oldest':
                    sortData.sort((a,b) => new Date(a.date).getTime() -new Date(b.date).getTime());
                    break;
                case 'AtoZ':
                    sortData.sort((a,b) => a.name.localeCompare(b.name));
                    break;
                case 'ZtoA':
                    sortData.sort((a,b) => b.name.localeCompare(a.name));
                    break;
                case 'Highest':
                    sortData.sort((a,b)=> b.amount - a.amount);
                    break;
                case 'Lowest':
                    sortData.sort((a,b) => a.amount - b.amount);
                    break;
                default :
                    break;
            }
            
            state.filteredData = sortData;
        }
    }
});

export const { getKeyword, setKeyword, setFilter, filteredByCategory, filteredByKeyword, setSortOption, sortByOptions } = filterSlice.actions;
export default filterSlice.reducer;