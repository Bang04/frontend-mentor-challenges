import { dbState } from "../firebase/subscribe";


export const selectAll = () => (s: {postReducer: dbState}) => s.postReducer.byPath;

export  const selectByPath = (path: string) => (s: {postReducer: dbState}) => s.postReducer.byPath[path];

