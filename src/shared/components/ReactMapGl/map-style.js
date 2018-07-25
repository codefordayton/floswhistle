import {fromJS} from 'immutable';
import MAP_STYLE from './map-style.json';

//ff ff ff
function interpolateColors(shadesOfBlue) {
  let stops = [];
  //e.g. for shadesOfBlue = 10...
  for (let i=shadesOfBlue; i>0; i--) {
    //we have 1, 0.9, 0.8, 0.7...
    let colorStepRatio = i/shadesOfBlue;
    if(i===shadesOfBlue) {
      console.assert(colorStepRatio === 1);
    }
    let gradient = Math.round(colorStepRatio * 255);
    //not in love with this but
    let colorHex = gradient.toString(16);
    let colorHexValue='#'+colorHex+colorHex+(colorHex.length===2?'ff':'f');
    stops.push([shadesOfBlue-i,colorHexValue])
  }
  return stops
}

// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const dataLayer = fromJS({
  id: 'data',
  source: 'floswhistle',
  type: 'fill',
  interactive: true,
  paint: {
    'fill-color': {
      property: 'percentile',
      stops: interpolateColors(10)
    },
    'fill-opacity': 0.8
  }
});

export const defaultMapStyle = fromJS(MAP_STYLE);
