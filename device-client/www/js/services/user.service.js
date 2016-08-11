angular.module('starter.services')
  .service('UserService', function ($q, $http, SERVER_ADDRESS, SERVER_PORT, SOCKET_CHAT_PORT) {
    var user =  {
      friends : []
    }
    user.getUser= function (email) {
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
      },
      user.getAllUsers= function () {
        var deferred = $q.defer();

        $http.get(SERVER_ADDRESS + SERVER_PORT + '/users')
          .success(function (result) {
            deferred.resolve(result);
          });

        return deferred.promise;
      },
      user.getFriends= function (userID, status, searchString) {

        var urlPath = SERVER_ADDRESS + '/users/friends/' + userID + '/' + status;
        var config = {
          method: "GET",
          url: urlPath,
          params: {
            email: searchString,
          }
        };
        return $http(config)
          .success(function (data) {
              angular.copy(data, user.friends);
          })
      }

      user.getNonFriends = function(userID,searchString){
        
      }
      //End of methods
      return user;

  });
