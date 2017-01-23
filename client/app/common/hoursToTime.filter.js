export default moment => {
  'ngInject';

  return function hoursToTimeFilter (dateTimeValue, valueType) {
    let hours;
    let minutes;

    if (valueType === 'seconds') {
      hours = moment.duration(dateTimeValue * 1000).hours( );
      minutes = moment.duration(dateTimeValue * 1000).minutes( );
    } else if (valueType) {
      hours = parseInt(dateTimeValue, 10);
      minutes = parseInt((parseFloat(dateTimeValue) - hours) * 60, 10);
    }
    let timeString = '';
    if (hours > 0) {
      timeString += `${hours}h `;
    }
    if (minutes > 0) {
      timeString += `${minutes}m `;
    }

    return timeString;
  };
};
