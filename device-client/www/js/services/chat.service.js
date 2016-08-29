angular.module('starter.services')
  .service('ChatService', function($q, $http, $log, SERVER_ADDRESS, SERVER_PORT, SOCKET_CHAT_PORT) {

    return {
      getSocket: function functionName() {
        return io('http://dareornotchat.herokuapp.com/');
      },
      getMessages: function() {
        var deffered = $q.defer();
        var messages = [];
        $http.get(SERVER_ADDRESS + SERVER_PORT + '/chat').success(function(result) {
          deffered.resolve(result);
        });
        return deffered.promise;
      },
      emitMessage: function(sender, reciever, msg, socket) {
        $http.get(SERVER_ADDRESS + SERVER_PORT + '/chat/submit?message=' + msg + '&reciever=' + reciever + '&sender=' + sender);
        socket.emit('message', {
          sender: sender,
          reciever: reciever,
          msg: msg
        });
      },
      clearMessages: function(socket) {
        //Send the clear socket to the server then clear the messages from the controller.
        socket.emit('clear', 'clear the messages');
      },
      switchRoom: function(roomID, socket) {
        $log.info('Switched to room ' + roomID);
      }
    };
  });
