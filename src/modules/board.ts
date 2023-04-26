import { createReducer } from "typesafe-actions";
import { Board } from "../App";

import { createAction } from "redux-actions";

// 액션타입
const FETCH = "board/FETCH";
const FETCH_SUCCESS = "board/FETCH_SUCCESS";
const FETCH_FAILURE = "board/FETCH_FAILURE";

export const fetchStart = createAction(FETCH);
export const fetchSuccess = createAction(FETCH_SUCCESS, (data: string) => data);
export const fetchFailure = createAction(FETCH_FAILURE, (err: any) => err);


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
    },
);

export default board;