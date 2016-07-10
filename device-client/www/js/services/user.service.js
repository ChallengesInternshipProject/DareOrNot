angular.module('starter.services')
	.service('UserService', function ($q, $http, SERVER_ADDRESS, SERVER_PORT, SOCKET_CHAT_PORT) {
		return {
			getUser: function (email) {
				var deferred = $q.defer();
				$http.get('http://localhost:3000/users/user/' + email)
					.success(function (result) {
						console.log(result)
						deferred.resolve(result);
					})
					.error(function (err) {
						deferred.reject(err);
					});

				return deferred.promise;
			},
			getFriends : function(userID) {
				var deferred =  Promise.defer();

				$http.get('http://localhost:3000/users/friends/' + userID)
					.then(function(result){
						deferred.resolve(result);
					}, function(err){
							deferred.reject(err);
					})
					return deferred.promise;
			}
		}
	});
