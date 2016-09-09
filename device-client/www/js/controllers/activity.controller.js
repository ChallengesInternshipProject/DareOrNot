angular.module('starter.controllers')

.controller('ActivityCtrl',[
	"$scope",
	"$http",
	"$log",
	"$localStorage",
	"notifications",
	"SERVER_ADDRESS",
	"UserService",
	"NotificationService",
	"$state",
	 function(
	$scope,
	$http,
	$log,
	$localStorage,
	notifications,
	SERVER_ADDRESS,
	UserService,
	NotificationService,
	$state
	) {
		$scope.notifications = notifications;
		$scope.SERVER_ADDRESS = SERVER_ADDRESS;
		
		$scope.acceptFriendship = function(requested,requester) {
			UserService.acceptFriendship(requested,requester).then(function(data){
				console.log(data)
			});
		}

		$scope.goToDare = function(dareID){
			$state.go('app.dare',{dareID:dareID})
		}
		NotificationService.markAsSeen($localStorage.user.data._id);
}]);
