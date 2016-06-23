angular.module('starter.controllers')

  .controller('MapCtrl', function ($scope, $log, $http) {
    $scope.mapCenter = {
      lat: 42.662888,
      lng: 23.354051,
      zoom: 17
      //42.6628592,23.3540996
    };

    $scope.markers = [];
    $http.get('http://localhost:3000/challenges').success(function (result) {
      result.forEach(function (item) {
        $log.info(item.location);
        $scope.markers.push(item.location);
      });

      // $scope.markers = [
      //   {
      //     lat: 42.662888,
      //     lng: 23.354051
      //   },
      //   {
      //     lat: 42.663988,
      //     lng: 23.354051
      //   },
      //   {
      //     lat: 42.666888,
      //     lng: 23.352051
      //   },
      //   {
      //     lat: 42.662388,
      //     lng: 23.354011
      //   }
      // ];
      $log.info($scope.markers);
    });


    // $scope.markers = [
    //   {
    //     lat: 42.662888,
    //     lng: 23.354051
    //   },
    //   {
    //     lat: 42.663988,
    //     lng: 23.354051
    //   },
    //   {
    //     lat: 42.666888,
    //     lng: 23.352051
    //   },
    //   {
    //     lat: 42.662388,
    //     lng: 23.354011
    //   }
    // ];
    $log.info($scope.markers);
  });

