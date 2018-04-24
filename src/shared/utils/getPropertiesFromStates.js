import { get } from 'lodash/fp';

import numToAbbr from 'shared/utils/numToAbbr';
import numToTwoDigits from 'shared/utils/numToTwoDigits';

const getProperties = (states, stateNum, districtNum) => {
  const abbr = numToAbbr(stateNum);
  const properties = get(`${abbr}.${numToTwoDigits(districtNum)}`, states);

  if (properties) {
    return properties;
  }

  return null;
};

export default getProperties;
