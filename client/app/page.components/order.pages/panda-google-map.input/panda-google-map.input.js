import GoogleGeoLocationService from '../google-geo-location.service';
import template from './panda-google-map.input.html';

class controller {
  MAP_OPTIONS = { disableDefaultUI: false, streetViewControl: false, mapTypeControl: false }
  MAP_STYLES = [
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
  zoom = 19

  constructor (GoogleGeoLocationService, $window, $q, $scope, uiGmapGoogleMapApi, $log) {
    'ngInject';

    Object.assign(this, { GoogleGeoLocationService, $window, $q, $scope, uiGmapGoogleMapApi, $log });

    this.setViewValue = _.debounce(this._setViewValue.bind(this), 300);
    this.markerConfig = {
      options: { draggable: true, icon: { url: require('../../../../assets/images/pin_map.png'), anchor: { x: 25, y: 25 } } }  //  eslint-disable-line global-require
    };

    const setViewValueEvent = ({ center: position }) => this.setViewValueByMarker(position);
    this.pandaMapEvents = {
      dragend: setViewValueEvent,
      zoom_changed: setViewValueEvent,
      center_changed: setViewValueEvent,
      bounds_changed: ({ center: position }) => this.setViewValueByMarker(position, true),
      click: (GoogleGeoLocationService, Window, [{ latLng: position }]) => this.setViewValueByMarker(position, true)
    };

    $scope.$on('$destroy', ( ) => this.isDestoryed = true);
  }

  static alreadySet = false
  $onInit ( ) {
    const initPromise = this.$q.all({
      googleMaps: this.uiGmapGoogleMapApi,
      defaultLocation: this.GoogleGeoLocationService.getCurrentLocation( )
    }).catch(e => console.log(e)).then(({ googleMaps, defaultLocation }) => {
      this.pandaMapEvents.tilesloaded = map => {
        googleMaps.event.trigger(map, 'resize');
        const ControlPosition = this.$window.innerWidth <= 960 ? 'RIGHT_TOP' : 'RIGHT_CENTER';
        map.setOptions({ zoomControlOptions: { position: googleMaps.ControlPosition[ControlPosition] } });
      };

      this.setDefaultLocation = ( ) => {
        this.setViewValueByMarker(defaultLocation);
      };

      return { googleMaps, defaultLocation };
    });

    this.ngModel.$render = ( ) => initPromise.catch(e => console.log(e)).then(( ) => {
      if (this.ngModel.$viewValue) {
        const position = this.ngModel.$viewValue.coords;
        if (position.lat) {
          this.currentMarkerPosition = { latitude: position.lat( ), longitude: position.lng( ) };
        } else {
          this.$log.warn('seems like you moved from one resolution to another one, map can fail');
          this.currentMarkerPosition = position;
        }
      } else if (!controller.alreadySet) {
        controller.alreadySet = true;
        this.setDefaultLocation( );
      }
    });
  }

  _setViewValue ( ) {
    this.GoogleGeoLocationService.findLocationByCoords(this.currentMarkerPosition).then(location => {
      this.ngModel.$setViewValue(location);
    }).catch(e => {
      this.$log.warn('google maps leak happened, map destroyed, but still respondes to events');
    });
  }

  setViewValueByMarker (position, widthDigest) {
    if (this.isDestoryed) {
      return;
    }
    this.currentMarkerPosition = { latitude: position.lat( ), longitude: position.lng( ) };
    if (widthDigest) {
      this.$scope.$digest( );
    }
    this.setViewValue(position);
  }
}

export default angular.module('pandaGoogleMapInput', [
  GoogleGeoLocationService
]).component('pandaGoogleMapInput', {
  require: { ngModel: '^ngModel' },
  template,
  controller
}).name;
