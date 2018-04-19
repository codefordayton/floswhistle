import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from 'shared/Header';


const Root = (props) => (
    <div className="page">
        <Header />
        <BrowserRouter>
            {props.children}
        </BrowserRouter>
    </div>
);

export default Root;
