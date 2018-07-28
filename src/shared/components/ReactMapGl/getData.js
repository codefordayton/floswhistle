import getPropertiesFromStates from 'shared/utils/getPropertiesFromStates';

const getData = ({ geojson, states, metadata, getPercentile, defaultValue = 0 }) => {
  geojson.features = geojson.features.map(feature => {
    const stateNum = feature.properties.STATE;
    // state with only one district has no NAME property
    // 00 indicates only one district exists in a state in above states variable
    const districtNum = feature.properties.NAME === "" ? 0 : feature.properties.NAME;
    const properties = getPropertiesFromStates(states, stateNum, districtNum);

    const percentile = properties ? getPercentile(properties, metadata) : defaultValue;

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

export default getData;
