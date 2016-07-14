angular.module('starter.controllers')
  .controller('UserDetailCtrl', function ($scope, $log, $timeout, $http,  $state, $stateParams, UserService) {

    //TODO fix the empty object result
    // $scope.user = UserService.getUser($stateParams.userID);
    $scope.user = [];
    //sample data
    // $scope.user = {
    //   id: '12341351',
    //   email: 'john@doe.bg',
    //   firstName: 'John',
    //   lastName: 'Doe',
    //   location: {
    //     lat: 42.6628592,
    //     lng: 23.3540996,
    //   },
    //   phone: '35988821414',
    //   dateOfBirth: Date.now(),
    //   registrationDate: Date.now(),
    //   lastLogin: Date.now(),
    //   //Friends by Mongo _id
    //   friends: [
    //     {id: '57653d8ae38181b830874188'},
    //     {id: '5767f4099ea6ed40069db11b'}
    //   ]
    // };
    $http.get('http://localhost:3000/users/user/'+ $stateParams.userID)
      .success(function (user) {
        $log.info(user);
        $scope.user = user;
      });
    // $scope.mapCenter = {
    //   lat: $scope.user.location.lat,
    //   lng: $scope.user.location.lng,
    //   zoom: 17
    //   //42.6628592,23.3540996
    // };
    // $scope.markers = [
    //   {
    //     lat: $scope.user.location.lat,
    //     lng: $scope.user.location.lng,
    //   }
    // ];
  });
