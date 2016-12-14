export default function hoursToTime(moment) {
  'ngInject';

  return function (val, valType = 'default') {
    let hh, mm,
      resultString = '';

    if (valType == 'default') {
      hh = parseInt(val);
      mm = parseFloat(val) - hh;

      if (hh > 0) {
        resultString += `${hh}h `;
      }
      if (mm > 0) {
        resultString += `${parseInt(mm * 60)}m `;
      }
    } else {
      if (valType == 'seconds') {
        hh = moment.duration(val * 1000).hours();
        mm = moment.duration(val * 1000).minutes();

        if (hh > 0) {
          resultString += `${hh}h `;
        }
        if (mm > 0) {
          resultString += `${mm}m `;
        }
      }
    }

    return resultString;
  };
};
