import { createReducer } from "typesafe-actions";
import { Board } from "../App";

import { createAction } from "redux-actions";

// 액션타입
const FETCH_SUCCESS = "board/FETCH_SUCCESS";
const FETCH_FAILURE = "board/FETCH_FAILURE";

const FETCH_LIST_SUCCESS = "board/FETCH_LIST_SUCCESS";
const FETCH_LIST_FAILURE = "board/FETCH_LIST_FAILURE";
const CHANGE_TITLE = "board/CHANGE_TITLE";
const CHANGE_CONTENT = "board/CHANGE_CONTENT";



export const fetchSuccess = createAction(FETCH_SUCCESS, (data: string) => data);
export const fetchFailure = createAction(FETCH_FAILURE, (err: any) => err);


export const fetchListSuccess = createAction(FETCH_LIST_SUCCESS, (data: string) => data);
export const fetchListFailure = createAction(FETCH_LIST_FAILURE, (err: any) => err);

export const changeTitle = createAction(CHANGE_TITLE, (title: string) => title);
export const changeContent = createAction(CHANGE_CONTENT, (content: string) => content);


export interface BoardState {

    board: Board;
    boards: Board[];
    error: any;
}

const initialState: BoardState = {
    board: { boardNo: '', title: '', writer: '', content: '', regDate: ''},
    boards: [],
    error: null,
};



const board = createReducer(initialState,
    {
        [FETCH_SUCCESS]: (state, action) =>({
            ...state,
            board: action.payload
        }),
        [FETCH_FAILURE]: (state) => ({
            ...state,
        }),
        [FETCH_LIST_SUCCESS]: (state, action) =>({
            ...state,
            boards: action.payload
        }),
        [FETCH_LIST_FAILURE]: (state) => ({
            ...state,
        }),
        [CHANGE_TITLE]: (state, {payload: title}) => ({
            ...state,
            board: {
                ...state.board,
                title,
            },
        }),
        [CHANGE_CONTENT]: (state, {payload: content}) => ({
            ...state,
            board: {
                ...state.board,
                content,
            },
        }),
    },
);

export default board;