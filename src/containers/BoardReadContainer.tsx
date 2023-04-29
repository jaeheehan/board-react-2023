import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardRead from "../components/BoardRead";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { removeBoardApi } from "../lib/api";

import {
    fetchSuccess,
    fetchFailure
} from "../modules/board";
import {endLoading, startLoading} from "../modules/loading";

import { RootState } from "../modules";
import {fetchBoardApi} from "../lib/api";

interface MatchParams {
    boardNo: string;
}

const BoardReadContainer = ({match, history}: RouteComponentProps<MatchParams>)=> {

    const { boardNo } = match.params;

    const dispatch = useDispatch();

    const { board, isLoading } = useSelector(({board,loading}: RootState) => ({
        board: board.board,
        isLoading: loading.FETCH,
    }))

    const readBoard = useCallback(async (boardNo) => {
        dispatch(startLoading("FETCH"))
        try {
            const response = await fetchBoardApi(boardNo);
            dispatch(fetchSuccess(response.data))
            dispatch(endLoading("FETCH"))
        }catch (e){
            dispatch(fetchFailure(e));
            dispatch(endLoading("FETCH"))
            throw e;
        }
    }, [dispatch])


    useEffect(()=> {
        readBoard(boardNo);
    }, [boardNo]);

    const onRemove = async () => {
        console.log("boardNo =" + boardNo)

        try{
            await removeBoardApi(boardNo);

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