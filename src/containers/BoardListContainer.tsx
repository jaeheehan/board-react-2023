import React, { useState, useEffect } from "react";
import BoardList from "../components/BoardList";
import * as client from "../lib/api"
import { Board } from "../App"

const BoardListContainer = () => {

    const [boards, setBoards] = useState<Board[]>([]);
    const [isLoading, setLoading] = useState(false);

    const listBoard = async () => {
        setLoading(true);
        try{
            const response = await client.fetchBoardList();

            setBoards(response.data);
            setLoading(false);
        }catch (e){
            setLoading(false);
            throw e;
        }
    }

    useEffect(()=>{
        listBoard();
    }, [])

    return <BoardList boards={boards} isLoading={isLoading}/>;
};

export default BoardListContainer;