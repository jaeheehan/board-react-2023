import React from "react";
import BoardRegisterForm from "../components/BoardRegisterForm";
import { withRouter, RouteComponentProps } from "react-router-dom";
import * as client from "../lib/api"

const BoardRegisterContainer = ({history}: RouteComponentProps) => {

    const onRegister = async (title: string, content: string, writer: string) => {
        try{
            const response = await client.registerBoard(title, content, writer);

            alert('등록되었습니다.');

            history.push('/read/' + response.data.boardNo)

        }catch (e) {
            console.log(e);
        }
    };

    return <BoardRegisterForm onRegister={onRegister}/>
}

export default withRouter(BoardRegisterContainer);