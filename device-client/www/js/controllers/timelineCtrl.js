angular.module('starter.controllers')
	.controller('TimelineCtrl', function ($scope, $http, $ionicLoading, SERVER_ADDRESS, $state, $localStorage, $ionicSlideBoxDelegate,StorageFactory) {

		$scope.doRefresh = function () {
			GetTimeline();
		};

		$scope.nextSlide = function() {
			$ionicSlideBoxDelegate.next();
		}
		$scope.previousSlide = function(){
			$ionicSlideBoxDelegate.previous();
		}
		$scope.SERVER_ADDRESS = SERVER_ADDRESS+':3000/';
		GetTimeline();
		function GetTimeline() {
			$ionicLoading.show({
				template: 'Loading...'
			});
			$http.get(SERVER_ADDRESS + ':3000/timeline/'+StorageFactory.get('id')).success(function (result) {
				$ionicLoading.hide();
				$scope.challenges = result ;
				$scope.$broadcast('scroll.refreshComplete');
			});
		};

	});
