angular.module('starter.services')
	.service('DareService', function ($q, $http, $log, $ionicModal, SERVER_ADDRESS, SERVER_PORT, SOCKET_CHAT_PORT) {
		var dareService = {};


		dareService.sendDare = function(userID, dareinfo) {

			$log.info(userID);
			$log.info(dareinfo);

			// return userID;
		}

		dareService.create = function (data){
			$http({
				method: 'POST',
				url: SERVER_ADDRESS + '/dares/create',
				data: data
			}).then(function (response) {
				$log.info(response);
			})

		}
		dareService.list = function(filter){
			$log.info(filter)
			return $http.get(SERVER_ADDRESS + '/dares/timeline/',{params:filter});
		}

		return dareService;
	});
