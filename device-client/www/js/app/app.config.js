angular.module('starter').config(function ($stateProvider, $urlRouterProvider, ionicDatePickerProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  var datePickerObj = {
    inputDate: new Date(),
    setLabel: 'Set',
    todayLabel: 'Today',
    closeLabel: 'Close',
    mondayFirst: false,
    weeksList: ["S", "M", "T", "W", "T", "F", "S"],
    monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
    templateType: 'popup',
    from: new Date(2012, 8, 1),
    to: new Date(2018, 8, 1),
    showTodayButton: true,
    dateFormat: 'dd MMMM yyyy',
    closeOnSelect: false,
    disableWeekdays: [6]
  };
  ionicDatePickerProvider.configDatePicker(datePickerObj);

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
          templateUrl: 'templates/tab-login.html',
          controller: 'LoginCtrl'
        }
      }
    })

    .state('tab.register', {
      url: '/register',
      views: {
        'tab-register': {
          templateUrl: 'templates/tab-register.html',
          controller: 'RegisterCtrl'
        }
      }
    })

    .state('tab.users', {
      url: '/users',
      views: {
        'tab-users': {
          templateUrl: 'templates/tab-users.html',
          controller: 'UsersCtrl'
        }
      }
    })
    .state('tab.user-details', {
      url: '/user/:userID',
      views: {
        'tab-users': {
          templateUrl: 'templates/tab-user-detail.html',
          controller: 'UserDetailCtrl'
        }
      }
    })
    .state('tab.chat', {
      url: '/chat',
      views: {
        'tab-chat': {
          templateUrl: 'templates/tab-chat.html',
          controller: 'ChatCtrl'
        }
      }
    })
    .state('tab.chat-details', {
      url: '/chat/:userID',
      views: {
        'tab-chat': {
          templateUrl: 'templates/tab-chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
    .state('tab.map', {
      url: '/map',
      views: {
        'tab-map': {
          templateUrl: 'templates/tab-map.html',
          controller: 'MapCtrl'
        }
      }
    })
    .state('tab.gMaps', {
      url: '/gMaps',
      views: {
        'tab-gMaps': {
          templateUrl: 'templates/tab-gMaps.html',
          controller: 'GoogleMapCtrl'
        }
      }
    })
    .state('tab.dare-list', {
      url: '/dare-list',
      views: {
        'tab-dare-list': {
          templateUrl: 'templates/tab-dare-list.html',
          controller: 'DareListCtrl'
        }
      }
    })
    .state('tab.new-dare', {
      url: '/new-dare',
      views: {
        'tab-new-dare': {
          templateUrl: 'templates/tab-new-dare.html',
          controller: 'NewDareCtrl'
        }
      }
    })
    .state('tab.timeline', {
      url: '/timeline',
      views: {
        'tab-timeline': {
          templateUrl: 'templates/tab-timeline.html',
          controller: 'TimelineCtrl'
        }
      }
    })
    .state('tab.calendar', {
      url: '/calendar',
      views: {
        'tab-calendar': {
          templateUrl: 'templates/tab-calendar.html',
          controller: 'CalendarCtrl'
        }
      }
    })
    .state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'templates/tab-home.html',
          controller: 'HomeCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
