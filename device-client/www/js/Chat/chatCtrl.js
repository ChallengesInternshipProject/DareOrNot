angular.module('starter.controllers')

  .controller('ChatCtrl', function ($scope, $http, $localStorage, $timeout, $ionicScrollDelegate, SERVER_ADDRESS, SERVER_PORT, SOCKET_CHAT_PORT) {
    var socket = io(SERVER_ADDRESS + SOCKET_CHAT_PORT); // TIP: io() with no args does auto-discovery
    $http.get(SERVER_ADDRESS + SERVER_PORT + '/chat').success(function (result) {
      $scope.messages = result;
    });
    console.log($localStorage.user);
    $scope.message = '';

    $scope.emit = function (msg) {
      $http.get(SERVER_ADDRESS + SERVER_PORT+ '/chat/submit?id=' + $localStorage.user + '&message=' + msg + '&reciever=test1&sender=test2')
      socket.emit('message', {
        id: $localStorage.user,
        msg: msg
      });
    };

    $scope.clearAllMessages = function () {
      socket.emit('clear', 'clear the messages');
    };

    socket.on('clear', function () {
      $http.get(SERVER_ADDRESS + SERVER_PORT+'/chat/clear');
      $scope.messages = [];
      $scope.$apply();
      $scope.$broadcast('scroll.refreshComplete');
      console.log('someone sent clear request');
    });
    socket.on('connect', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
      socket.emit('ferret', 'tobi', function (data) {
        console.log(data); // data will be 'woot'
      });
    });

    socket.on('message', function (msg) {
      $scope.messages.push({
        id: msg.id,
        message: msg.msg
      });
      $ionicScrollDelegate.resize();
      $ionicScrollDelegate.scrollBottom();
      delete $scope.message;
      console.log(msg)
      //Call $scope.$apply to update the message to the other clients
      $scope.$apply();
      console.log($scope.messages);
    });
  });
