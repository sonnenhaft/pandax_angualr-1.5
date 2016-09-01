export default class cardListController {

  constructor () {
    // 'ngInject';

    _.assign(this, {defaultCardId: 0});
  }

  $onChanges (changes) {
    if (changes.cards.currentValue && changes.cards.currentValue.length) {
      this.defaultCardId = this.findDefaultCard();
    }
  }

  $onInit () {
    if (this.cards.length) {
      this.defaultCardId = this.findDefaultCard();
    }
  }

  setDefaultCard () {
    console.log('test', this.defaultCardId, this.cards);
		/*
			ToDO: send request
		 */
  }

  findDefaultCard () {
    return _.find(this.cards, {is_default: true}).id;
  }

}
