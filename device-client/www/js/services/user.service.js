angular.module('starter.services')
	.service('UserService', function ($q, $http, SERVER_ADDRESS, SERVER_PORT, SOCKET_CHAT_PORT,$log) {
		var user =  {
			friends : []
		}
		user.getUser= function (email) {
			var deferred = $q.defer();
			$http.get(SERVER_ADDRESS + SERVER_PORT + '/users/user/' + email)
				.success(function (result) {
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
		user.getFriends= function (userID, status, searchString, callback) {

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
						if(callback){
							callback(data);
						}
				})
		}
		user.list = function(queryParams){
			return $http({
				url : SERVER_ADDRESS+'/users/list/',
				params : queryParams,
			}).then(function(result){
				return result;
			})
		}
		user.getNonFriends = function(userID,searchString){
		
			var friends = $q.defer();
			user.getFriends(userID,"Accepted", searchString,function(result){
				friends.resolve(result)
			})

			friends.promise.then(function(result){
				 var friendsIdList = [];
				 for(var friend in result){
				 	friendsIdList.push(result[friend]._id);
				 }

				 var queryParams = {
				 	friends : friendsIdList
				 }

				 return user.list(queryParams);
			})

		}
		//End of methods
		return user;

	});
