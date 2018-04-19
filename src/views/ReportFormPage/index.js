import React from 'react';


class ReportFormPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleReport = this.handleReport.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleReport(event) {
		event.preventDefault();
		console.log('Your zip code: ' + this.state.value);
		window.location = '/thanks';
	}

	render() {
		return (
			<div className="ReportFormPage">

				<div className="submit-button">
					<form>
						<fieldset>
							<label htmlFor="startdate">Start Date:</label>
							<input type="date" name="startdate"/>
						</fieldset>
						<fieldset>
							<label htmlFor="starttime">Start Time:</label>
							<input type="text" name="starttime"/>
						</fieldset>

						<fieldset>
							<label htmlFor="enddate">End Date:</label>
							<input type="date" name="enddate"/>
						</fieldset>
						<fieldset>
							<label htmlFor="endtime">End Time:</label>
							<input type="text" name="starttime"/>
						</fieldset>

						<fieldset>
							<label htmlFor="locationtype">Type of location:</label>
							<input type="text" name="locationtype"/>
						</fieldset>

						<fieldset>
							<label htmlFor="zipcode">Zip Code:</label>
							<input type="text" name="zipcode"/>
						</fieldset>
					</form>

					<div className="buttons">
						<a className="button" onClick={this.handleReport}>Submit</a>
					</div>

				</div>
			</div>
		);
	}
};

export default ReportFormPage;
