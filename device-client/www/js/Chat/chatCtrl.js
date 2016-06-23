angular.module('starter.controllers')

  .controller('ChatCtrl', function ($scope, $http, $log, $localStorage, $timeout, $ionicScrollDelegate, ChatService, SERVER_ADDRESS, SERVER_PORT, SOCKET_CHAT_PORT) {
    //TODO make the socket global variable ?
    var socket = io(SERVER_ADDRESS + SOCKET_CHAT_PORT); // TIP: io() with no args does auto-discovery

    //TODO improve logic
    socket.emit('add user', $localStorage.user);

    // socket.on('new user',function (user) {
    //   $scope.onlineUsers.push(user)
    // });

    //Get the messages on first view load
    ChatService.getMessages().then(function (result) {
      $scope.messages = result;
    });

    // console.log($localStorage.user);
    $scope.message = '';
    $scope.onlineUsers = [];
    $scope.me = $localStorage.user;

    //TODO FIX the RECIEVER !
    $scope.emit = function (msg) {
      delete $scope.message;
      ChatService.emitMessage($localStorage.user, 'test', msg, socket);
    };

    $scope.clearAllMessages = function () {
      ChatService.clearMessages(socket);
    };

    $scope.switchRoom = function (roomID) {
      if (roomID === 1) {
        $log.info('Joined room 1')

      } else if (roomID === 2) {
        $log.info('Joined room 2')

      }

      // ChatService.switchRoom(roomID, socket);
    };

    socket.on('room1', function (msg) {
      $log.info(msg);
    });

    //START TODO to move to the service or not to move to the service ? :O
    socket.on('clear', function () {
      $http.get(SERVER_ADDRESS + SERVER_PORT + '/chat/clear');
      $scope.messages = [];
      $scope.$apply();
      $scope.$broadcast('scroll.refreshComplete');
      console.log('someone sent clear request');
    });
    // socket.on('connect', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
    //   socket.emit('ferret', 'tobi', function (data) {
    //     console.log(data); // data will be 'woot'
    //   });
    // });

    socket.on('clientConnect', function (msg) {
      $log.info(msg.id + ' CONNECTED !');
    });


    socket.on('message', function (msg) {
      $scope.messages.push({
        id: msg.id,
        message: msg.msg
      });

      $ionicScrollDelegate.resize();
      $ionicScrollDelegate.scrollBottom();

      console.log(msg);
      //Call $scope.$apply to update the message to the other clients
      $scope.$apply();
      console.log($scope.messages);
    });

    socket.on('new user', function (user) {
      $log.info(user);
      $http.get('http://localhost:3000/chat/clients')
        .success(function (users) {
          $scope.onlineUsers = users;
          // $scope.$apply();
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
