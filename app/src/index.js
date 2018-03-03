import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
//import registerServiceWorker from './registerServiceWorker';

import HomePage from './HomePage';


class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <span>
                    <Route exact path='/' component={HomePage}/>
                </span>
            </BrowserRouter>
        );
    }
};

ReactDOM.render(<App />, document.getElementById('app'));
//registerServiceWorker();
