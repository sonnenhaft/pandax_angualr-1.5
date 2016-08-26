export default class cardListController {

  constructor () {
    // 'ngInject';

    _.assign(this, {defaultCardId: 0});
  }

  $onChanges (changes) {
    if (changes.cards.currentValue) {
      this.defaultCardId = this.findDefaultCard();
    }
  }

  $onInit () {
    this.defaultCardId = this.findDefaultCard();
  }

  setDefaultCard () {
    console.log('test', this.defaultCardId, this.cards);
		/*
			ToDO: send request
		 */
  }

  findDefaultCard () {
    return _.find(this.cards, {default: true}).id;
  }

}
