angular.module('starter.controllers')
  .controller('UserDetailCtrl', function ($scope, $log, $timeout, $state, $stateParams, UserService) {

    //TODO fix the empty object result
    // $scope.user = UserService.getUser($stateParams.userID);

    //sample data
    $scope.user = {
      id: '12341351',
      email: 'test@abv.bg',
      firstName: 'test',
      lastName: 'test'
    }
    $scope.mapCenter = {
      lat: 42.662888,
      lng: 23.354051,
      zoom: 17
      //42.6628592,23.3540996
    };
    $scope.markers = [
      {
        lat: 42.662888,
        lng: 23.354051
      }
      ];
  });
