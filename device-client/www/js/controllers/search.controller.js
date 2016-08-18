angular.module('starter.controllers')
	.controller('SearchCtrl', function (
		$scope, 
		UserService,
		$localStorage,
		$log
	){
		$scope.result = [];

		$scope.search = function(){
			UserService.getNonFriends($localStorage.user.data._id, $scope.searchString).then(function(result){
				$scope.result = result;
				
			})
		}

	});