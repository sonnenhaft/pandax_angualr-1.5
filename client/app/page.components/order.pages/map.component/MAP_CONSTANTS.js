export default {
  options: { disableDefaultUI: false, streetViewControl: false, mapTypeControl: false },
  position: { default: { location: { latitude: 35.5375307, longitude: -100.0695645 }, zoom: 3 } },
  styles: [
    { 'stylers': [{ 'saturation': -100 }, { 'gamma': 1 }] },
    { 'elementType': 'labels.text.stroke', 'stylers': [{ 'visibility': 'off' }] },
    { 'featureType': 'poi.business', 'elementType': 'labels.text', 'stylers': [{ 'visibility': 'off' }] },
    { 'featureType': 'poi.business', 'elementType': 'labels.icon', 'stylers': [{ 'visibility': 'off' }] },
    { 'featureType': 'poi.place_of_worship', 'elementType': 'labels.text', 'stylers': [{ 'visibility': 'off' }] },
    { 'featureType': 'poi.place_of_worship', 'elementType': 'labels.icon', 'stylers': [{ 'visibility': 'off' }] },
    { 'featureType': 'road', 'elementType': 'geometry', 'stylers': [{ 'visibility': 'simplified' }] },
    { 'featureType': 'water', 'stylers': [{ 'visibility': 'on' }, { 'saturation': -50 }, { 'gamma': 0 }, { 'hue': '#bdbdca' }] },
    { 'featureType': 'administrative.neighborhood', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#333333' }] },
    { 'featureType': 'road.local', 'elementType': 'labels.text', 'stylers': [{ 'weight': 0.5 }, { 'color': '#a0a0ac' }] },
    { 'featureType': 'transit.station', 'elementType': 'labels.icon', 'stylers': [{ 'gamma': 1 }, { 'saturation': 50 }] }
  ]
}
