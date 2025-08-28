import { createSlice } from "@reduxjs/toolkit";
import { Transaction } from "./types";


const filterSlice = createSlice({
    name: 'filter',
    initialState: {data: [] as Transaction[], filteredData: [] as Transaction[], filterKeyword: {}},
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
            state.filteredData = action.payload;
            //return state;
        },
        getFilteredData: (state) => {
            state.data = state.filteredData;
        },
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
                state.filteredData = state.filteredData.filter((value, index)=> value.name.indexOf(action.payload) > -1);

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
             const sortData = state.filteredData?.length === 0
            ? [...state.data]
            : [...state.filteredData];

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

export const { setData, getFilteredData, getKeyword, setKeyword, setFilter, filteredByCategory, filteredByKeyword, setSortOption, sortByOptions } = filterSlice.actions;
export default filterSlice.reducer;