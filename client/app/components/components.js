import angular from 'angular';
import Home from './home/home.component';
import Main from './main/main.component';
import Profile from './profile/profile';
import ProfileCreate from './profile/create-profile.page.component/create-profile.page.component';
import ProfileView from './profile/view/profile.view';
import Order from './order/order';
import Payments from './payments/payments';
import History from './history/history';
import HistoryMinx from './historyMinx/historyMinx';
import Password from './password/password';
import Contact from './contact-us.page.component/contact-us.page.component';
import Admin from './admin/admin.component';

export default angular.module('app.components', [
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
  Contact,
  Admin
]).name;
