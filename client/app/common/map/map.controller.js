class MpaController {

  constructor ($timeout) {
    'ngInject';

    _.assign(this, {$timeout});

    //default positions
    this.zoom = 3;
    this.position = {
      latitude: 35.5375307,
      longitude: -100.0695645
    };

    this.onInit();
  }

  onInit () {
    navigator
      .geolocation
      .getCurrentPosition((position) => {
        this.$timeout(() => {
          this.position = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          this.zoom = 15;
        });
      });
  }

}

export default MpaController;
