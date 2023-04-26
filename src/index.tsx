import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import board from "./modules/board"
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(board, composeWithDevTools());

// @ts-ignore
const myRouter = <BrowserRouter>
    <App />
</BrowserRouter>

ReactDOM.render(
    <Provider store={store}>
        {myRouter}
    </Provider>,
    document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
