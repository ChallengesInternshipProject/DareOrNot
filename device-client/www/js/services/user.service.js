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
		};
		user.getFriends = function(userID,status,searchString) {
			
			var urlPath = 'http://localhost:3000/users/friends/' + userID+'/'+status;
			var config = {
				method : "GET",
				url : urlPath,
				params : {
					email : searchString,
				}
			}
			return $http(config)
				.success(function(data){
					console.log(data)
					angular.copy(data, user.friends);	
					console.log(user)
				})
		};


		return user;
	});
