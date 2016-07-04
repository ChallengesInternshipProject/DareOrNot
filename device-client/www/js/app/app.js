// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngStorage', 'ionic-datepicker', 'starter.controllers', 'starter.services', 'starter.constants', 'leaflet-directive'])

  .run(function ($ionicPlatform) {

    //Fix post request issues
    // $httpBackend.whenGET(/templates\/\w+.*/).passThrough();
    // $httpBackend.whenPOST(/templates\/\w+.*/).passThrough();
    // $httpBackend.whenGET(/.*/).passThrough();
    // $httpBackend.whenPOST(/.*/).passThrough();

    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  });
