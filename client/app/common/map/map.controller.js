class MpaController {

  constructor ($scope, $timeout, Location, Constants) {
    'ngInject';

    _.assign(this, {$scope, $timeout, Location});

    //default positions
    this.styles = Constants.map.styles;
    this.zoom = Constants.map.position.default.zoom;
    this.position = Constants.map.position.default.location;
    this.marker = this.markerOptions();

  }

  $onChanges (changes) {
    if (changes.input.currentValue) {
      this.blocked = false;
      this.$timeout(() => {
        this.position = changes.input.currentValue.coords;
        this.zoom = 15;
      });
    }
  }

  $onInit () {
    this.getCurrentLocation();
  }

  getCurrentLocation () {
    this.progress = true;
    this.blocked = false;

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

            this.markerCallback(this.locationToFunc(this.position));
          });
        },
        err => {
          this.$timeout(() => {
            this.progress = false;
            this.blocked = true;
          });
          console.log(err);
        }
      );
  }

  locationToFunc (position) {
    return {
      position: {
        lat: () => position.latitude,
        lng: () => position.longitude
      }
    }
  }

  markerOptions () {
    return {
      options: {
        draggable: true
      },
      events: {
        dragend: marker => this.markerCallback(marker)
      }
    }
  }

  markerCallback (marker) {
    this.Location
      .getMarkerLocation(marker, location => {
        this.output({location});
      });
  }

}

export default MpaController;
