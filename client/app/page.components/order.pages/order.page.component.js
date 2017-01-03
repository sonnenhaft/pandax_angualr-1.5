import config from 'config';
import Helper from '../../common-services/helper.service';
import Validation from '../../common-services/validation.service';
import OrderService from '../../common-services/orderService.service';
import orderConfirm from './order-confirm.page.component/order-confirm.page.component';
import manipulationEntertainers from './manipulationEntertainers/manipulation-entertainers.page';
import Request from '../../common-services/request.service';
import acceptTermsAndConditionsPage from './accept-terms-and-conditions.page.component/accept-terms-and-conditions.page.component';
import RateEntertainersComponent from './rate-entertainers.component/rate-entertainers.component';

import template from './order.page.html';

class controller {
  hours = ['0.5 H', '1 H', '1.5 H', '2 H', '2.5 H', '3 H', '3.5 H', '4 H']
  guests = ['1', '2-3', '4-5', '5-10', '10-15', '15+']
  entertainers = [1, 2, 3, 4, 5, 6]
  entertainer = 1
  guest = 1
  asap = true
  hour = '0.5H'
  date = new Date( )
  currentDate = new Date( )

  constructor (Helper, Validation, OrderService, Request, $window, $state, $mdDialog, moment, StatefulUserData) {
    'ngInject';

    Object.assign(this, { Helper, Validation, OrderService, Request, $state, $mdDialog, StatefulUserData });
    this.maxDateForCreating = moment( ).add(14, 'days').toDate( );
    this.mobile = $window.innerWidth <= 960;

    $window.addEventListener('resize', ( ) => {
      this.mobile = $window.innerWidth <= 960;
    });
  }

  $onInit ( ) {
    this.providers = _.map(this.OrderService.getProviders( ), (provider, i) => {
      provider.active = i == 0;
      return provider;
    });

    this.time = this.Helper.getNearestTime('time');
    this.range = this.Helper.getNearestTime('range');

    if (this.StatefulUserData.get('is_newcomer')) {
      this.entertainers = _.slice(this.entertainers, 1);
      this.entertainer = _.head(this.entertainers);
    }

    if (!this.StatefulUserData.get('is_newcomer')) {
      this.hours = _.slice(this.hours, 1);
      this.hour = _.head(this.hours);
    }
  }

  showDescription (event, index) {
    this.$mdDialog.show({
      contentElement: `#typeDescr-${index}`,
      parent: document.body,
      targetEvent: event,
      clickOutsideToClose: true
    });
  }

  onDateChange (date) {
    this.dateError = false;
    if (this.validate({ date })) {
      this.range = this.Helper.getNearestTime('range', date);
    }
  }

  getTotalPrice ( ) {
    return _
        .chain(this.Helper.getActiveObjectFromArray(this.providers))
        .map('price')
        .sum( )
        .value( ) * parseFloat(this.hour) * Number(this.entertainer);
  }

  validate (field) {
    if (this.Validation.error(field).length) {
      _.map(this.Validation.error(field), error => {
        this[`${error.name}Error`] = error.text;
      });
      return false;
    }
    return true;
  }

  /** @deprecated mass */
  onSearch (orderModel, form) {
    if ((this.typeError = !this.Helper.getActiveObjectFromArray(this.providers).length) || form.$invalid) { // eslint-disable-line no-cond-assign
      return false;
    }

    this.orderLoading = true;

    if (
      !this.validate({
        apt: orderModel.apt,
        location: this.inputLocation,
        date: orderModel.date
      })
    ) {
      this.location = false;
      this.orderLoading = false;
      return false;
    }

    if (this.StatefulUserData.get('is_newcomer')) {
      this.$state.go('main.accept-terms-and-conditions', { order: this.orderData(orderModel) });
      return false;
    }

    this.Request.post(`${config.API_URL}/api/order`, this.orderData(orderModel)).then(
      ({ data }) => {
        this.orderLoading = false;
        this.StatefulUserData.extend(data.customer);
        this.$state.go('main.manipulationEntertainers', { orderId: data.id, channelName: data.channel_name });
      },
      error => {
        this.orderLoading = false;
        console.log(error);
      }
    );
  }

  orderData (orderModel) {
    return this.OrderService.buildOrder(Object.assign(orderModel, {
      geo: this.inputLocation,
      price: this.getTotalPrice( )
    })
    );
  }

  showEntertainersCountInfo (event) {
    this.$mdDialog.show({
      contentElement: '#entertainers-count-info',
      targetEvent: event
    });
  }
}

export default angular.module('order', [
  Helper,
  Request,
  Validation,
  orderConfirm,
  OrderService,
  manipulationEntertainers,
  RateEntertainersComponent,
  acceptTermsAndConditionsPage
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state('main.order', {
    url: '/order',
    parent: 'main',
    component: 'order',
    resolve: {
      notAccomplishedOrder (OrderService) {
        'ngInject';

        return OrderService.fetchLastNotAccomplishedOrder( );
      }
    },
    onEnter: ($transition$, notAccomplishedOrder, $state, $timeout) => {
      if (notAccomplishedOrder) {
        $timeout(( ) => {
          $state.go('main.manipulationEntertainers', { orderId: notAccomplishedOrder.id });
        }, 100);
      }
    }

  });
}).component('order', {
  template,
  controller
}).name;
