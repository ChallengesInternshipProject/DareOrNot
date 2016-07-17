angular.module('starter.services')
  .service('UserService', function ($q, $http, SERVER_ADDRESS, SERVER_PORT, SOCKET_CHAT_PORT) {
    return {
      getUser: function (email) {
        var deferred = $q.defer();
        $http.get(SERVER_ADDRESS + SERVER_PORT + '/users/user/' + email)
          .success(function (result) {
            console.log(result)
            deferred.resolve(result);
          })
          .error(function (err) {
            deferred.reject(err);
          });

        return deferred.promise;
      }
    }
  });
