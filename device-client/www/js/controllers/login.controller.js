angular.module('starter.controllers')

  .controller('LoginCtrl', function ($scope, $http, $ionicModal, $ionicLoading, $q, $ionicPopup, $state, $localStorage, $sessionStorage, $log, $ionicSideMenuDelegate, $interval, $cordovaNetwork, FacebookService, LoginService, StatusFactory) {
    // $scope.modal.show();
    //Object for the facebook register/login popup

    $scope.data = {
      password: ''
    };

    $scope.toggleLeft = function () {
      $log.info('called');
      $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.facebookSignIn = function () {
      return FacebookService.facebookSignIn();
    };

    $scope.$storage = $localStorage.$default({
      user: null
    });

    $scope.login = function () {
      LoginService.loginUser($scope.data.email, $scope.data.password)
        .success(function (data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Login Successful!',
            template: "Hello " + data.email
          });
          //Set the login status
          // StatusFactory.isLogged = true;
          $localStorage.isLogged = true;
          $scope.$storage.user = data.email;
          $log.info($scope.$storage.user);
          // $state.go('tab.chats');
        })
        .error(function (data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: 'Invalid credentials!'
          });
        });
    }
  });
