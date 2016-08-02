class MpaController {

  constructor ($timeout, uiGmapGoogleMapApi) {
    'ngInject';

    _.assign(this, {$timeout, uiGmapGoogleMapApi});

    //default positions
    this.zoom = 3;
    this.position = {
      latitude: 35.5375307,
      longitude: -100.0695645
    };

    this.marker = this.markerOptions();

    this.onInit();
  }

  onInit () {
    this.getCurrentLocation();
    this.uiGmapGoogleMapApi
      .then(
        maps => this.Maps = maps,
        err => console.log(err)
      );
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

  markerOptions () {
    return {
      options: {
        draggable: true
      },
      events: {
        dragend: (marker, event, args) => {
          let Geocoder, LatLng, MarkerObject;

          Geocoder = new this.Maps.Geocoder();
          LatLng = new this.Maps.LatLng(marker.position.lat(), marker.position.lng());

          Geocoder.geocode({latLng: LatLng}, (results, status) => {
            MarkerObject = {
              coords: {
                latitude: marker.position.lat(),
                longitude: marker.position.lng()
              },
              location: _.head(results)
            };

            console.log(MarkerObject);
          });
        }
      }
    }
  }

}

export default MpaController;
