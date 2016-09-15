angular.module('starter.controllers')
	.factory('moment', function($window) {
		return $window.moment;
	})
	.controller('SideMenuCtrl', function(
		$scope,
		 $http,
		 $log,
		 $ionicModal,
		 $state,
		 $ionicHistory,
		 $ionicLoading,
		 SERVER_ADDRESS,
		$localStorage,
		NotificationService
		) {

			$scope.callMyDares = function() {
				$ionicLoading.show({
					template: 'Loading...'
				});
				$http.get(SERVER_ADDRESS + '/challenges/timeline/' +
					$localStorage.user.data._id).success(function(result) {
					$ionicLoading.hide();
					$scope.challenges = result;
					$scope.SERVER_ADDRESS = SERVER_ADDRESS + '/';
					$scope.$broadcast('scroll.refreshComplete');
					$ionicModal.fromTemplateUrl('templates/side-menu/side-menu-my-dares.html', {
						scope: $scope,
						animation: 'slide-in-up'
					}).then(function(modal) {
						$scope.sideMenuMyDaresModal = modal;
						modal.show();
					});
				});
			};


			// END OF TODO


			$scope.exit = function() {
				ionic.Platform.exitApp();
			};

			$scope.loadMap = function() {
				$ionicModal.fromTemplateUrl('templates/menu/menu-map.html', {
					scope: $scope,
					animation: 'slide-in-left'
				}).then(function(modal) {
					$scope.mapModal = modal;
					modal.show();
				});
			};

			$scope.loadCalendar = function() {
				$ionicModal.fromTemplateUrl('templates/menu/menu-calendar.html', {
					scope: $scope,
					animation: 'slide-in-left'
				}).then(function(modal) {
					$scope.calendarModal = modal;
					modal.show();
				});
			};

			$scope.goTo = function(location) {
				$state.go('app.search');
			};
		 	$scope.notificationsCount = 0;
			$scope.$on("$ionicView.beforeEnter", function(event, data){
				if ($localStorage.user ) {
					 NotificationService.getUnseen($localStorage.user.data._id)
					.then(function(result){
						$scope.notificationsCount = result.length
					})
				}
		 	});
				
	 
	});
