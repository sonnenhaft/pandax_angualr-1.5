import angular from 'angular';
import Navbar from '../components/main/navbar.component/navbar.component';
import Map from '../components/order/map.component/map.component';
import profileFields from '../components/profile/profile-fields.component/profile.fields.component';
import Spinner from './spinner/spinner';
import findLocation from '../components/order/find-location.component/find-location.component';
import orderDetails from '../components/profile/order-details.component/order-details.component';
import Logout from './logout/logout';

let commonModule = angular.module('app.common', [
  Navbar,
  Map,
  profileFields,
  Spinner,
  findLocation,
  orderDetails,
  Logout
])

.name;

export default commonModule;
