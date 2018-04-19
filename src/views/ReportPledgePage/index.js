import React from 'react';
import { Link } from 'react-router-dom';


const ReportPledgePage = props => {
	return (
		<div className="ReportPledgePage">

			<p>
				This is a pledge-common practice online in
				the medical field. It's a form where the user
				swears that they are a currently working
				professional caregiver and were on duty at the
				facility at the time of the incident they are
				about to report.
			</p>

			<div className="agreement-button">
				<Link className="button" to="/report">I Agree</Link>
			</div>

		</div>
	);
};

export default ReportPledgePage;
