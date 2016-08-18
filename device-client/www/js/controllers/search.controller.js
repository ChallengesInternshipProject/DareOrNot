angular.module('starter.controllers')
	.controller('SearchCtrl', function (
		$scope, 
		UserService,
		$localStorage,
		$log,
		SERVER_ADDRESS,
		 $ionicPopup, 
		 $timeout
	){
		$scope.result = [];
		$scope.SERVER_ADDRESS = SERVER_ADDRESS;
		$scope.search = function(){
			UserService.getNonFriends($localStorage.user.data._id,"").then(function(result){
				$scope.result = result;
				$log.info($scope.searchText);
				//$log.info($scope.result)
			})
		
		}	
		$scope.showAlert = function() {
			var alertPopup = $ionicPopup.alert({
					template: 'Изпратено'
			});

			alertPopup.then(function(res) {});
		};
		$scope.sendRequest = function(requestedID){
			UserService.sendRequest($localStorage.user.data._id,requestedID).then(function(result){
				$scope.showAlert();

			});
		}

	});