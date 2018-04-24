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
				<a href="https://www.facebook.com/flo.nightingale.3344"><i className="fa fa-facebook-f"></i></a>
				<a href="https://twitter.com/F_NightingaleRN"><i className="fa fa-twitter"></i></a>
			</div>

			<div className="buttons">
				<Link className="button" to="/">Go Back</Link>
			</div>
		</div>
	);
};

export default ThankYouPage;
