import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const Root = (props) => (
  <BrowserRouter>
    {props.children}
  </BrowserRouter>
);

export default Root;
