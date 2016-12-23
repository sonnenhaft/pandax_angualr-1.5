export default moment => {
  'ngInject';

  return function hoursToTimeFilter (val, valType = 'default') {
    let hh;
    let mm;
    let resultString = '';

    if (valType == 'default') {
      hh = parseInt(val, 10);
      mm = parseFloat(val) - hh;

      if (hh > 0) {
        resultString += `${hh}h `;
      }
      if (mm > 0) {
        resultString += `${parseInt(mm * 60, 10)}m `;
      }
    } else if (valType == 'seconds') {
      hh = moment.duration(val * 1000).hours( );
      mm = moment.duration(val * 1000).minutes( );

      if (hh > 0) {
        resultString += `${hh}h `;
      }
      if (mm > 0) {
        resultString += `${mm}m `;
      }
    }

    return resultString;
  };
};
