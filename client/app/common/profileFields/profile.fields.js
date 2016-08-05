import angular from 'angular';
import uiRouter from 'angular-ui-router';
import mapComponent from './profile.fields.component';
import User from '../../services/user/user';
import Constants from '../../services/constant/constants';
import Validation from '../../services/validation/validation';
import Storage from '../../services/storage/storage';
import ngFileUpload from 'ng-file-upload';

export default angular
  .module('profileFields', [
    uiRouter,
    User,
    Constants,
    Validation,
    Storage,
    ngFileUpload
  ])
  .component('profileFields', mapComponent)
  .name;
