angular.module('starter.controllers')

.controller('ActivityCtrl', function(
	$scope,
	 $http,
	 $log,
	 $localStorage,
	 notifications,
	 SERVER_ADDRESS,
	 UserService,
	 NotificationService
	 ) {
 	  $scope.notifications = notifications;
 	  $scope.SERVER_ADDRESS = SERVER_ADDRESS;
 	  $log.info($scope.notifications);
 	  $scope.acceptFriendship = function(requested,requester) {
		UserService.acceptRequest(requested,requester);
 	  }

 	  NotificationService.markAsSeen($localStorage.user.data._id);
});
