import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import rawData from "../json/data.json";

export const menuObject = {
    home: "movies or TV series",
    movie: "movies",
    tvseries: "TV series",
    bookmark: "Bookmarked shows"
} as any;

interface Thumbnail {
    trending: {
      small: string;
      large: string;
    };
    regular: {
      small: string;
      medium: string;
      large: string;
    };
}

interface item {
    id :  string;
    title: string;
    thumbnail: Thumbnail;
    year: number;
    category: string;
    rating: string;
    isBookmarked: boolean;
    isTrending: boolean;
}

const itemsReducer = createSlice({
    name: 'itemsReducer',
    initialState: rawData.map((item:any, index:number) => ({...item, id: index})),
    reducers: {
        toggle : (state, action:PayloadAction<item>) => {
            const selectedItem = state.find((item)=>item.id==action.payload.id);
            selectedItem.isBookmarked = !selectedItem.isBookmarked;
        },
    },
});

const searchReducer = createSlice({
    name: "searchReducer",
    initialState: "",
    reducers: {
        getWords: (state: string) => {
            return state;
        },
        setWords: (_state: string, action: PayloadAction<string>) => {
            return action.payload;      
        }
    }
});

const menuReducer = createSlice({
    name: "menuReducer",
    initialState: "home",
    reducers: {
        curr: (_state:any, _action: PayloadAction<string>) => {
            return _action.payload;
        }
    }
});

const store = configureStore({
    reducer: {
        searchReducer: searchReducer.reducer,
        itemsReducer : itemsReducer.reducer,
        menuReducer: menuReducer.reducer
    }
});

export const { toggle } = itemsReducer.actions;
export const { getWords, setWords } = searchReducer.actions;
export const { curr } = menuReducer.actions;

export default store;