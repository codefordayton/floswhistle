import React from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import Storage from '../../Storage';


const TYPE_OPTIONS = [
    { value: 'rn', label: 'RN' },
    { value: 'lpn', label: 'LPN' },
    { value: 'cna', label: 'CPCT/CNA'}
];

class ReportPledgePage extends React.Component {

	constructor(props, context) {
		super(props, context);

        let saved = Storage.getSavedValues();

		this.state = {
			typeSelection: saved.reporter_type
		};

		this.onTypeChange = this.onTypeChange.bind(this);
	}

	onTypeChange(newType) {
		this.setState({typeSelection: newType});
		Storage.updateValue('reporter_type', newType);
	}

	render() {
		return (
			<div className="ReportPledgePage">
				<label>I am a: </label>
				<Select
					onChange={this.onTypeChange}
					options={TYPE_OPTIONS}
					simpleValue
					clearable={false}
					searchable={false}
					value={this.state.typeSelection}
				/>
				<p>
					By agreeing to this statement and submitting
					information to Flo’s Whistle, I swear that I am a
					state licensed/certified care provider as indicated
					above. I am currently employed in the facility
					where this instance occurred and was present for
					the period of time I am reporting. In my professional
					opinion, a lack of appropriate staff created unacceptably
					dangerous conditions for the patients.
				</p>

				<div className="agreement-button">
					<Link className="button" to="/report">I Agree</Link>
				</div>

			</div>
		);
	}
};

export default ReportPledgePage;
