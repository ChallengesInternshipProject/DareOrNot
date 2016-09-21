angular.module('starter.controllers')

<<<<<<< HEAD
.controller('ProfileCtrl', function($scope, $http, $log, $localStorage,notificationsCount) {
  // $scope.user = $localStorage.user.data;
  //
  // $log.info($localStorage.user);
    $scope.notificationsCount = notificationsCount
=======
.controller('ProfileCtrl', function($scope, $http, $log, $localStorage, NotificationService) {
   $scope.user = $localStorage.user;
   $scope.notificationsCount = 0;
	$scope.$on("$ionicView.beforeEnter", function(event, data){
		if ($localStorage.user ) {
			 NotificationService.getUnseen($localStorage.user.data._id)
			.then(function(result){
				$scope.notificationsCount = result.length
			})
		}
 	});
>>>>>>> master_css_rework
});
