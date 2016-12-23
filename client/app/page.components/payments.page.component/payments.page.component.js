import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './payments.page.html';
import User from '../../common-services/user.service';
import Cards from '../../common-services/card.service';

class controller {
  constructor (Cards, $mdToast, $q) {
    'ngInject';

    Object.assign(this, {
      Cards,
      $mdToast,
      $q
    });

    Cards.getCards( )
      .then(data => {
        this.cards = data;
      });
  }

  addCard (card) {
    this.saveLoading = true;
    this.Cards
      .add(card)
      .then(
        cards => {
          if (!cards.message) {
            this.cards = cards;
            this.add = false;
          }

          this.saveLoading = false;

          return cards;
        },
        error => {
          this.saveLoading = false;

          const defer = this.$q.defer( );
          defer.reject(error);
          return defer.promise;
        })
      .then(result => {
        if (result.message) {
          this.showError(result.message.message || result.message);
        } else {
          this.resetCardInfo( );
        }
      });
  }

  showError (message) {
    this.$mdToast.show(
      this.$mdToast.simple( )
        .content(message || message.type)
        .position('top right')
        .hideDelay(200000)
        .action('OK')
    );
  }

  resetCardInfo ( ) {
    this.newCard = {};
  }

}

export default angular.module('payments', [
  uiRouter,
  User,
  Cards
]).config($stateProvider => {
  'ngInject';

  $stateProvider
      .state('main.payments', {
        url: '/payments',
        parent: 'main',
        component: 'payments'
      });
}).component('payments', {
  template,
  controller
}).name;
