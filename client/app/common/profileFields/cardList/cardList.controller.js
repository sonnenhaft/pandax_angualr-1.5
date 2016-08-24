export default class cardListController {

  constructor () {
    // 'ngInject';

    _.assign(this, {defaultCardId: 0});

    this.defaultCardId = _.find(this.cards, {default: true}).id;
  }

  setDefaultCard () {
console.log('test', this.defaultCardId, this.cards);
		/*
			ToDO: send request
		 */
  }

}
