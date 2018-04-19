import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import Root from './Root';

import HomePage from './views/HomePage/';
import ReportPledgePage from './views/ReportPledgePage';
import ReportFormPage from './views/ReportFormPage';
import ThankYouPage from './views/ThankYouPage/';
import MapPage from './views/MapPage';


const App = () => (
    <Root>
        <Fragment>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/pledge" component={ReportPledgePage} />
            <Route exact path="/report" component={ReportFormPage} />
            <Route exact path="/thank-you" component={ThankYouPage} />
            <Route exact path="/map" component={MapPage} />
        </Fragment>
    </Root>
);

export default App;
