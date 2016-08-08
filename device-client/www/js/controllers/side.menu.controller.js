angular.module('starter.controllers')
  .factory('moment', function ($window) {
    return $window.moment;
  })
  .controller('SideMenuCtrl', function ($scope, $http, $log, $ionicModal, $state, $ionicHistory, $ionicLoading, SERVER_ADDRESS, $localStorage) {


    setInterval(function () {
      $ionicInterval.hide();
    }, 1000);
    
    $scope.activities = [
      {
        message: "Наблюдава 5 ваши предизвикателства",
        user: {
          name: "Петър Георгиев",
          avatar: "img/Activities/u1.jpg"
        },
        count: 5,
        lastUpdated: new moment().subtract(15, 'm').fromNow(),
        pictures: [
          'img/Activities/1.jpg',
          'img/Activities/2.jpg',
          'img/Activities/3.jpg',
          'img/Activities/9.jpg',
          'img/Activities/5.jpg',
        ]
      },
      {
        message: "Ви следва",
        user: {
          name: "Мирела Минчева",
          avatar: "img/Activities/u2.jpg"
        },
        count: 5,
        lastUpdated: new moment().subtract(15, 'm').fromNow(),

      },
      {
        message: "Коментира ваше видео",
        user: {
          name: "Станислава Мартиова",
          avatar: "img/Activities/u3.jpg"
        },
        count: 5,
        lastUpdated: new moment().subtract(34, 'm').fromNow(),
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium facilis vel, doloremque consequuntur corporis esse laudantium incidunt, velit eveniet a voluptate? Eaque officia, molestias architecto similique perspiciatis, libero assumenda vero!"
      },
      {
        message: "Наблюдава 3 ваши предизвикателства",
        user: {
          name: "Мирела Минчева",
          avatar: "img/Activities/u2.jpg"
        },
        count: 5,
        lastUpdated: new moment().subtract(34, 'm').fromNow(),
        pictures: [
          'img/Activities/6.jpg',
          'img/Activities/7.jpg',
          'img/Activities/8.jpg',
        ]
      },
      {
        message: "Коментира ваша снимка",
        user: {
          name: "Петър Георгиев",
          avatar: "img/Activities/u1.jpg"
        },
        count: 5,
        lastUpdated: new moment().subtract(34, 'm').fromNow(),
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium facilis vel, doloremque consequuntur corporis esse laudantium incidunt, velit eveniet a voluptate? Eaque officia, molestias architecto similique perspiciatis, libero assumenda vero!"
      },

    ]

    $scope.callPorofile = function () {
      $ionicModal.fromTemplateUrl('templates/side-menu/side-menu-profile.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.sideMenuModal = modal;
        modal.show();
      });
    };

    $scope.callActivity = function () {
      $ionicModal.fromTemplateUrl('templates/side-menu/side-menu-activity.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.sideMenuActivityModal = modal;
        modal.show();
      });
    };

    $scope.callMyDares = function () {
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get(SERVER_ADDRESS + ':3000/challenges/timeline/' + $localStorage.user.id).success(function (result) {
        $ionicLoading.hide();
        $scope.challenges = result;
        $scope.SERVER_ADDRESS = SERVER_ADDRESS + ':3000/';
        $scope.$broadcast('scroll.refreshComplete');
        $ionicModal.fromTemplateUrl('templates/side-menu/side-menu-my-dares.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function (modal) {
          $scope.sideMenuMyDaresModal = modal;
          modal.show();
        });
      });


    };

    $scope.callMyNotifications = function () {
      $ionicModal.fromTemplateUrl('templates/side-menu/side-menu-notifications.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.sideMenuMyNotoficationsModal = modal;
        modal.show();
      });
    };


    // TODO Implemented but not yet !!!!!!!!!!!!!!!!!!!!!!!

    $scope.callMyMessages = function () {

    };

    // END OF TODO

    $scope.callMyFavorites = function () {
      $ionicModal.fromTemplateUrl('templates/side-menu/side-menu-favorites.html', {
        scope: $scope,
        animation: 'slide-in-left'
      }).then(function (modal) {
        $scope.sideMenuMyFavoritesModal = modal;
        modal.show();
      });
    };

    $scope.callSettings = function () {
      $log.info('called ?')
      $ionicModal.fromTemplateUrl('templates/side-menu/side-menu-settings.html', {
        scope: $scope,
        animation: 'slide-in-left'
      }).then(function (modal) {
        $scope.sideMenuSettingsModal = modal;
        modal.show();
      });
    };

    $scope.loadMap = function () {
      $ionicModal.fromTemplateUrl('templates/menu/menu-map.html', {
        scope: $scope,
        animation: 'slide-in-left'
      }).then(function (modal) {
        $scope.mapModal = modal;
        modal.show();
      });
    };

    $scope.loadCalendar = function () {
      $ionicModal.fromTemplateUrl('templates/menu/menu-calendar.html', {
        scope: $scope,
        animation: 'slide-in-left'
      }).then(function (modal) {
        $scope.calendarModal = modal;
        modal.show();
      });
    };

    $scope.goTo = function (location) {
      $state.go('app.search');
    };
  });
