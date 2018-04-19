import React from 'react';
import { Link } from 'react-router-dom';


const ThankYouPage = props => {
	return (
		<div className="ThankYouPage">
			<h1>Thank You</h1>
			<p>
				sed quia non numquam eius modi tempora incidunt
				ut labore et dolore magnam aliquam quaerat
			</p>

			<div className="socials">
			</div>

			<div className="buttons">
				<Link className="button" to="/">Go Back</Link>
			</div>
		</div>
	);
};

export default ThankYouPage;
