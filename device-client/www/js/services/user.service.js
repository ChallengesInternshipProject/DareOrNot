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
			var result = $q.defer()  
			$http({
				url : SERVER_ADDRESS+'/users/list/',
				params : queryParams,
			}).then(function(resultData){
				result.resolve(resultData.data);
			})

			return result.promise;
		}
		user.getNonFriends = function(userID,searchString){
		
			var friends = $q.defer();
			user.getFriends(userID,"Accepted", searchString,function(result){
				friends.resolve(result)
			})

			var returnResult = $q.defer();
			friends.promise.then(function(result){
				var queryParams = {
					friends : []
				}
				//All Friends
				for(var friend in result){
					queryParams.friends.push(result[friend]._id);
				}
				//Add Users Self ID
				queryParams.friends.push(userID);

				returnResult.resolve(
						user.list(queryParams)
						.then(function(data){return data})
					);
			
			})

			return returnResult.promise

		}
		user.sendRequest = function(senderID,requestedID) {
			return $http.post(SERVER_ADDRESS+ "/users/requestFriendship/",{	senderID : senderID,requestedID : requestedID,})
		}
		user.acceptFriendship = function(senderID,requestedID) {
			console.log(arguments)
			return $http.post(SERVER_ADDRESS+ "/users/acceptFriendship/",{	senderID : senderID,requestedID : requestedID,})
		}
		//End of methods
		return user;

	});
