import React from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import map from 'shared/maps/simple-map-topo-example.json';

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}

const popScale = scaleLinear()
  .domain([0, 0.5,1])
  .range(["#CFD8DC","#607D8B","#37474F"]);

const handleClick = evt => {
  console.info('omg handleClick', evt);
}

const ReactSimpleMap = () => (
  <div style={wrapperStyles}>
    <ComposableMap
      projectionConfig={{
        scale: 205,
        rotation: [-11,0,0],
      }}
      width={980}
      height={551}
      style={{
        width: "100%",
        height: "auto",
      }}
    >
      <ZoomableGroup center={[0,20]}>
        <Geographies geography={map}>
          {(geographies, projection) => geographies.map((geography, i) => (
            <Geography
              key={ i }
              geography={ geography }
              projection={ projection }
              onClick={ handleClick }
              style={{
                default: {
                  fill: popScale(Math.random()),
                  stroke: "#607D8B",
                  strokeWidth: 0.75,
                  outline: "none",
                },
                hover: {
                  fill: "#263238",
                  stroke: "#607D8B",
                  strokeWidth: 0.75,
                  outline: "none",
                },
                pressed: {
                  fill: "#263238",
                  stroke: "#607D8B",
                  strokeWidth: 0.75,
                  outline: "none",
                }
              }}
            />
          ))}
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  </div>
);

export default ReactSimpleMap;
