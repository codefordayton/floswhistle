import { fromJS } from 'immutable';
import { defaultMapStyle, dataLayer } from './map-style';

const generateMapStyle = data => {
  const mapStyle = defaultMapStyle
  // Add geojson source to map
    .setIn(['sources', 'floswhistle'], fromJS({ type: 'geojson', data }))
  // Add point layer to map
    .set('layers', defaultMapStyle.get('layers').push(dataLayer));

  return mapStyle;
};

export default generateMapStyle;
