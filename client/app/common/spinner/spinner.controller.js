export default class spinnerController {

  constructor () {}

  $onChanges (changes) {
    this.display = changes.input.currentValue;
  }

}
