import {fromJS} from 'immutable';
import MAP_STYLE from './map-style.json';

// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const dataLayer = fromJS({
  id: 'data',
  source: 'incomeByState',
  type: 'fill',
  interactive: true,
  paint: {
    'fill-color': {
      property: 'percentile',
      stops: [
        [0, '#FFFFFF'],
        [1, '#e6edfb'],
        [2, '#cddbf7'],
        [3, '#b5c9f3'],
        [4, '#9cb7ef'],
        [5, '#84a5eb'],
        [6, '#6b93e7'],
        [7, '#5281e3'],
        [8, '#3a6fdf']
      ]
    },
    'fill-opacity': 0.8
  }
});

export const defaultMapStyle = fromJS(MAP_STYLE);
