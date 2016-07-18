/* Created by evgeni-tsn on 20-Jun-2016. */

angular.module('starter.controllers')
  .controller('NewDareCtrl', function ($scope, $http, $log, $ionicLoading, $ionicModal, SERVER_ADDRESS, SERVER_PORT, $localStorage, UserService) {
    $scope.data = {
      name: '',
      description: '!?',
      location: {
        lat: 42.662888,
        lng: 23.354051
      }
    };

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
          choice: $scope.data.choice,
          _creator: $localStorage.user.id
        }
      }).then(function (response) {
        $log.info(response);
      })
    };

    $ionicModal.fromTemplateUrl('templates/modals/friends-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.friendsModal = modal;
    });

    $scope.callFriendsModal = function () {
      UserService.getAllUsers()
        .then(function (result) {
          $scope.friends = result;
        });
      $scope.friendsModal.show();
    }

  });
