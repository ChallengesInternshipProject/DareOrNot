angular.module('starter.controllers')

  .controller('LoginCtrl', function ($scope, LoginService, $ionicPopup, $state, $localStorage, $sessionStorage,$log) {

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

