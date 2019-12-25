import React from 'react';
import ReactDOM from 'react-dom';
import MainLayout from "./classes/mainLayout";
import axios from "axios";

ReactDOM.render(
    <MainLayout axios={axios} />,
    document.getElementById('root')
);