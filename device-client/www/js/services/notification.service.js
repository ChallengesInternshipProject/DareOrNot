angular.module('starter.services')
	.service('NotificationService', function($ionicLoading,$http,SERVER_ADDRESS){
			
		var notification = {
			notification : []
		}

		notification.getAll = function(userID){
			return $http.get(SERVER_ADDRESS+'/notifications/'+userID).then(function(result){
				return result.data;
			})
		}
		notification.getUnseen = function(userID){
			return $http.get(SERVER_ADDRESS+'/notifications/unseen/'+userID).then(function(result){
				return result.data;
			})
		}
		notification.markAsSeen = function(userID){
			return $http.post(SERVER_ADDRESS+'/notifications/markasseen/',{userID: userID}).then(function(result){
				return result.data;
			})
		}
	

		return notification;
	})