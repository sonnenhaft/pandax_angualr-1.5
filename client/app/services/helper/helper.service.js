export default class Helper {

  constructor (moment) {
    'ngInject';

    _.assign(this, {moment});

  }

  getActiveObjectFromArray (arr) {
    return _.filter(arr, object => object.active === true);
  }

  switchObjectActivity (arr, index) {
    return _.map(arr, (object, i) => object.active = index === i);
  }

  getNearestTime (type, newDate) {
    let date, round, current, time, hours, halfhours, range, object;

    round = 30 * 60 * 1000;
    date = this.moment().format('YYYY-MM-DD');
    current = this.moment();
    current = this.moment(Math.ceil((+current) / round) * round);
    hours = _.range(Number(current.format('HH')), 25);
    time = current.format('h:mm A');

    if (this.moment(newDate).format('YYYY-MM-DD') != date) {
      hours = _.range(25);
    }

    halfhours = _
      .chain(hours)
      .map(hour => {
        if (hour >= 0 && hour <= 9) {
          return '0' + hour + ':30';
        }

        if (hour != 24) {
          return hour + ':30';
        }
      })
      .remove(undefined)
      .value();

    range = _
      .chain(hours)
      .map(hour => hour >= 1 && hour <= 9 ? '0' + hour + ':00' : hour + ':00')
      .union(halfhours)
      .sortBy(hour => this.moment(date + ' ' + hour))
      .map(hour => this.moment(date + ' ' + hour).format('h:mm A'))
      .uniq()
      .value();

    if (this.moment(newDate).format('YYYY-MM-DD') === date) {
      range = _.slice(range, 4, range.length);
      time = _.head(range);
    }

    object = {time, range, hours, halfhours};

    return type ? object[type] : object;
  }

}
