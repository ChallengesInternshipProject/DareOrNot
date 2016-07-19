angular.module('starter.controllers')
	.controller('UsersCtrl', function ($scope, $http, $ionicLoading, SERVER_ADDRESS, SERVER_PORT, SOCKET_CHAT_PORT, UserService,$localStorage) {

		$scope.doRefresh = function () {
			GetUsers();
			//$scope.searchString = "";
			//$scope.friends = UserService.getFriends($localStorage.user.id,'Accepted',$scope.searchString).then(function(data){return data});
		};

		$scope.SERVER_ADDRESS = SERVER_ADDRESS+SERVER_PORT;

		GetUsers();

		function GetUsers() {
			$ionicLoading.show({
				template: 'Loading...'
			});

			$http.get(SERVER_ADDRESS + SERVER_PORT + '/users').success(function (users) {
				$ionicLoading.hide();
				$scope.users = users;
				$scope.$broadcast('scroll.refreshComplete');

			});
		};

		$scope.friends = UserService.friends

		$scope.searchFriends = function(){
				$scope.friends = UserService.getFriends($localStorage.user.id,'Accepted',$scope.searchString).then(function(data){return data});
		}

	});

