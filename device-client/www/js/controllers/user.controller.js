angular.module('starter.controllers')
  .controller('UsersCtrl', function ($scope, $http, $ionicLoading, SERVER_ADDRESS, SERVER_PORT, SOCKET_CHAT_PORT, UserService, StorageFactory) {

    $scope.doRefresh = function () {
      GetUsers();
    };

    UserService.getFriends(StorageFactory.get('id'))
    .then(function(data){
      $scope.friends=data;
    });
       
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
