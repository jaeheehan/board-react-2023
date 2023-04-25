import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import BoardModifyForm from "../components/BoardModifyForm";
import * as client from "../lib/api";
import { RouteComponentProps } from "react-router-dom";
import { Board } from "../App";

interface MatchParams {
    boardNo: string;
}

const BoardModifyContainer = ({ match, history}: RouteComponentProps<MatchParams>)=> {

    const { boardNo } = match.params;

    const [board, setBoard] = useState<Board>();
    const [isLoading, setLoading] = useState(false);

    const onModify = async (boardNo: string, title: string, content: string) => {
        try{
            await client.modifyBoard(boardNo, title, content);

            alert('수정되었습니다.');

            history.push("/read/" + boardNo);
        }catch (e) {
            console.log(e);
        }
    }

    const readBoard = async (boardNo: string) => {
        setLoading(true);
        try{
            const response = await client.fetchBoard(boardNo);

            setBoard(response.data);

            setLoading(false);
        }catch (e) {
            throw e;
        }
    };

    useEffect(()=> {
        readBoard(boardNo);
    }, [boardNo]);

    return <BoardModifyForm
        board={board}
        isLoading={isLoading}
        onModify={onModify}
    />
}

export default withRouter(BoardModifyContainer);