/* Created by evgeni-tsn on 20-Jun-2016. */

angular.module('starter.controllers')
  .controller('NewDareCtrl', function ($scope, $http, $log, $ionicLoading, $ionicModal, SERVER_ADDRESS, SERVER_PORT, $localStorage, UserService) {


    $scope.data = {
      name: '',
      description: '!?',
      location: {
        lat: '',
        lng: ''
      }
    };

    //Friends
    UserService.getAllUsers()
      .then(function (result) {
        $scope.friends = result;
      });
    //Array with friends by ID's
    $scope.friendsForInvite = [];

    $scope.choice = [];

    $scope.submitDare = function () {

      // $scope.friendsForInvite = [];
      //Set the selected friends into the friends array for the post request
      angular.forEach($scope.friends, function (value, key) {
        if (value.isChecked) {
          $scope.friendsForInvite.push({id: value._id, email: value.email});
        }
      });
      $log.info($scope.data);
      // $http({
      //   method: 'POST',
      //   url: 'http://localhost:3000/challenges/create',
      //   data: {
      //     name: $scope.data.name,
      //     description: $scope.data.description,
      //     location: {
      //       lat: Number($scope.data.location.lat),
      //       lng: Number($scope.data.location.lng)
      //     },
      //     choice: $scope.data.choice,
      //     friends: $scope.friendsForInvite,
      //     _creator: $localStorage.user.id
      //   }
      // }).then(function (response) {
      //   $log.info($scope.data);
      //   $log.info(response);
      // })

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
