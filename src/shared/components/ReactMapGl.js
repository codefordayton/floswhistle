import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';
import data from 'shared/maps/geo.json';
import { fromJS } from 'immutable';
import { defaultMapStyle, dataLayer } from './map-style';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoia3loeWNvIiwiYSI6ImNqZmFjNTB3NzJpb2EyeHA0dmtlM2lyc3AifQ.kpFhZDngym9schJW_E9gBg'; // Set your mapbox token here

data.features = data.features.map(feature => ({
  ...feature,
  properties: {
    ...feature.properties,
    percentile: Math.floor(Math.random() * 10),
  }
}))

class ReactMapGl extends Component {

  state = {
    mapStyle: defaultMapStyle,
    data,
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

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _loadData = () => {
    const mapStyle = defaultMapStyle
      // Add geojson source to map
      .setIn(['sources', 'incomeByState'], fromJS({type: 'geojson', data}))
      // Add point layer to map
      .set('layers', defaultMapStyle.get('layers').push(dataLayer));

    console.info('omg loadData', mapStyle.toJS());

    this.setState({data, mapStyle});
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

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapStyle={this.state.mapStyle}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onLoad={() => this._loadData(data)}
        onViewportChange={(viewport) => this.setState({viewport})}
      />
    );
  }
}

export default ReactMapGl;
