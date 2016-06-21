// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngStorage', 'ionic-datepicker', 'starter.controllers', 'starter.services', 'starter.constants', 'leaflet-directive'])

  .run(function ($ionicPlatform) {
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
  })
  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'tabs.html'
      })

      // Each tab has its own nav history stack:

      .state('tab.login', {
        url: '/login',
        views: {
          'tab-login': {
            templateUrl: 'js/login/tab-login.html',
            controller: 'LoginCtrl'
          }
        }
      })

      .state('tab.register', {
        url: '/register',
        views: {
          'tab-register': {
            templateUrl: 'js/register/tab-register.html',
            controller: 'RegisterCtrl'
          }
        }
      })

      .state('tab.users', {
        url: '/users',
        views: {
          'tab-users': {
            templateUrl: 'js/users/tab-users.html',
            controller: 'UsersCtrl'
          }
        }
      })
      .state('tab.user-details', {
        url: '/user/:userID',
        views: {
          'tab-users': {
            templateUrl: 'js/userDetail/tab-user-detail.html',
            controller: 'UserDetailCtrl'
          }
        }
      })
      .state('tab.chat', {
        url: '/chat',
        views: {
          'tab-chat': {
            templateUrl: 'js/chat/tab-chat.html',
            controller: 'ChatCtrl'
          }
        }
      })
      .state('tab.chat-details', {
        url: '/chat/:userID',
        views: {
          'tab-chat': {
            templateUrl: 'js/chatDetail/tab-chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })
      .state('tab.map', {
        url: '/map',
        views: {
          'tab-map': {
            templateUrl: 'js/map/tab-map.html',
            controller: 'MapCtrl'
          }
        }
      })
      .state('tab.new-dare', {
        url: '/new-dare',
        views: {
          'tab-new-dare': {
            templateUrl: 'js/newDare/tab-new-dare.html',
            controller: 'NewDareCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/login');

  });
