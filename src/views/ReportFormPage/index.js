import React from 'react';
import Select from 'react-select';
import moment from 'moment';
import getTimeStops from 'shared/utils/getTimeStops';

import Storage from '../../Storage';


const API_ENDPOINT = 'https://api.floswhistle.com/v1/whistle';

const FACILITY_TYPE_OPTIONS = [
  { value: 'hospital', label: 'Hospital' },
  { value: 'long_term_care', label: 'Nursing Home/LTAC/LTCH'}
];

const timestops = getTimeStops('00:00', '24:00');

const SHIFT_OPTIONS = timestops.map(t => ({ value: t, label: t }));
const getDate = (date, time) => moment(`${date}T${time}`, 'MM/DD/YYYY HH:mm').unix();

const formatBody = ({
  start_date, start_time, end_date, end_time, ...rest
}) => ({
  ...rest,
  start_date: getDate(start_date, start_time),
  end_date: getDate(end_date, end_time),
});

class ReportFormPage extends React.Component {
  constructor(props) {
    super(props);

    let today = moment().format('MM/DD/YYYY');
    let saved = Storage.getSavedValues();
    this.state = {
      reporter_type: saved.reporter_type,
      facility_type: saved.facility_type,
      start_date: today,
      end_date: today,
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

    const body = formatBody(this.state);

    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body,
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
            <div>
              <input type="text"
                className="textInput"
                name="zip"
                value={this.state.zip}
                onChange={(evt) => {
                  this.handleChange('zip', evt.target.value);
                }} />
            </div>
          </fieldset>

          <fieldset>
            <label htmlFor="start_date">Start Date:</label>
            <Select
              onChange={(newVal) => {
                this.handleChange('start_date', newVal);
              }}
              options={dateOptions}
              simpleValue
              clearable={false}
              searchable={false}
              value={this.state.start_date} />
          </fieldset>
          <fieldset>
            <label htmlFor="start_time">Start Time:</label>
            <Select
              onChange={(newVal) => {
                this.handleChange('start_time', newVal);
              }}
              options={SHIFT_OPTIONS}
              simpleValue
              clearable={false}
              searchable={false}
              value={this.state['start_time']} />
          </fieldset>

          <fieldset>
            <label htmlFor="end_date">End Date:</label>
            <Select
              onChange={(newVal) => {
                this.handleChange('end_date', newVal);
              }}
              options={dateOptions}
              simpleValue
              clearable={false}
              searchable={false}
              value={this.state.end_date} />
          </fieldset>
          <fieldset>
            <label htmlFor="end_time">End Time:</label>
            <div className="select-up">
              <Select
                onChange={(newVal) => {
                  this.handleChange('end_time', newVal);
                }}
                options={SHIFT_OPTIONS}
                simpleValue
                clearable={false}
                searchable={false}
                value={this.state['end_time']} />
            </div>
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
