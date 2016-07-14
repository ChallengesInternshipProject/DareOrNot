/* Created by evgeni-tsn on 20-Jun-2016. */

angular.module('starter.controllers')
  .controller('NewDareCtrl', function ($scope, $http, $log, $ionicLoading, SERVER_ADDRESS) {
    $scope.data = {
      name: '',
      description: '!?',
      location: {
        lat: 42.662888,
        lng: 23.354051
      }
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
    $scope.choice = [
      {
        lat: 42.662888,
        lng: 23.354051
      }
    ];

    $scope.submitDare = function () {
      $http({
        method: 'POST',
        url: 'http://localhost:3000/challenges/create',
        data: {
          name: $scope.data.name,
          description: $scope.data.description,
          lat: $scope.data.location.lat,
          lng: $scope.data.location.lng,
          choice: $scope.data.choice
        }
      }).then(function (response) {
        $log.info(response);
      })
    };
    $scope.$on('leafletDirectiveMap.click', function (event, args) {
      console.log(args.leafletEvent.latlng);
      $scope.markers = [args.leafletEvent.latlng];
    });
  });
