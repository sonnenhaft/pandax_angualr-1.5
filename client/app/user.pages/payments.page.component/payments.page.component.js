import template from './payments.page.html';
import Cards from '../../common-services/card.service';

import TipModalComponent from '../../common/tip-modal.component/tip-modal.component';

class controller {
  constructor (Cards, $mdToast, $q, $mdDialog) {
    'ngInject';

    // $mdDialog necessary to hide "Why" tooltip
    Object.assign(this, { Cards, $mdToast, $q, $mdDialog });
    Cards.getCards( ).then(data => { this.cards = data; });
  }

  addCard (form, card) {
    form.$submit( );
    if (!form.$valid) {
      return;
    }
    this.saveLoading = true;
    this.Cards.add(card).then(cards => {
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
      }).then(({ message }) => {
        if (message) {
          this.showError(message.message || message);
        } else {
          this.resetCardInfo( );
        }
      });
  }

  showError (message) {
    this.$mdToast.show(this.$mdToast.simple( )
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
  TipModalComponent,
  Cards
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state('main.payments', {
    url: '/payments',
    parent: 'main',
    component: 'payments'
  });
}).component('payments', {
  template,
  controller
}).name;
