import React from 'react';
import { Link } from 'react-router-dom';


const ActionButton = props => {
	return (
		<div className="ActionButton">
            <p>
                Take action...
            </p>
			<p>
				Only
				<strong> professionally licensed / state certified </strong>
				direct nursing care providers,
				<strong> currently working </strong>
				in that capacity
				<strong> in a hospital, nursing home, or LTCH </strong>
				are eligible to participate in this project.
			</p>
            <Link className="button" to="/pledge">
                Nurses Only: Report an Instance
            </Link>
		</div>
	);
};

export default ActionButton;
