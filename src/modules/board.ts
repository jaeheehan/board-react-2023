import { createReducer } from "typesafe-actions";
import { Board } from "../App";

import { createAction } from "redux-actions";

// 액션타입
const FETCH = "board/FETCH";
const FETCH_SUCCESS = "board/FETCH_SUCCESS";
const FETCH_FAILURE = "board/FETCH_FAILURE";
const FETCH_LIST = "board/FETCH_LIST";
const FETCH_LIST_SUCCESS = "board/FETCH_LIST_SUCCESS";
const FETCH_LIST_FAILURE = "board/FETCH_LIST_FAILURE";

export const fetchStart = createAction(FETCH);
export const fetchSuccess = createAction(FETCH_SUCCESS, (data: string) => data);
export const fetchFailure = createAction(FETCH_FAILURE, (err: any) => err);


export const fetchListStart = createAction(FETCH_LIST);
export const fetchListSuccess = createAction(FETCH_LIST_SUCCESS, (data: string) => data);
export const fetchListFailure = createAction(FETCH_LIST_FAILURE, (err: any) => err);


export interface BoardState {
    loading: { FETCH: boolean, FETCH_LIST: boolean};
    board: Board;
    boards: Board[];
    error: any;
}

const initialState: BoardState = {
    loading: {
        FETCH: false,
        FETCH_LIST: false,
    },
    board: { boardNo: '', title: '', writer: '', content: '', regDate: ''},
    boards: [],
    error: null,
};



const board = createReducer(initialState,
    {
        [FETCH]: (state) => ({
            ...state,
            loading: {
                ...state.loading,
                FETCH: true,
            },
        }),
        [FETCH_SUCCESS]: (state, action) =>({
            ...state,
            loading: {
                ...state.loading,
                FETCH: false
            },
            board: action.payload
        }),
        [FETCH_FAILURE]: (state) => ({
            ...state,
            loading: {
                ...state.loading,
                FETCH: false
            }
        }),
        [FETCH_LIST]: (state) => ({
            ...state,
            loading: {
                ...state.loading,
                FETCH_LIST: true,
            },
        }),
        [FETCH_LIST_SUCCESS]: (state, action) =>({
            ...state,
            loading: {
                ...state.loading,
                FETCH_LIST: false
            },
            board: action.payload
        }),
        [FETCH_LIST_FAILURE]: (state) => ({
            ...state,
            loading: {
                ...state.loading,
                FETCH_LIST: false
            }
        }),
    },
);

export default board;