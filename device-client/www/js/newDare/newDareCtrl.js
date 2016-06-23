/* Created by evgeni-tsn on 20-Jun-2016. */

angular.module('starter.controllers')
  .controller('NewDareCtrl', function ($scope, $http, $log, $ionicLoading, SERVER_ADDRESS) {
    // $scope.data = {
    //   name: '',
    //   description: '!?',
    //   location: {
    //     lat: 42.662888,
    //     lng: 23.354051
    //   }
    // }
    // $scope.mapCenter = {
    //   lat: 42.662888,
    //   lng: 23.354051,
    //   zoom: 17
    //   //42.6628592,23.3540996
    // };
    // $scope.markers = [
    //   {
    //     lat: 42.662888,
    //     lng: 23.354051
    //   }
    // ];
    // // $scope.submitDare = function () {
    // //   $http.post('http://localhost:3000/challenges/create', $scope.data)
    // //     .then(function (response) {
    // //       $log.info(response);
    // //     }, function (error) {
    // //       $log.info(error);
    // //     })
    // // };
    // $scope.$on('leafletDirectiveMap.click', function (event, args) {
    //   console.log(args.leafletEvent.latlng);
    //   $scope.markers = [args.leafletEvent.latlng];
    // });
  });
