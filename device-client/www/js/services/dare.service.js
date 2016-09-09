angular.module('starter.services')
	.service('DareService', function ($q, $http, $log, $ionicModal, SERVER_ADDRESS, SERVER_PORT, SOCKET_CHAT_PORT,$localStorage, $ionicLoading) {
		var dareService = {};

		dareService.sendDare = function(userID, dareinfo) {
			return userID;
		}

		dareService.create = function (data){
			return $http({
				method: 'POST',
				url: SERVER_ADDRESS + '/dares/create',
				data: data,
			})

		}
		dareService.list = function(filter,applyDefFilter){
		
			var applyDefFilter  = applyDefFilter != undefined ? applyDefFilter : true;
			var defFilter = {};
			
			if (applyDefFilter) {
				defFilter = 	{
					title : {$ne : null},
					description : { $ne : null},
					endDate : {$gt : new Date()},
					$or:[
						{invitedUsers : {$in : [$localStorage.user.data._id]}},
						{
							isPublic : true,
						},
					]
				}
			}
			//Apply filters
			for(var i in arguments){
				for (var ii in arguments[i]) {
					defFilter[ii] = (arguments[i][ii])
				}
			}
			defFilter = JSON.stringify(defFilter);
			return $http.get(SERVER_ADDRESS + '/dares/list/',{params:{data:defFilter}}).then(function(result){
			
				return result.data
			});
		}
		dareService.get = function(dareID) {
		
			return $http.get(SERVER_ADDRESS+'/dares/get/',{params:{dareID:dareID}}).then(function(result){
				return result.data
			})
		}
		return dareService;
	});
