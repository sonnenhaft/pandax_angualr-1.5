import angular from 'angular';
import uiRouter from 'angular-ui-router';
import User from '../../common-services/user.service';
import Constants from '../../common-services/constants.service';
import Helper from '../../common-services/helper.service';
import Validation from '../../common-services/validation.service';
import OrderService from '../../common-services/orderService.service';
import orderConfirm from './order-confirm.page.component/order-confirm.page.component';
import manipulationEntertainers from './manipulationEntertainers/manipulation-entertainers.page';
import Request from '../../common-services/request.service';
import orderTerms from './oreder-terms.page.component/oreder-terms.page.component';

import template from './order.page.html';

class controller {

  constructor(User, Constants, Helper, Validation, OrderService, Request, $window, $state, $mdDialog, moment) {
    'ngInject';

    Object.assign(this, {
      User,
      Constants,
      Helper,
      Validation,
      OrderService,
      Request,
      $state,
      $mdDialog,
      maxDateForCreating: moment().add(Constants.order.maxPeriodForCreating.value, Constants.order.maxPeriodForCreating.key).toDate()
    });
    this.mobile = $window.innerWidth <= 960;

    $window.addEventListener('resize', () => {
      this.mobile = $window.innerWidth <= 960;
    });

  }

  $onInit() {
    this.providers = _.map(this.OrderService.getProviders(), (provider, i) => {
      provider.active = i == 0 ? true : false;
      return provider;
    });

    _.mapValues(this.Constants.order.models, (model, key) => {
      this[key] = model;
    });

    this.time = this.Helper.getNearestTime('time');
    this.range = this.Helper.getNearestTime('range');

    if (this.User.get('is_newcomer')) {
      this.entertainers = _.slice(this.entertainers, 1);
      this.entertainer = _.head(this.entertainers);
    }

    if (!this.User.get('is_newcomer')) {
      this.hours = _.slice(this.hours, 1);
      this.hour = _.head(this.hours);
    }
  }

  showDescription(event, index) {
    this.$mdDialog
      .show({
        contentElement: '#typeDescr-' + index,
        parent: document.body,
        targetEvent: event,
        clickOutsideToClose: true
      });
  }

  onDateChange(date) {
    this.dateError = false;
    if (this.validate({date})) {
      this.range = this.Helper.getNearestTime('range', date);
    }
  }

  getTotalPrice() {
    return _
        .chain(this.Helper.getActiveObjectFromArray(this.providers))
        .map('price')
        .sum()
        .value() * parseFloat(this.hour) * Number(this.entertainer);
  }

  validate(field) {
    if (this.Validation.error(field).length) {
      _.map(this.Validation.error(field), error => {
        this[error.name + 'Error'] = error.text;
      });
      return false;
    }
    return true;
  }

  onSearch(orderModel, form) {
    if ((this.typeError = !this.Helper.getActiveObjectFromArray(this.providers).length) || form.$invalid) {
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

    if (this.User.get('is_newcomer')) {
      this.$state.go('main.accept', {order: this.orderData(orderModel)});
      return false;
    }

    this.Request
      .send(
        this.User.token(),
        this.Constants.api.order.method,
        this.Constants.api.order.uri,
        this.orderData(orderModel)
      )
      .then(
        result => {
          this.orderLoading = false;
          this.User.update(result.data.customer);
          this.$state.go('main.manipulationEntertainers', {orderId: result.data.id, channelName: result.data.channel_name});
        },
        error => {
          this.orderLoading = false;
          console.log(error);
        }
      );
  }

  orderData(orderModel) {
    return this
      .OrderService
      .buildOrder(
        Object.assign(orderModel, {
          geo: this.inputLocation,
          price: this.getTotalPrice()
        })
      );
  }

  showEntertainersCountInfo(event) {
    this.$mdDialog
      .show({
        contentElement: '#entertainers-count-info',
        targetEvent: event
      });
  }
}

export default angular.module('order', [
  uiRouter,
  User,
  Constants,
  Helper,
  Validation,
  OrderService,
  orderConfirm,
  manipulationEntertainers,
  Request,
  orderTerms
]).config(($stateProvider) => {
  "ngInject";

  $stateProvider.state('main.order', {
    url: '/order',
    parent: 'main',
    component: 'order',
    resolve: {
      notAccomplishedOrder: function (OrderService) {
        return OrderService.fetchLastNotAccomplishedOrder()
          .then(data => data);
      }
    },
    onEnter: ($transition$, notAccomplishedOrder, $state, Constants, $timeout) => {
      if (notAccomplishedOrder) {
        $timeout(() => {
          $state.go('main.manipulationEntertainers', {orderId: notAccomplishedOrder.id});
        }, 100);
      }
    }

  });
}).component('order', {
  template,
  controller
}).name;
