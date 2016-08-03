export default class Helper {

  constructor (moment) {
    'ngInject';

    _.assign(this, {moment});

  }

  getActiveObjectFromArray (arr) {
    return _.filter(arr, object => object.active === true);
  }

  getNearestTime (type) {
    let date, round, current, time, hours, halfhours, range, object;

    round = 30 * 60 * 1000;
    date = this.moment(new Date()).format('YYYY-MM-DD');
    current = this.moment(new Date());
    current = this.moment(Math.ceil((+current) / round) * round);
    hours = _.range(Number(current.format('HH')), 25);
    time = current.format('h:mm A');

    halfhours = _
      .chain(hours)
      .map(hour => {
        if (hour != 24) {
          return hour + ':30';
        }
      })
      .remove(undefined)
      .value();

    range = _
      .chain(hours)
      .map(hour => hour + ':00')
      .union(halfhours)
      .sortBy()
      .map(hour => this.moment(date + ' ' + hour).format('h:mm A'))
      .value();

    object = {time, range, hours, halfhours};

    return type ? object[type] : object;
  }

}
