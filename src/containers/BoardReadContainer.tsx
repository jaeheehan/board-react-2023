import React, { useState, useEffect } from "react";
import BoardRead from "../components/BoardRead";
import * as client from "../lib/api"
import { RouteComponentProps } from "react-router-dom";
import { Board } from "../App";

interface MatchParams {
    boardNo: string;
}

const BoardReadContainer = ({match}: RouteComponentProps<MatchParams>)=> {

    const { boardNo } = match.params;

    const [board, setBoard] = useState<Board>();
    const [isLoading, setLoading] = useState(false);

    const readBoard = async (boardNo: string) => {
        setLoading(true);
        try{
            const response = await client.fetchBoard(boardNo);

            setBoard(response.data);
            setLoading(false);
        }catch (e) {
            throw e;
        }
    }

    useEffect(()=> {
        readBoard(boardNo);
    }, [boardNo]);

    return <BoardRead
        boardNo={boardNo}
        board={board}
        isLoading={isLoading}
    />
}

export default BoardReadContainer;