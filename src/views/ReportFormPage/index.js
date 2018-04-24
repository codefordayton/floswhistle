import React from 'react';
import Select from 'react-select';
import moment from 'moment';

import Storage from '../../Storage';


const API_ENDPOINT = 'https://api.floswhistle.com/v1/whistle';

const FACILITY_TYPE_OPTIONS = [
	{ value: 'hospital', label: 'Hospital' },
	{ value: 'long_term_care', label: 'Nursing Home/LTAC/LTCH'}
];

const SHIFT_OPTIONS = [
	{ value: 'day', label: 'Day' },
	{ value: 'night', label: 'Night' }
]

class ReportFormPage extends React.Component {
	constructor(props) {
		super(props);

		let today = moment().format('MM/DD/YYYY');
		let saved = Storage.getSavedValues();
		this.state = {
			reporter_type: saved.reporter_type,
			facility_type: saved.facility_type,
			report_date: today,
			'shift': saved['shift'],
			zip: saved.zip
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleReport = this.handleReport.bind(this);
	}

	handleChange(property, value) {
		let changes = {};
		changes[property] = value;
		this.setState(changes);
		Storage.updateValue(property, value);
	}

	handleReport(event) {
		event.preventDefault();
		console.log('Submitting form with values: ' + JSON.stringify(this.state));
		fetch(API_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state)
		}).then(response => {
			window.location = '/thanks';
		});
	}

	render() {

		let today = moment().format('MM/DD/YYYY');
		let yesterday = moment().subtract(1, 'day').format('MM/DD/YYYY');

		let dateOptions = [
			{value: today, label: today},
			{value: yesterday, label: yesterday}
		];
		//console.log('Date Options: ' + JSON.stringify(dateOptions));

		return (
			<div className="ReportFormPage">

				<p>
				Reports limited to past 24hrs and only 1 report in 24hr
				period. ZIP CODE will be converted to
				CONGRESSIONAL DISTRICT for location display
				purposes.
				</p>

				<form>
					<fieldset>
						<label htmlFor="locationtype">Facility Type:</label>
						<Select
							onChange={(newVal) => {
								this.handleChange('facility_type', newVal);
							}}
							options={FACILITY_TYPE_OPTIONS}
							simpleValue
							clearable={false}
							searchable={false}
							value={this.state.facility_type} />
					</fieldset>

					<fieldset>
						<label htmlFor="zip">Facility Zip Code:</label>
						<input type="text"
							name="zip"
							value={this.state.zip}
							onChange={(evt) => {
								this.handleChange('zip', evt.target.value);
							}} />
					</fieldset>

					<fieldset>
						<label htmlFor="report_date">Day:</label>
						<Select
							onChange={(newVal) => {
								this.handleChange('report_date', newVal);
							}}
							options={dateOptions}
							simpleValue
							clearable={false}
							searchable={false}
							value={this.state.report_date} />
					</fieldset>
					<fieldset>
						<label htmlFor="shift">Shift:</label>
						<Select
							onChange={(newVal) => {
								this.handleChange('shift', newVal);
							}}
							options={SHIFT_OPTIONS}
							simpleValue
							clearable={false}
							searchable={false}
							value={this.state['shift']} />
					</fieldset>
				</form>

				<div className="buttons">
					<a className="button" onClick={this.handleReport}>Submit</a>
				</div>
			</div>
		);
	}
};

export default ReportFormPage;
