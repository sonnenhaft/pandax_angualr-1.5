import Location from '../../../common-services/location.service';
import template from './map.html';

class controller {
  position = { latitude: 35.5375307, longitude: -100.0695645 }
  options = { disableDefaultUI: false, streetViewControl: false, mapTypeControl: false }
  styles = [
    { stylers: [{ saturation: -100 }, { gamma: 1 }] },
    { elementType: 'labels.text.stroke', stylers: [{ visibility: 'off' }] },
    { featureType: 'poi.business', elementType: 'labels.text', stylers: [{ visibility: 'off' }] },
    { featureType: 'poi.business', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
    { featureType: 'poi.place_of_worship', elementType: 'labels.text', stylers: [{ visibility: 'off' }] },
    { featureType: 'poi.place_of_worship', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ visibility: 'simplified' }] },
    { featureType: 'water', stylers: [{ visibility: 'on' }, { saturation: -50 }, { gamma: 0 }, { hue: '#bdbdca' }] },
    { featureType: 'administrative.neighborhood', elementType: 'labels.text.fill', stylers: [{ color: '#333333' }] },
    { featureType: 'road.local', elementType: 'labels.text', stylers: [{ weight: 0.5 }, { color: '#a0a0ac' }] },
    { featureType: 'transit.station', elementType: 'labels.icon', stylers: [{ gamma: 1 }, { saturation: 50 }] }
  ]
  zoom = 3

  constructor ($timeout, Location, $window) {
    'ngInject';

    Object.assign(this, { $timeout, Location, $window });
    this.map = this.mapOptions( );
    this.marker = this.markerOptions( );
  }

  $onChanges ({ input: { currentValue } }) {
    if (!currentValue) { return; }
    this.blocked = false;
    this.$timeout(( ) => {
      this.position = currentValue.coords;
      this.zoom = currentValue.zoom;
    });
  }

  $onInit ( ) {
    this.getCurrentLocation( );
  }

  getCurrentLocation ( ) {
    this.progress = true;
    this.blocked = false;

    navigator.geolocation.getCurrentPosition(
      ({ position: { coords: { latitude, longitude } } }) => this.$timeout(( ) => {
        this.progress = false;
        this.zoom = 19;
        this.position = { latitude, longitude };
        this.markerCallback(this.Location.positionToFunc(this.position));
      }),
      err => this.$timeout(( ) => {
        this.progress = false;
        this.blocked = true;
        console.log(err);
      })
    );
  }

  mapOptions = ( ) => ({
    events: {
      tilesloaded: map => {
        this.$window.google.maps.event.trigger(map, 'resize');
        map.setOptions({
          zoomControlOptions: {
            position: this.$window.google.maps.ControlPosition[
              this.$window.innerWidth <= 960 ? 'RIGHT_TOP' : 'RIGHT_CENTER'
              ]
          }
        });
      },
      click: (map, event, arg) => this.$timeout(( ) => {
        this.position = { latitude: _.head(arg).latLng.lat( ), longitude: _.head(arg).latLng.lng( ) };
        this.markerCallback(this.Location.positionToFunc(this.position));
      })
    }
  })

  markerOptions = ( ) => ({
    options: {
      draggable: true,
      icon: {
        url: require('../../../../assets/images/pin_map.png'), // eslint-disable-line global-require
        anchor: { x: 25, y: 25 }
      }
    },
    events: { dragend: marker => this.markerCallback(marker) }
  })

  markerCallback (marker) { this.Location.getMarkerLocation(marker, location => { this.output({ location }); }); }
}

export default angular.module('map', [
  Location
]).component('map', {
  bindings: { input: '<', output: '&' },
  template,
  controller
}).name;
