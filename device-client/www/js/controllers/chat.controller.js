angular.module('starter.controllers')

  .controller('ChatCtrl', function ($scope, $http, $log, $localStorage, $timeout, $ionicScrollDelegate, ChatService, SERVER_ADDRESS, SERVER_PORT, SOCKET_CHAT_PORT) {
    //TODO make the socket global variable ?
    var socket = io(SERVER_ADDRESS + SOCKET_CHAT_PORT); // TIP: io() with no args does auto-discovery

    //TODO improve logic
    socket.emit('add user', $localStorage.user);

    //Get the messages on first view load
    ChatService.getMessages().then(function (result) {
      $scope.messages = result;
      $log.info(result);
    });

    // console.log($localStorage.user);
    $scope.message = '';
    $scope.onlineUsers = [];
    $scope.me = $localStorage.user;

    //TODO FIX the RECIEVER !
    $scope.emit = function (msg) {
      delete $scope.message;
      ChatService.emitMessage($localStorage.user, 'global', msg, socket);
    };

    $scope.clearAllMessages = function () {
      ChatService.clearMessages(socket);
    };

    //START TODO to move to the service or not to move to the service ? :O
    socket.on('clear', function () {
      $http.get(SERVER_ADDRESS + SERVER_PORT + '/chat/clear');
      $scope.messages = [];
      $scope.$apply();
      $scope.$broadcast('scroll.refreshComplete');
      console.log('someone sent clear request');
    });

    socket.on('clientConnect', function (msg) {
      $log.info(msg + ' CONNECTED !');
    });


    socket.on('message', function (msg) {
      $log.info(msg);
      $scope.messages.push({
        sender: msg.sender,
        reciever: msg.sender,
        message: msg.msg,
        time: msg.time
      });
      $ionicScrollDelegate.resize();
      $ionicScrollDelegate.scrollBottom();
      //Call $scope.$apply to update the message to the other clients
      $scope.$apply();

    });

    socket.on('new user', function (user) {
      $log.info(user);
      $http.get('http://localhost:3000/chat/clients')
        .success(function (users) {
          $scope.onlineUsers = [];
          users.forEach(function (user) {

            //You can't chat with yourself so just don't show in the online users array
            if ($localStorage.user != user.user) {
              $scope.onlineUsers.push(user);
            }
          });
        });
    });

    socket.on('dc user', function (user) {
      $http.get('http://localhost:3000/chat/clients')
        .success(function (users) {
          $scope.onlineUsers = users;
          // $scope.$apply();
        });
    });

  });
