import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Location from '../../../common-services/location.service';
import Constants from '../../../common-services/constants.service';
import template from './map.html';
import MAP_CONSTANTS from './MAP_CONSTANTS';

class controller {

  constructor ($timeout, Location, Constants, $window) {
    'ngInject';

    Object.assign(this, { $timeout, Location, $window });

    // default positions
    this.styles = MAP_CONSTANTS.styles;
    this.zoom = MAP_CONSTANTS.position.default.zoom;
    this.position = MAP_CONSTANTS.position.default.location;
    this.options = MAP_CONSTANTS.options;
    this.map = this.mapOptions( );
    this.marker = this.markerOptions( );
  }

  $onChanges (changes) {
    if (changes.input.currentValue) {
      this.blocked = false;
      this.$timeout(( ) => {
        this.position = changes.input.currentValue.coords;
        this.zoom = changes.input.currentValue.zoom;
      });
    }
  }

  $onInit ( ) {
    this.getCurrentLocation( );
  }

  getCurrentLocation ( ) {
    this.progress = true;
    this.blocked = false;

    navigator
      .geolocation
      .getCurrentPosition(
        position => {
          this.$timeout(( ) => {
            this.progress = false;
            this.zoom = 19;

            this.position = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            };

            this.markerCallback(this.Location.positionToFunc(this.position));
          });
        },
        err => {
          this.$timeout(( ) => {
            this.progress = false;
            this.blocked = true;
          });
          console.log(err);
        }
      );
  }

  mapOptions ( ) {
    return {
      events: {
        tilesloaded: map => {
          this.$window.google.maps.event.trigger(map, 'resize');
          map.setOptions({
            zoomControlOptions: {
              position: this
                .$window
                .google
                .maps
                .ControlPosition[
                this.$window.innerWidth <= 960 ? 'RIGHT_TOP' : 'RIGHT_CENTER'
                ]
            }
          });
        },
        click: (map, event, arg) => {
          this.$timeout(( ) => {
            this.position = {
              latitude: _.head(arg).latLng.lat( ),
              longitude: _.head(arg).latLng.lng( )
            };

            this.markerCallback(this.Location.positionToFunc(this.position));
          });
        }
      }
    };
  }

  markerOptions ( ) {
    return {
      options: {
        draggable: true,
        icon: {
          url: require('../../../../assets/images/pin_map.png'), // eslint-disable-line global-require
          anchor: {
            x: 25,
            y: 25
          }
        }
      },
      events: {
        dragend: marker => this.markerCallback(marker)
      }
    };
  }

  markerCallback (marker) {
    this.Location
      .getMarkerLocation(marker, location => {
        this.output({ location });
      });
  }
}

export default angular.module('map', [
  uiRouter,
  Location,
  Constants
]).component('map', {
  bindings: {
    input: '<',
    output: '&'
  },
  template,
  controller
}).name;
