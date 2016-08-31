angular.module('starter.controllers')

.controller('ActivityCtrl', function(
	$scope,
	 $http,
	 $log,
	 $localStorage,
	 notifications,
	 SERVER_ADDRESS,
	 UserService
	 ) {
 	  $scope.notifications = notifications;
 	  $scope.SERVER_ADDRESS = SERVER_ADDRESS;

 	  $scope.acceptFriendship = function(requested,requester) {
		UserService.acceptRequest(requested,requester);
 	  }
});
