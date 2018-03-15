import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
//import registerServiceWorker from './registerServiceWorker';

import HomePage from './views/HomePage/';
import ThankYouPage from './views/ThankYouPage/';
class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<span>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/thank-you" component={ThankYouPage} />
				</span>
			</BrowserRouter>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
//registerServiceWorker();
