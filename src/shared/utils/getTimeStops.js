import moment from 'moment';

function getTimeStops(start, end){
  var startTime = moment(start, 'HH:mm');
  var endTime = moment(end, 'HH:mm');

  if( endTime.isBefore(startTime) ){
    endTime.add(1, 'day');
  }

  var timeStops = [];

  while(startTime <= endTime){
    timeStops.push(new moment(startTime).format('HH:mm'));
    startTime.add(15, 'minutes');
  }
  return timeStops;
}

export default getTimeStops;
