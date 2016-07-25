import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Profile from './profile/profile';
import ProfileCreate from './profile/create/profile.create';

let componentModule = angular.module('app.components', [
  Home,
  About,
  Profile,
  ProfileCreate
])

.name;

export default componentModule;
