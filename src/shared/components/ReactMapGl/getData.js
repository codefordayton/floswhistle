import getPropertiesFromStates from 'shared/utils/getPropertiesFromStates';
import numToAbbr from 'shared/utils/numToAbbr';

const getData = ({ geojson, states, getPercentile, defaultValue = 0 }) => {
  geojson.features = geojson.features.map(feature => {
    const stateNum = feature.properties.STATE;
    // state with only one district has no NAME property
    // 00 indicates only one district exists in a state in above states variable
    const districtNum = feature.properties.NAME === "" ? 0 : feature.properties.NAME;
    const properties = getPropertiesFromStates(states, stateNum, districtNum);
    const abbr = numToAbbr(stateNum);
    const percentile = properties ? getPercentile(properties, metadata) : defaultValue;

    return {
      ...feature,
      properties: {
        ...feature.properties,
        percentile,
        stats: properties,
        stateAbbr: abbr
      }
    };
  });

  return geojson;
};

export default getData;
