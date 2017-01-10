import Helper from '../../common-services/helper.service';
import Validation from '../../common-services/validation.service';
import OrderService from '../../common-services/orderService.service';
import orderConfirm from './order-confirm.page.component/order-confirm.page.component';
import manipulationEntertainers from './manipulation-entertainers.component/manipulation-entertainers.page';
import acceptTermsAndConditionsPage from './accept-terms-and-conditions.page.component/accept-terms-and-conditions.page.component';
import RateEntertainersComponent from './rate-entertainers.component/rate-entertainers.component';
import OrderResource from './order.resource';

import TipModalComponent from '../../common/tip-modal.component/tip-modal.component';
import template from './create-order.page.html';

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

  constructor (Helper, Validation, OrderService, $http, $window, $state, $mdDialog, moment, StatefulUserData, $q, $stateParams, OrderResource) {
    'ngInject';

    this.resolved = false;
    $q.all({
      notAccomplishedOrder: OrderService.fetchLastNotAccomplishedOrder( ).then(({ data }) => data),
      notRatedEntertainers: OrderResource.fetchNotRatedEntertainers($stateParams.notRatedEntertainers).$promise
    }).then(({ notAccomplishedOrder, notRatedEntertainers }) => {
      if (notAccomplishedOrder) {
        $state.go('main.manipulationEntertainers', { orderId: notAccomplishedOrder.id });
      } else if (notRatedEntertainers && notRatedEntertainers.length) {
        $state.go('main.rate-entertainers', { notRatedEntertainers });
      }
    }).finally(( ) => {
      this.resolved = true;
    });

    Object.assign(this, { Helper, Validation, OrderService, $http, $state, $mdDialog, StatefulUserData });
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
      this.isNewcomer = true;
      this.entertainers = this.entertainers.slice(1);
      this.entertainer = this.entertainers[0];
    } else {
      this.hours = this.hours.slice(1);
      this.hour = this.hours[0];
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
      this.$state.go(acceptTermsAndConditionsPage, { order: this.orderData(orderModel) });
      return false;
    }

    this.$http.post('{{config_api_url}}/api/order', this.orderData(orderModel)).then(({ data: { customer, id: orderId, channel_name: channelName } }) => {
      this.orderLoading = false;
      console.log(customer);
      this.StatefulUserData.extend(customer);
      this.$state.go('main.manipulationEntertainers', { orderId, channelName });
    }).finally(( ) => {
      this.orderLoading = false;
    });
  }

  orderData (orderModel) {
    return this.OrderService.buildOrder(Object.assign(orderModel, {
      geo: this.inputLocation,
      price: this.getTotalPrice( )
    })
    );
  }
}

export default angular.module('order', [
  Helper,
  Validation,
  orderConfirm,
  OrderService,
  OrderResource,
  TipModalComponent,
  manipulationEntertainers,
  RateEntertainersComponent,
  acceptTermsAndConditionsPage
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state('main.create-order', {
    url: '/create-order',
    parent: 'main',
    component: 'createOrderPage',
    params: { notRatedEntertainers: null }
  });
}).component('createOrderPage', {
  template,
  controller
}).name;
