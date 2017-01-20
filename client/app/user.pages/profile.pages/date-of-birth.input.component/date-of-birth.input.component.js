import template from './date-of-birth.input.html';
import dobInputPanelTemplate from './date-of-birth.input.panel.html';
import './date-of-birth.input.scss';

class panelController {
  constructor (mdPanelRef, $timeout) {
    'ngInject';

    this.mdPanelRef = mdPanelRef;
    $timeout(( ) => {
      const selector = this.selectedValue ? '.dob-panel-item' : '.selected';
      angular.element(this.mdPanelRef.panelEl[0].querySelector(selector)).focus( );
    }, false);
  }

  select (value) {
    this.mdPanelRef.close(value).then(( ) => this.callback(value));
  }
}

class controller {
  constructor ($mdPanel, $locale) {
    'ngInject';

    this.months = $locale.DATETIME_FORMATS.MONTH;
    this.$mdPanel = $mdPanel;
  }

  $onInit ( ) {
    this.ngModel.$render = ( ) => {
      let date;
      if (this.ngModel.$viewValue) {
        if (this.asObject) {
          date = this.ngModel.$viewValue;
          this.month = this.months[date.month - 1];
          this.day = date.day;
          this.year = date.year;
        } else {
          date = new Date(this.ngModel.$viewValue);
          this.month = this.months[date.getMonth( )];
          this.day = date.getDate( );
          this.year = date.getFullYear( );
        }
      }
      this.setDate( );
    };

    this.minAge = this.minAge || 0;
    this.minAge -= 1;
    this.years = [];
    for (let year = new Date( ).getFullYear( ) - this.minAge; year >= 1900; year -= 1) {
      this.years.push(year);
    }
    const d = new Date( );
    this.minDate = new Date(d.setYear(d.getFullYear( ) - this.minAge));
    this.updateDays( );
  }

  parseMonth ( ) {
    if (this.months.indexOf(this.month) === -1 && this.month) {
      this.month = this.months[parseInt(this.month, 10) - 1] || null;
    }
    this.setDate( );
  }

  setDate ( ) {
    let date = new Date(`${this.month}/${this.day}/${this.year}`);
    if (isNaN(date.getTime( ))) {
      date = null;
      this.ngModel.$setValidity('minAge', true);
    }
    this.ngModel.$setValidity('required', !!date);
    if (this.minAge) {
      this.ngModel.$setValidity('minAge', this.minAge && date < this.minDate);
    }
    if (this.asObject && date) {
      this.ngModel.$setViewValue({
        year: date.getFullYear( ),
        day: date.getDate( ),
        month: date.getMonth( ) + 1
      });
    } else {
      this.ngModel.$setViewValue(date);
    }

    this.ngModel.$setTouched( );
  }

  updateDays ( ) {
    let lastDay = 31;
    if (this.month) {
      const currentMonthIndex = this.months.indexOf(this.month);
      if (currentMonthIndex === 1) {
        if (this.year && ((this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0)) {
          lastDay = 29;
        } else {
          lastDay = 28;
        }
      } else if ([0, 2, 4, 6, 7, 9, 11].indexOf(currentMonthIndex) === -1) {
        lastDay = 30;
      }
    }

    this.days = [];
    for (let day = 1; day <= lastDay; day += 1) {
      this.days.push(day);
    }
    if (this.day > lastDay) {
      this.day = lastDay;
    }
  }

  showMenu (openFrom, key, values) {
    const parent = openFrom.target;
    this.$mdPanel.open({
      attachTo: angular.element(document.body),
      controller: panelController,
      controllerAs: '$ctrl',
      template: dobInputPanelTemplate,
      panelClass: 'demo-menu-example',
      position: this.$mdPanel.newPanelPosition( ).relativeTo(parent).addPanelPosition(
        this.$mdPanel.xPosition.ALIGN_START,
        this.$mdPanel.yPosition.BELOW
      ),
      locals: {
        values,
        key,
        parent,
        selectedValue: this[key],
        callback: value => {
          this[key] = value;
          this.updateDays( );
          this.setDate( );
        }
      },
      openFrom,
      clickOutsideToClose: true,
      escapeToClose: true,
      focusOnOpen: false,
      zIndex: 2
    });
  }
}

export default angular.module('dateOfBirthInput', []).filter('readOnlyDate', ( ) => (dateLikeObject, asObject) => {
  if (dateLikeObject && asObject) {
    return new Date(`${dateLikeObject.month}/${dateLikeObject.day}/${dateLikeObject.year}`);
  } else {
    return dateLikeObject;
  }
}).component('dateOfBirthInput', {
  require: { ngModel: '^ngModel' },
  bindings: { minAge: '<', asObject: '<', ngReadonly: '<' },
  controller,
  template
}).name;
