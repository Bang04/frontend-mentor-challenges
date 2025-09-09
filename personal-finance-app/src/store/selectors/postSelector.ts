import { createSelector } from "@reduxjs/toolkit";
import { dbState } from "../firebase/subscribe";


export const selectAll = () => (state: {postReducer: dbState}) => state.postReducer.byPath;

export  const selectByPath = (path: string) => (state: {postReducer: dbState}) => state.postReducer.byPath[path];

