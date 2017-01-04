class Location {
  constructor (uiGmapGoogleMapApi) {
    'ngInject';

    uiGmapGoogleMapApi.then(
      maps => {
        this.Maps = maps;
        this.Geocoder = new this.Maps.Geocoder( );
      },
      err => console.log(err)
    );
  }

  LatLng (lat, lng) { return new this.Maps.LatLng(lat, lng); }

  getMarkerLocation (marker, cb) {
    this.Geocoder.geocode(
      { latLng: this.LatLng(marker.position.lat( ), marker.position.lng( )) },
      results => cb({
        coords: { latitude: marker.position.lat( ), longitude: marker.position.lng( ) },
        location: _.head(results)
      }));
  }

  getLocationByString (address, cb) { this.Geocoder.geocode({ address }, cb); }

  positionToFunc ({ latitude: lat, longitude: lng }) { return { position: { lat: ( ) => lat, lng: ( ) => lng } }; }
}

export default angular.module('Location', []).service('Location', Location).name;
