angular.module('starter.controllers')
  .controller('SideMenuCtrl', function ($scope, $http, $log, $ionicModal, $state) {
    $log.info('SideMenuCtrl called !');


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
      $ionicModal.fromTemplateUrl('templates/side-menu/side-menu-my-dares.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.sideMenuMyDaresModal = modal;
        modal.show();
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
    $scope.callMyFriends = function () {

    };

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

    $scope.goTo = function (location) {
      $state.go('app.search');
    };
  });
