import React, { Component } from 'react';
import ReactMapGL, { Popup } from 'react-map-gl';

import DistrictInfo from '../DistrictInfo/DistrictInfo';

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
    },
    popupInfo: null
  };

  _loadData = () => {
    fetchData(({ states }) => {
      // Adjust getPercentile to determine what percentage you want
      function getPercentile({
        facility_type: { extended_care, hospital, long_term_care, },
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

  _renderPopup() {

    const {popupInfo, latitude, longitude} = this.state;
    
    return popupInfo && (
      <Popup tipSize={5}
        anchor="top"
        latitude={latitude}
        longitude={longitude}
        captureClick={true}
        onClose={() => this.setState({popupInfo: null})} >
        <DistrictInfo info={popupInfo} />
      </Popup>
    );
  }

  _onClick = event => {
    const {features} = event;
    const popupInfo = features && features.find(f => f.layer.id === 'data');
    this.setState({popupInfo,
                   latitude: event.lngLat[1],
                   longitude: event.lngLat[0]});
  };

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapStyle={this.state.mapStyle}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onLoad={this._loadData}
        onClick={this._onClick}
        onViewportChange={(viewport) => this.setState({viewport})}>

        {this._renderPopup()}

      </ReactMapGL>      
    );
  }
}

export default ReactMapGl;
