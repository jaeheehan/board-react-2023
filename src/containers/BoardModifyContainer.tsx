import React, { useState, useEffect, useCallback } from "react";
import BoardModifyForm from "../components/BoardModifyForm";
import * as client from "../lib/api";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Board } from "../App";
import { modifyBoardApi, fetchBoardApi } from "../lib/api";

import {
    changeTitle,
    changeContent,
    fetchStart,
    fetchSuccess,
    fetchFailure
} from "../modules/board";

import { BoardState } from "../modules/board";
import {useDispatch, useSelector} from "react-redux";

interface MatchParams {
    boardNo: string;
}

const BoardModifyContainer = ({ match, history}: RouteComponentProps<MatchParams>)=> {

    const { boardNo } = match.params;

    const dispatch = useDispatch();

    const { board, isLoading } = useSelector((state: BoardState)=>({
        board: state.board,
        isLoading: state.loading.FETCH
    }))

    const readBoard = useCallback(async (boardNo: string) => {
        dispatch(fetchStart())
        try{
            const response = await fetchBoardApi(boardNo);

            dispatch(fetchSuccess(response.data))
        }catch (e) {
            dispatch(fetchFailure(e));
            throw e;
        }
    }, [dispatch]);

    const onModify = async (boardNo: string, title: string, content: string) => {
        try{
            await modifyBoardApi(boardNo, title, content);

            alert('수정되었습니다.');

            history.push("/read/" + boardNo);
        }catch (e) {
            console.log(e);
        }
    }

    const onChangeTitle = useCallback(
        (title) => {
            return dispatch(changeTitle(title));
        },
        [dispatch]
    )

    const onChangeContent = useCallback(
        (content)=>{
            return dispatch(changeContent(content))
        }, [dispatch]
    )

    useEffect(()=> {
        readBoard(boardNo);
    }, [boardNo, readBoard]);

    return <BoardModifyForm
        board={board}
        isLoading={isLoading}
        onChangeTitle={onChangeTitle}
        onChangeContent={onChangeContent}
        onModify={onModify}
    />
}

export default withRouter(BoardModifyContainer);