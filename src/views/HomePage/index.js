import React from 'react';
import { Link } from 'react-router-dom';

import ActionButton from '../ActionButton';


const HomePage = props => {
	return (
		<div className="HomePage">
			<div className="Hero">
				<Link className="HeroButton" to="/map">See Stats</Link>
			</div>

			<div className="content">
				<p>
					A short statement that explains why
					Flo's Whistle was created, consectetur,
					adipisci velit, sed quia non numquam
					eius modi tempora incidunt ut labore et
					dolore magnam aliquam quaerat
					voluptatem.
				</p>
			</div>

			<ActionButton />

		</div>
	);
};

export default HomePage;
