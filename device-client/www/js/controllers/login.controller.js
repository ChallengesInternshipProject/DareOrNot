angular.module('starter.controllers')

  .controller('LoginCtrl', function ($scope, $http, LoginService, $ionicLoading, $q, $ionicPopup, $state, $localStorage, $sessionStorage, $log, $ionicSideMenuDelegate, FacebookService) {


    //Object for the facebook register/login popup
    $scope.data = {
      email: '',
      password: ''
    };

    $scope.toggleLeft = function () {
      $log.info('called');
      $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.facebookSignIn = function () {
      return FacebookService.facebookSignIn()
    };
    // $log.info(LoginService.getUser());


    $scope.data = {};
    $scope.$storage = $localStorage.$default({
      user: null
    });
    $scope.login = function () {
      LoginService.loginUser($scope.data.username, $scope.data.password).success(function (data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login Successful!',
          template: "Hello " + data.email
        });
        $scope.$storage.user = data.email;
        $log.info($scope.$storage.user);
        // $state.go('tab.chats');
      }).error(function (data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Invalid credentials!'
        });
      });
    }
  });
