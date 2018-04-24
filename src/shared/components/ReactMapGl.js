import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';
import { fromJS } from 'immutable';

// shared
import geojson from 'shared/maps/geo.json';
import getPropertiesFromStates from 'shared/utils/getPropertiesFromStates';
import fetchData from 'shared/utils/fetchData';

// local
import { defaultMapStyle, dataLayer } from './map-style';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoia3loeWNvIiwiYSI6ImNqZmFjNTB3NzJpb2EyeHA0dmtlM2lyc3AifQ.kpFhZDngym9schJW_E9gBg'; // Set your mapbox token here

const generateMapStyle = data => {
  const mapStyle = defaultMapStyle
  // Add geojson source to map
    .setIn(['sources', 'floswhistle'], fromJS({ type: 'geojson', data }))
  // Add point layer to map
    .set('layers', defaultMapStyle.get('layers').push(dataLayer));

  return mapStyle;
};

const getData = ({ geojson, states, getPercentile, defaultValue = 0 }) => {
  geojson.features = geojson.features.map(feature => {
    const stateNum = feature.properties.STATE;
    // state with only one district has no NAME property
    // 00 indicates only one district exists in a state in above states variable
    const districtNum = feature.properties.NAME === "" ? 0 : feature.properties.NAME;
    const properties = getPropertiesFromStates(states, stateNum, districtNum);

    const percentile = properties ? getPercentile(properties) : defaultValue;

    return {
      ...feature,
      properties: {
        ...feature.properties,
        percentile,
        // uncomment line below to use random data
        // instead of real data
        // percentile: Math.random(),
      }
    };
  });

  return geojson;
};

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
    fetchData(({ states }) => {
      // Adjust getPercentile to determine what percentage you want
      function getPercentile({
        facility_type: { extended_care, hospital, long_term_care, },
        shift: { day, mid, night, },
        type: { cna, lpn, other, rn, total },
      }) {
        return Math.floor(Math.random() * 100);
      }

      const data = getData({
        geojson,
        states,
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
