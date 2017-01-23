import template from './payments.page.html';
import Cards from '../../common-services/card.service';

import TipModalComponent from '../../common/tip-modal.component/tip-modal.component';

class controller {
  constructor (Cards, $mdDialog, $stateParams, StatefulUserData) {
    'ngInject';

    // $mdDialog necessary to hide "Why" tooltip
    Object.assign(this, { Cards, $mdDialog, $stateParams, StatefulUserData });
    this.Cards.getCards( ).then(cards => this.cards = cards);
    this.isProvider = this.StatefulUserData.isProvider( );
  }

  addCard (form, card) {
    form.$setSubmitted( );
    if (!form.$valid) {
      return;
    }
    this.saveLoading = true;
    this.Cards.add(card).then(cards => {
      this.cards = cards;
      this.add = false;
      this.newCard = {};
    }).finally(( ) => {
      this.saveLoading = false;
    });
  }
}

const component = 'paymentsPage';
export default angular.module(component, [
  TipModalComponent,
  Cards
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state({
    url: '/payments?stub',
    parent: 'main',
    name: component,
    component
  });
}).component(component, {
  template,
  controller
}).name;
