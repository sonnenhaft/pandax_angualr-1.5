function hoursToTime() {

  return function(hours) {
    let hh = parseInt(hours), 
        mm = parseFloat(hours) - hh,
        resultString = '';

    if (hh > 0) {
      resultString += `${hh}h `;
    }
    if (mm > 0) {
      resultString += `${parseInt(mm * 60)}m `;
    }

    return resultString;
  };
}

export default hoursToTime;