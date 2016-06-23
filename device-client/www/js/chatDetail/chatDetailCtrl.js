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
        // $scope.$apply();
      });

    $scope.emit = function (msg) {
      delete $scope.message;
      ChatService.emitMessage(from, to, msg, socket);
    };


    // $log.info($localStorage.user);


    // $http.get('http://localhost:3000/chat/client/' + $stateParams.userID)
    //   .success(function (user) {
    //   $scope.user = user;
    //   // socket.to($scope.user.socketID).emit('wtf');
    //   //
    //   // socket.on($scope.user.socketID, function (msg) {
    //   //   $log.info(msg);
    //   // });
    //
    //     // socket.emit('switch room', $scope.user.socketID);
    //
    //     socket.on('private message', function (msg) {
    //     $log.info(msg);
    //     $scope.messages.push(msg);
    //     $scope.$apply();
    //   });
    //
    //   // $log.info($scope.user.socketID);
    //
    //   $scope.emit = function (msg) {
    //     // $log.info($scope.user.socketID + ' sent msg');
    //     socket.emit('private message', $localStorage.user.user);
    //     // socket.emit('private message', $localStorage.user);
    //   };
    // });
  });
