import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardRead from "../components/BoardRead";
import * as client from "../lib/api"
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Board } from "../App";

import {
    fetchStart,
    fetchSuccess,
    fetchFailure
} from "../modules/board";

import { BoardState } from "../modules/board";
import {fetchBoardApi} from "../lib/api";

interface MatchParams {
    boardNo: string;
}

const BoardReadContainer = ({match, history}: RouteComponentProps<MatchParams>)=> {

    const { boardNo } = match.params;

    const dispatch = useDispatch();

    const { board, isLoading } = useSelector((state: BoardState) => ({
        board: state.board,
        isLoading: state.loading.FETCH,
    }))

    const readBoard = useCallback(async (boardNo) => {
        dispatch(fetchStart());
        try {
            const response = await fetchBoardApi(boardNo);
            dispatch(fetchSuccess(response.data))
        }catch (e){
            dispatch(fetchFailure(e));
            throw e;
        }
    }, [dispatch])


    useEffect(()=> {
        readBoard(boardNo);
    }, [boardNo]);

    const onRemove = async () => {
        console.log("boardNo =" + boardNo)

        try{
            await client.removeBoard(boardNo);

            alert('삭제되었습니다.');

            history.push("/");
        }catch (e) {
            console.log(e)
        }
    }

    return <BoardRead
        boardNo={boardNo}
        board={board}
        isLoading={isLoading}
        onRemove={onRemove}
    />
}

export default withRouter(BoardReadContainer);