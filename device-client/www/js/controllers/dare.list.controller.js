/* Created by evgeni-tsn on 20-Jun-2016. */

angular.module('starter.controllers')
  .controller('DareListCtrl', function ($scope, $http, $log, $ionicLoading, SERVER_ADDRESS) {

    $scope.dares = [];

    $http.get('http://localhost:3000/challenges').success(function (result) {
      $scope.dares = result;
    });
  });
