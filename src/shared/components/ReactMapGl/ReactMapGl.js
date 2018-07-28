import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';

// shared
import geojson from 'shared/maps/geo.json';
import fetchData from 'shared/utils/fetchData';

// local
import { defaultMapStyle } from './map-style';
import generateMapStyle from './generateMapStyle';
import getData from './getData';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoia3loeWNvIiwiYSI6ImNqZmFjNTB3NzJpb2EyeHA0dmtlM2lyc3AifQ.kpFhZDngym9schJW_E9gBg'; // Set your mapbox token here

class ReactMapGl extends Component {
  state = {
    mapStyle: defaultMapStyle,
    viewport: {
      width: 600,
      height: 400,
      latitude: 38,
      longitude: -99,
      bearing: 0,
      pitch: 0,
      zoom: 3,
    }
  };

  _loadData = () => {
    fetchData(({ states, min_count, max_count }) => {
      // Adjust getPercentile to determine what percentage you want
      function getPercentile({
        facility_type: { extended_care, hospital, long_term_care, },
        type: { cna, lpn, other, rn, total }},
        metadata
      ) {
        return total / metadata.maxCount * 100;
      }
      let metadata = { minCount: min_count, maxCount: max_count };
      const data = getData({
        geojson,
        states,
        metadata,
        getPercentile,
        defaultValue: 0,
      });

      const mapStyle = generateMapStyle(data);

      this.setState({ mapStyle });
    });
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight
      }
    });
  };

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapStyle={this.state.mapStyle}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onLoad={this._loadData}
        onViewportChange={(viewport) => this.setState({viewport})}
      />
    );
  }
}

export default ReactMapGl;
