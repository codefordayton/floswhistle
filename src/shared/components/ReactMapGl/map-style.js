import {fromJS} from 'immutable';
import MAP_STYLE from './map-style.json';

function interpColors(numColors) {
  let stops = [];
  for (let i=numColors; i>0; i--) {
    let c = (Math.round((numColors/255) * i * 255)).toString(16);
    stops.push([numColors-i,'#'+c+c+(c.length===2?'ff':'f')])
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
      stops: interpColors(10)
    },
    'fill-opacity': 0.8
  }
});

export const defaultMapStyle = fromJS(MAP_STYLE);
