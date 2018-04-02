import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';

const Root = (props) => (
  <BrowserRouter>
    {props.children}
  </BrowserRouter>
);

export default Root;
