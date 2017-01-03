class Helper {

  constructor (moment, $mdToast, $mdDialog) {
    'ngInject';

    Object.assign(this, { moment, $mdToast, $mdDialog });
  }

  getActiveObjectFromArray (arr) {
    return _.filter(arr, object => object.active === true);
  }

  switchObjectActivity (arr, index) {
    return _.map(arr, (object, i) => object.active = index === i);
  }

  getNearestTime (type, newDate) {
    const TIME_PARTITION_IN_MINUTES = 15;
    const TIME_PARTITIONS_LEFT = parseInt(this.moment( ).minute( ) / TIME_PARTITION_IN_MINUTES, 10) + 1;

    let range;

    const round = (TIME_PARTITION_IN_MINUTES * 4) * 60 * 1000;
    const date = this.moment( ).format('YYYY-MM-DD');
    const current = this.moment(Math.ceil((this.moment( )) / round) * round);
    let hours = _.range(Number(current.format('HH')), 25);
    let time = current.format('h:mm A');

    if (this.moment(newDate).format('YYYY-MM-DD') != date) {
      hours = _.range(25);
    }

    const halfhours = _.chain(hours).map(hour => { // eslint-disable-line array-callback-return
      if (hour >= 0 && hour <= 9) {
        return `0${hour}:30`;
      } else if (hour != 24) {
        return `${hour}:30`;
      }
    }).remove(undefined).value( );

    const quarterHoursBeforeHalfHours = _.chain(hours).map(hour => { // eslint-disable-line array-callback-return
      if (hour >= 0 && hour <= 9) {
        return `0${hour}:15`;
      }

      if (hour != 24) {
        return `${hour}:15`;
      }
    }).remove(undefined).value( );

    const quarterHoursAfterHalfHours = _.chain(hours).map(hour => { // eslint-disable-line array-callback-return
      if (hour >= 0 && hour <= 9) {
        return `0${hour}:45`;
      }

      if (hour != 24) {
        return `${hour}:45`;
      }
    }).remove(undefined).value( );

    range = _
      .chain(hours)
      .map(hour => {
        if (hour >= 1 && hour <= 9) {
          return `0${hour}:00`;
        } else {
          return `${hour}:00`;
        }
      })
      .union(halfhours)
      .union(quarterHoursBeforeHalfHours)
      .union(quarterHoursAfterHalfHours)
      .sortBy(hour => this.moment(`${date} ${hour}`))
      .map(hour => this.moment(`${date} ${hour}`).format('h:mm A'))
      .uniq( )
      .value( );

    if (this.moment(newDate).format('YYYY-MM-DD') === date) {
      range = _.slice(range, TIME_PARTITIONS_LEFT, range.length);
      time = _.head(range);
    }

    const object = { time, range, hours, halfhours, quarterHoursBeforeHalfHours, quarterHoursAfterHalfHours };

    return type ? object[type] : object;
  }

  showToast (message, duration = 200000) {
    if (angular.isArray(message)) {
      message = message.join(', ');
    }
    this.$mdToast.show(
      this.$mdToast.simple( )
        .content(message || message.type)
        .position('top right')
        .hideDelay(duration)
        .action('OK')
    );
  }

  showBanPopUp (message = '') {
    const title = message.slice(message.indexOf('account'), message.indexOf('.'));

    this.$mdDialog.show(
      this.$mdDialog.alert( )
        .clickOutsideToClose(true)
        .title(title.substr(0, 1).toUpperCase( ) + title.substr(1))
        .textContent(message)
        .ariaLabel('Ban Dialog')
        .ok('Ok')
    );
  }
}

export default angular
  .module('Helper', [])
  .service('Helper', Helper)
  .name;
