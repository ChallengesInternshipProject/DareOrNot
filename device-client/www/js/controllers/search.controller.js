angular.module('starter.controllers')
	.controller('SearchCtrl', function (
		$scope, 
		UserService,
		$localStorage,
		$log,
		SERVER_ADDRESS
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

	});