import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';

class ReactMapGl extends Component {

  state = {
    viewport: {
      width: 600,
      height: 400,
      latitude: 38,
      longitude: -99,
      zoom: 3,
    }
  };

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
      />
    );
  }
}

export default ReactMapGl;
