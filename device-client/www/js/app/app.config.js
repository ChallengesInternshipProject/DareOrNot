angular.module('starter').config(function ($stateProvider, $urlRouterProvider, ionicDatePickerProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $ionicConfigProvider.tabs.position('top'); //bottom
  //Check if the user is authenticated
  function isAuthenticated($q, $state, $log, $timeout, AuthFactory) {

    var data = {};
    if (AuthFactory.isAuthenticated()) {
      $log.info('You are 100% logged no scam !');
      return $q.when();
    } else {
      // console.log('false')
      $timeout(function () {
        // modal.loginModal.show();

        console.log('not logged');
        // $state.go('tab.home');

        //Refresh the state because $state.go is not working !!! IMPORTANT
        $state.go($state.current, {}, {reload: true});
      }, 0);
      return $q.reject();
    }
  }

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
      // templateUrl: 'templates/menus/side-menu-test.html',
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
          controller: 'UsersCtrl',
          resolve: {
            isAuthenticated: isAuthenticated
          }
        }
      }
    })
    .state('tab.user-details', {
      url: '/user/:userID',
      views: {
        'tab-users': {
          templateUrl: 'templates/tab-user-detail.html',
          controller: 'UserDetailCtrl',
          resolve: {
            isAuthenticated: isAuthenticated
          }
        }
      }
    })
    .state('tab.chat', {
      url: '/chat',
      views: {
        'tab-chat': {
          templateUrl: 'templates/tab-chat.html',
          controller: 'ChatCtrl',
          resolve: {
            isAuthenticated: isAuthenticated
          }
        }
      }
    })
    .state('tab.chat-details', {
      url: '/chat/:userID',
      views: {
        'tab-chat': {
          templateUrl: 'templates/tab-chat-detail.html',
          controller: 'ChatDetailCtrl',
          resolve: {
            isAuthenticated: isAuthenticated
          }
        }
      }
    })
    // .state('tab.map', {
    //   url: '/map',
    //   views: {
    //     'tab-map': {
    //       templateUrl: 'templates/tab-map.html',
    //       controller: 'MapCtrl',
    //       resolve: {
    //         isAuthenticated: isAuthenticated
    //       }
    //     }
    //   }
    // })
    .state('tab.gMaps', {
      url: '/gMaps',
      views: {
        'tab-gMaps': {
          templateUrl: 'templates/tab-gMaps.html',
          controller: 'GoogleMapCtrl',
          // resolve: {
          //   isAuthenticated: isAuthenticated
          // }
        }
      }
    })
    .state('tab.contacts', {
      url: '/contacts',
      views: {
        'tab-contacts': {
          templateUrl: 'templates/tab-contacts.html',
          controller: 'ContactsCtrl'
          // resolve: {
          //   isAuthenticated: isAuthenticated
          // }
        }
      }
    })
    .state('tab.dare-list', {
      url: '/dare-list',
      views: {
        'tab-dare-list': {
          templateUrl: 'templates/tab-dare-list.html',
          controller: 'DareListCtrl',
          resolve: {
            isAuthenticated: isAuthenticated
          }
        }
      }
    })
    .state('tab.new-dare', {
      url: '/new-dare',
      views: {
        'tab-new-dare': {
          templateUrl: 'templates/tab-new-dare.html',
          controller: 'NewDareCtrl',
          resolve: {
            isAuthenticated: isAuthenticated
          }
        }
      }
    })
    .state('tab.timeline', {
      url: '/timeline',
      views: {
        'tab-timeline': {
          templateUrl: 'templates/tab-timeline.html',
          controller: 'TimelineCtrl',
          resolve: {
            isAuthenticated: isAuthenticated
          }
        }
      }
    })
    .state('tab.calendar', {
      url: '/calendar',
      views: {
        'tab-calendar': {
          templateUrl: 'templates/tab-calendar.html',
          controller: 'CalendarCtrl',
          resolve: {
            isAuthenticated: isAuthenticated
          }
        }
      }
    })
    .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          abstract: true
        }
      }
    })
    .state('tab.friends.all', {
      url: '/all',
      views: {
        'tab-friends-all': {
          templateUrl: 'templates/tab-friends-all.html',
          controller: 'UsersCtrl',
          resolve: {
            friendsPromise: ['UserService', '$localStorage', function (UserService, $localStorage) {
              console.log("resolve")
              return UserService.getFriends($localStorage.user.id, 'Accepted', '').then(function (data) {
                return data
              })
            }]
          }
        }
      }
    })
    .state('tab.friends.active', {
      url: '/active',
      views: {
        'tab-friends-active': {
          templateUrl: 'templates/tab-friends-active.html',
          controller: 'UsersCtrl',
          resolve: {
            friendsPromise: ['UserService', '$localStorage', function (UserService, $localStorage) {
              return UserService.getFriends($localStorage.user.id, 'Accepted', '').then(function (data) {
                return data
              })
            }]
          }
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
    })
    .state('tab.walkthrough', {
      url: '/walkthrough',
      views: {
        'tab-walkthrough': {
          templateUrl: 'templates/tab-walkthrough.html',
          controller: 'CardsCtrl'
        }
      }
    })
    .state('tab.categories', {
      url: '/categories',
      views: {
        'tab-categories': {
          templateUrl: 'templates/tab-categories.html',
          controller: 'CategoriesCtrl'
        }
      }
    })
    .state('tab.landing', {
      url: '/landing',
      views: {
        'tab-landing': {
          templateUrl: 'templates/tab-landing.html'
          // controller: 'CategoriesCtrl'
        }
      }
    });
  // .state('menu', {
  //   url: '/menu',
  //   abstract: true,
  //   templateUrl: 'templates/menus/side-menu-test.html',
  //   controller: 'HomeCtrl'
  // });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
