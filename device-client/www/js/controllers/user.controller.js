angular.module('starter.controllers')
  .controller('UsersCtrl', function ($scope, $http, $ionicLoading, SERVER_ADDRESS, SERVER_PORT, SOCKET_CHAT_PORT) {

    $scope.doRefresh = function () {
      GetUsers();
    };

    GetUsers();
    function GetUsers() {
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get(SERVER_ADDRESS + SERVER_PORT + '/users').success(function (users) {
        $ionicLoading.hide();
        $scope.users = users;
        $scope.$broadcast('scroll.refreshComplete');
      });
    };

  });
