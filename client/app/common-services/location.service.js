import angular from 'angular';

class Location {

  constructor (uiGmapGoogleMapApi) {
    'ngInject';

    Object.assign(this, { uiGmapGoogleMapApi });

    this.onInit( );
  }

  onInit ( ) {
    this.uiGmapGoogleMapApi
      .then(
        maps => {
          this.Maps = maps;
          this.Geocoder = new this.Maps.Geocoder( );
        },
        err => console.log(err)
      );
  }

  LatLng (lat, lng) {
    return new this.Maps.LatLng(lat, lng);
  }

  getMarkerLocation (marker, callback) {
    this.Geocoder
      .geocode(
      {
        latLng: this.LatLng(
            marker.position.lat( ),
            marker.position.lng( )
          )
      },
        (results, status) => {
          callback({
            coords: {
              latitude: marker.position.lat( ),
              longitude: marker.position.lng( )
            },
            location: _.head(results)
          });
        });
  }

  getLocationByString (str, callback) {
    this.Geocoder
      .geocode(
        { address: str },
        (results, status) => {
          callback(results);
        }
      );
  }

  positionToFunc (position) {
    return {
      position: {
        lat: ( ) => position.latitude,
        lng: ( ) => position.longitude
      }
    };
  }

}


export default angular
  .module('Location', [])
  .service('Location', Location)
  .name;
