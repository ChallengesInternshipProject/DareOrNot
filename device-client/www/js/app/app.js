// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'ion-datetime-picker',
  'ngCordova',
  'ngStorage',
  'ionic-datepicker',
  'ionic-timepicker',
  'starter.controllers',
  'starter.services',
  'starter.constants',
  'leaflet-directive',
  'ionic.contrib.ui.tinderCards',
  'chart.js'
])

.run(function($rootScope, $ionicPlatform, $ionicHistory, $location) {

  // var push = new Ionic.Push({});
  //
  // push.register(function(token) {
  //   // Log out your device token (Save this!)
  //   console.log("Got Token:", token.token);
  // });

  //Double tap back button to close the app
  $ionicPlatform.registerBackButtonAction(function(e) {
    if ($rootScope.backButtonPressedOnceToExit) {
      ionic.Platform.exitApp();
    } else if ($ionicHistory.backView()) {
      $ionicHistory.goBack();
    } else {
      $rootScope.backButtonPressedOnceToExit = true;
      window.plugins.toast.showShortCenter(
        "Press back button again to exit",
        function(a) {},
        function(b) {}
      );
      window.plugins.toast.showShortCenter($location.path());
      setTimeout(function() {
        $rootScope.backButtonPressedOnceToExit = false;
      }, 2000);
    }
    e.preventDefault();
    return false;
  }, 101);
  //console.log($ionicHistory);

  //Fix post request issues
  // $httpBackend.whenGET(/templates\/\w+.*/).passThrough();
  // $httpBackend.whenPOST(/templates\/\w+.*/).passThrough();
  // $httpBackend.whenGET(/.*/).passThrough();
  // $httpBackend.whenPOST(/.*/).passThrough();

  $ionicPlatform.ready(function() {
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
