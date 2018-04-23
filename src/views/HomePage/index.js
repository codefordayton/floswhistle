import React from 'react';
import { Link } from 'react-router-dom';

import ActionButton from 'shared/ActionButton';


const HomePage = props => {
	return (
		<div className="HomePage">
			<div className="Hero">
				<Link className="HeroButton" to="/map">See Stats</Link>
			</div>

			<div className="content">
				<p>
				Flo’s Whistle is a secure, anonymous platform where direct
				care nurses can log instances  of compromised patient safety
				due to inadequate staffing.  Reports will be aggregated and
				shown on a US map. This year-long, prospective, experimental
				data-collection project will help us all better understand
				the magnitude of staffing-related dangers.
				</p>

				<p>
				We believe that professional nursing care providers who are
				at the bedside, providing direct care, are far more accurate
				judges of patients’ needs than any administrator or consultant
				with spreadsheets and algorithms.
				</p>

				<p>
				America’s nurses are highly educated and rigorously trained
				to give excellent care, but when we’re deprived of the time
				and resources required to deliver that care, too often we
				fail our patients. This is unacceptable.
				</p>

				<p>
				With Flo’s Whistle, we’re following the example of nurse
				Florence Nightingale, a pioneer in the use of statistics and
				visual display of data. Her research revealed patterns in
				causes of death among soldiers in the Crimean war, lighting
				the way for rational policy reforms, and dramatically
				reducing the suffering and loss of life.
				We hope to do the same.
				</p>
			</div>

			<ActionButton />

		</div>
	);
};

export default HomePage;
