class MainForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleReport = this.handleReport.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleReport(event) {
    alert('Your zip code: ' + this.state.value);
    event.preventDefault();
  }

render() {
  return (
		<div className="main-container">
			<div className="main-title">
		    Flo's Whistle
		  </div>
			
		  <div className="sub-container">
			  <div className="sub-heading">
				  What to report?
			  </div>
			  <div className="sub-heading">
				  Disclaimer: No personal information stored.
			  </div>
			</div>
			
		  <div className="row">
			  <div className="zip-heading">
				  Zip Code:
				</div> 

				<input className="zip-text" type="text" value={this.state.value} onChange={this.handleChange} />

			</div>
			
		  <div className="row">
				<div id="reportButton" onClick = {this.handleReport}>
					Report
				</div>
			</div>
		</div>
    );
  }
}

ReactDOM.render(
  <MainForm />,
  document.getElementById('root')
);