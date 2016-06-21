angular.module('starter.controllers')

  .controller('ChatDetailCtrl', function ($scope, $http, $log, $state, $stateParams) {
    $http.get('http://localhost:3000/chat/client/test').success(function (user) {
      $log.info(user);
      $scope.user = user;
    });
  });
