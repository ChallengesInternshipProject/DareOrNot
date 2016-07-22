angular.module('starter.controllers')
  .controller('UserDetailCtrl', function ($scope, $log, $timeout, $http, $state, $stateParams, UserService, SERVER_ADDRESS, SERVER_PORT) {

    //TODO fix the empty object result
    // $scope.user = UserService.getUser($stateParams.userID);
    $scope.user = [];

    $http.get(SERVER_ADDRESS + SERVER_PORT + '/users/' + $stateParams.userID)
      .success(function (user) {
        $log.info(user);
        $scope.user = user;
      });
  });
