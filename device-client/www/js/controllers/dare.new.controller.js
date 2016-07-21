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

    //Friends
    UserService.getAllUsers()
      .then(function (result) {
        $scope.friends = result;
      });
    //Array with friends by ID's
    $scope.friendsForInvite = [];

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

      // $scope.friendsForInvite = [];
      //Set the selected friends into the friends array for the post request
      angular.forEach($scope.friends, function (value, key) {
        if (value.isChecked) {
          $scope.friendsForInvite.push({id: value._id, email: value.email});
        }
      });

      $http({
        method: 'POST',
        url: 'http://localhost:3000/challenges/create',
        data: {
          name: $scope.data.name,
          description: $scope.data.description,
          location: $scope.data.location,
          choice: $scope.data.choice,
          friends: $scope.friendsForInvite,
          _creator: $localStorage.user.id
        }
      }).then(function (response) {
        $log.info($scope.data);
        $log.info(response);
      })

    };

    //Load the Add Friends modal
    $ionicModal.fromTemplateUrl('templates/modals/friends-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.friendsModal = modal;
    });

    $scope.callFriendsModal = function () {
      $scope.friendsModal.show();
    };


  });
