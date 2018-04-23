import React from 'react';
import { Link } from 'react-router-dom';


const ThankYouPage = props => {
	return (
		<div className="ThankYouPage">
			<h1>Thank You</h1>
			<p>
				Thank you for contributing to Flo’s Whistle. Please
                share this project with your colleagues.
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
