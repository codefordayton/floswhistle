import React from 'react';
import { Link } from 'react-router-dom';


const ActionButton = props => {
	return (
		<div className="ActionButton">
            <p>
                Take action...
            </p>
            <Link className="button" to="/pledge">
                Flag a Dangerous Instance
            </Link>
		</div>
	);
};

export default ActionButton;
