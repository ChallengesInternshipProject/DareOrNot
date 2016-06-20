angular.module('starter.controllers')

  .controller('MapCtrl', function ($scope, $log) {
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
      },
      {
        lat: 42.663988,
        lng: 23.354051
      },
      {
        lat: 42.666888,
        lng: 23.352051
      },
      {
        lat: 42.662388,
        lng: 23.354011
      }
    ]
  });

