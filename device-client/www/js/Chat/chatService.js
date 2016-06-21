angular.module('starter.services')
  .service('ChatService', function ($q, $http, $log, SERVER_ADDRESS, SERVER_PORT, SOCKET_CHAT_PORT) {
    return {
      getMessages: function () {
        var deffered = $q.defer();
        var messages = [];
        $http.get(SERVER_ADDRESS + SERVER_PORT + '/chat').success(function (result) {
          deffered.resolve(result);
        });
        return deffered.promise;
      },
      emitMessage: function (user, msg, socket) {
        $http.get(SERVER_ADDRESS + SERVER_PORT + '/chat/submit?id=' + user + '&message=' + msg + '&reciever=test1&sender=test2')
        socket.emit('message', {
          id: user,
          msg: msg
        });
      },
      clearMessages: function (socket) {
        //Send the clear socket to the server then clear the messages from the controller.
        socket.emit('clear', 'clear the messages');
      }
    }
  });
