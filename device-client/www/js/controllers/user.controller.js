angular.module('starter.controllers')
  .controller('UsersCtrl', function ($scope, $http, $log, $ionicLoading, $localStorage, $ionicModal, SERVER_ADDRESS, SOCKET_CHAT_PORT, UserService, DareService) {

    $scope.doRefresh = function () {
      GetUsers();
      //$scope.searchString = "";
      //$scope.friends = UserService.getFriends($localStorage.user.id,'Accepted',$scope.searchString).then(function(data){return data});
    };

    $scope.SERVER_ADDRESS = SERVER_ADDRESS ;

    GetUsers();

    function GetUsers() {
      $ionicLoading.show({
        template: 'Loading...'
      });

      $http.get(SERVER_ADDRESS  + '/users').success(function (users) {
        $ionicLoading.hide();
        $scope.users = users;
        $scope.$broadcast('scroll.refreshComplete');

      });
    };

    $scope.friends = UserService.friends;

    $scope.searchFriends = function () {
      $scope.friends = UserService.getFriends($localStorage.user.id, 'Accepted', $scope.searchString).then(function (data) {
        return data
      });
    };

    $scope.sendDare = function (userID) {
      $ionicModal.fromTemplateUrl('templates/modals/dare-modal.html', {
        scope: $scope, //No scope 360
        animation: 'slide-in-up'
      }).then(function (modal) {
        modal.show();
      });

      // DareService.sendDare(userID);
    };
    $scope.test = function () {
      $log.info('testing ?');
    };

  });

