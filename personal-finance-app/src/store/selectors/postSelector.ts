import { dbState } from "../firebase/subscribe";


export const selectAll = () => (state: {postReducer: dbState}) => state.postReducer.byPath;

export  const selectByPath = (path: string) => (s: {postReducer: dbState}) => s.postReducer.byPath[path];

