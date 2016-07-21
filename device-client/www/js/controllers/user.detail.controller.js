angular.module('starter.controllers')
  .controller('UserDetailCtrl', function ($scope, $log, $timeout, $http, $state, $stateParams, $ionicModal, UserService, DareService, SERVER_ADDRESS, SERVER_PORT) {

    //TODO fix the empty object result
    // $scope.user = UserService.getUser($stateParams.userID);
    $scope.user = [];
    $scope.dareInfo = {};

    $scope.sendDare = function (userID) {

      $log.info('working ?');
    };

    $http.get(SERVER_ADDRESS + SERVER_PORT + '/users/' + $stateParams.userID)
      .success(function (user) {
        $log.info(user);
        $scope.user = user;
      });

    $scope.callDareModal = function (userID) {
      $ionicModal.fromTemplateUrl('templates/modals/dare-modal.html', {
        scope: $scope, //No scope 360
        animation: 'slide-in-up'
      }).then(function (modal) {
        modal.show();
      });


      // DareService.sendDare(userID);
    };

    $scope.sendDare = function (userID) {
      DareService.sendDare(userID);
    };
  });
