import angular from 'angular';

class EntertainersService {
  constructor (Constants, Request, $mdDialog, $q) {
    'ngInject';

    Object.assign(this, {
      Constants,
      Request,
      $mdDialog,
      $q,
      list: []
    });
  }

  fetchEntertainers (page = 1) {
    return this
      .Request
      .send(
        null,
        this.Constants.api.entertainers.get.method,
        this.Constants.api.entertainers.get.uri(page)
      )
      .then(
        result => {
          this.list = this.list.concat(result.data.items);
          return result.data;
        }
      );
  }

  getEntertainers ( ) {
    return this.list;
  }

  setStatus (ev, entertainer, targetStatus, showPopup = true, targetStatusForPopup) {
    if (!targetStatusForPopup) {
      targetStatusForPopup = targetStatus;
    }
    let confirm;

    if (showPopup) {
      confirm = this.$mdDialog.show(
        this.$mdDialog.confirm( )
          .title(this.Constants.admin.setStatusMessage.title('entertainer', targetStatusForPopup))
          .textContent(this.Constants.admin.setStatusMessage.content('entertainer', targetStatusForPopup))
          .ariaLabel('Set status')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('No'));
    } else {
      confirm = this.$q.defer( );
      confirm.resolve( );
      confirm = confirm.promise;
    }

    return confirm.then(_data => this
        .Request
        .send(
          null,
          this.Constants.api.admin.setStatus.method,
          this.Constants.api.admin.setStatus.uri('providers', entertainer.id),
          { set: targetStatus }
        )
        .then(
          result => {
            this.updateEntertainerInList(entertainer, result.data.status);
            return result.data;
          }
        ));
  }

  updateEntertainerInList (entertainer, targetStatus) {
    entertainer.status = targetStatus;
    this.sortItems( );
  }

  sortItems ( ) {
    this.list.sort((itemA, itemB) => {
      if (itemA.status == this.Constants.admin.statuses.entertainer.pending && itemB.status != itemA.status) {
        return -1;   // move itemA up
      } else if (itemB.status == this.Constants.admin.statuses.entertainer.pending) {
        return 1;   // move itemA down
      } else {
        return (itemA.first_name + itemA.last_name) - (itemB.first_name + itemB.last_name);      // no one has 'pending' status, sorting by name
      }
    });
  }
}

export default angular
  .module('entertainersService', [])
  .service('EntertainersService', EntertainersService)
  .name;
