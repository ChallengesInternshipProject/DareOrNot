angular.module('starter.controllers')

  .controller('ChatDetailCtrl', function ($scope, $http, $log, $state, $stateParams, $localStorage, ChatService, SERVER_ADDRESS, SOCKET_CHAT_PORT) {
    var socket = io(SERVER_ADDRESS + SOCKET_CHAT_PORT); // TIP: io() with no args does auto-discovery
    $scope.messages = [];
    $scope.message = '';

    var from = $localStorage.user;
    var to = $stateParams.userID;

    $log.info(from + " " + to)
    $http.get('http://localhost:3000/chat/messages/' + from + '/' + to)
      .success(function (response) {
        $scope.messages = response;
      });

    socket.on('message', function () {
      $http.get('http://localhost:3000/chat/messages/' + from + '/' + to)
        .success(function (response) {
          $scope.messages = response;
        });
    });

    $scope.emit = function (msg) {
      delete $scope.message;
      ChatService.emitMessage(from, to, msg, socket);
    };

  });
