angular.module('starter.services')
  .service('DareService', function ($q, $http, $log, $ionicModal, SERVER_ADDRESS, SOCKET_CHAT_PORT) {


    function sendDare(userID, dareinfo) {

      $log.info(userID);
      $log.info(dareinfo);

      // return userID;
    }

    return {
      sendDare: sendDare
    }
  });
