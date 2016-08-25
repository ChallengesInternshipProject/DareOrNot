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
	

		return notification;
	})