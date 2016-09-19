import angular from 'angular';
import Home from './home/home';
import Main from './main/main';
import Profile from './profile/profile';
import ProfileCreate from './profile/create/profile.create';
import ProfileView from './profile/view/profile.view';
import Order from './order/order';
import Payments from './payments/payments';
import History from './history/history';
import HistoryMinx from './historyMinx/historyMinx';
import Password from './password/password';
import Admin from './admin/admin';

let componentModule = angular.module('app.components', [
  Home,
  Main,
  Profile,
  ProfileCreate,
  ProfileView,
  Order,
  Payments,
  History,
  HistoryMinx,
  Password,
  Admin
])

.name;

export default componentModule;
