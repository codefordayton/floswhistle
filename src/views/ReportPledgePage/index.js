import React from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';


class ReportPledgePage extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			TypeOptions: [
				{ value: 'RN', label: 'RN' },
				{ value: 'LPN', label: 'LPN' },
				{ value: 'CPCT/CNA', label: 'CPCT/CNA'}
			],
			typeSelection: 'RN'
		};

		this.onTypeChange = this.onTypeChange.bind(this);
	}

	onTypeChange(newType) {
		this.setState({typeSelection: newType});
		console.log('NewType: ' + newType);
	}

	render() {
		return (
			<div className="ReportPledgePage">
				<label>I am a: </label>
				<Select
					onChange={this.onTypeChange}
					options={this.state.TypeOptions}
					simpleValue
					clearable={false}
					searchable={false}
					value={this.state.typeSelection}
				/>
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
	}
};

export default ReportPledgePage;
