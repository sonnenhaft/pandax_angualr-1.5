class MpaController {

  constructor ($timeout) {
    'ngInject';

    console.log(this.data);

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
    this.getCurrentLocation();
  }

  getCurrentLocation () {
    this.progress = true;
    navigator
      .geolocation
      .getCurrentPosition(
        position => {
          this.$timeout(() => {
            this.progress = false;
            this.zoom = 15;
            this.position = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            };
          });
        },
        err => {
          this.$timeout(() => {
            this.progress = false;
          });
          console.log(err);
        }
      );
  }

}

export default MpaController;
