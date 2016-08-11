angular.module('starter.controllers')
	.controller('TimelineCtrl', function ($scope, $http, $ionicLoading, SERVER_ADDRESS, $state, $localStorage, $ionicSlideBoxDelegate) {

		$scope.doRefresh = function () {
			GetTimeline();
		};

		$scope.nextSlide = function() {
			$ionicSlideBoxDelegate.next();
		}
		$scope.previousSlide = function(){
			$ionicSlideBoxDelegate.previous();
		}
		$scope.SERVER_ADDRESS = SERVER_ADDRESS;
		GetTimeline();
		function GetTimeline() {
			$ionicLoading.show({
				template: 'Loading...'
			});
			$http.get(SERVER_ADDRESS + '/dares/timeline/'+$localStorage.user.id).success(function (result) {
				$ionicLoading.hide();
				$scope.challenges = result ;
				$scope.$broadcast('scroll.refreshComplete');
			});
		};

	});
