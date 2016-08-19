angular.module('starter.controllers')

  .controller('ChatDetailCtrl', function ($scope, $http, $log, $state, $stateParams, $localStorage, ChatService, SERVER_ADDRESS,SERVER_PORT, SOCKET_CHAT_PORT) {
    var socket = io('http://dareornotchat.herokuapp.com/');

    $scope.messages = [];
    $scope.message = '';

    $scope.user = $stateParams.userID;
    var from = $localStorage.user.data.email;
    $scope.me = $localStorage.user.data.email; //remove in future
    var to = $stateParams.userID;

    $log.info(from);


    $http.get(SERVER_ADDRESS+SERVER_PORT +'/chat/messages/' + from + '/' + to)
      .success(function (response) {
        $log.info(response);
        $scope.messages = response;
      });

    socket.on('message', function () {
      $log.info('new message ?');
      $http.get(SERVER_ADDRESS+SERVER_PORT +'/chat/messages/' + from + '/' + to)
        .success(function (response) {
          $scope.messages = response;
        });
    });

    $scope.emit = function (msg) {
      delete $scope.message;
      $log.info('sent');
      ChatService.emitMessage(from, to, msg, socket);
    };

  });
