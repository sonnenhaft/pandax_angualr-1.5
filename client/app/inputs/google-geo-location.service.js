class GoogleGeoLocationService {
    /** @return Promise<locations>*/
  _geocodeFn = null
  _LagLngFn = null

  constructor (uiGmapGoogleMapApi, $q, $log) {
    'ngInject';

    this.$q = $q;
    this.$log = $log;
    this._deferedInitPromise = uiGmapGoogleMapApi.then(windowGoogleMaps => this._deferedInit(windowGoogleMaps));
  }

    /** @param {Object} googleMaps - same as window.google.maps */
  _deferedInit (googleMaps) {
    this._geocodeFn = coords => this.$q((resolve, reject) => new googleMaps.Geocoder( ).geocode(coords, (locations, status) => {
      if (status === 'OK') {
        resolve(locations);
      } else if (status === 'ZERO_RESULTS') {
        resolve([]);
      } else {
        reject(status);
      }
    }));
    this._LagLngFn = ({ latitude, longitude }) => ({ latLng: new googleMaps.LatLng(latitude, longitude) });
  }

  findLocationByCoords ({ latitude, longitude }) {
    return this._deferedInitPromise
            .then(( ) => this._geocodeFn(this._LagLngFn({ latitude, longitude })))
            .then(
                ([location]) => ({ coords: { latitude, longitude }, location }),
                e => {
                  this.$log.warn('seems like no locations were found for this marker', e);
                  return { coords: { latitude, longitude } };
                }
            );
  }

  findLocationsByName (address) {
    return this._deferedInitPromise.then(( ) => this._geocodeFn({ address }));
  }

  getCurrentLocation ( ) {
    return this.$q((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject)).then(
            ({ coords: { latitude, longitude } }) => ({ lat: ( ) => latitude, lng: ( ) => longitude }),
            e => {
              console.log(e);
              return { lat: () => 35.5375307, lng: ()=> -100.0695645 };
            }
        );
  }
}

export default angular.module('GoogleGeoLocationService', [
  'uiGmapgoogle-maps'
]).service('GoogleGeoLocationService', GoogleGeoLocationService).name;
