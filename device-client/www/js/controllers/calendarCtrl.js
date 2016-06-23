
angular.module('starter.controllers')
	.factory('moment', function ($window) {
	        return $window.moment;
	})
  	.controller('CalendarCtrl', function ($scope, $http, $ionicLoading, SERVER_ADDRESS, $state, $localStorage) {

		$scope.doRefresh = function () {
			// GetTimeline();
		};
		
		$scope.nextMonth = function() {
			$ionicSlideBoxDelegate.next();
		}

		$scope.previousMonth = function(){
			$ionicSlideBoxDelegate.previous();
		}

		$scope.SERVER_ADDRESS = SERVER_ADDRESS+':3000/';

		// GetTimeline();
		
		function GetCalendar(year,month) {
			if (year == undefined) year = new moment().format('YYYY');
			if (month == undefined) month = new moment().format('M');
			
			$ionicLoading.show({
				template: 'Loading...'
			});
			
			$http.get(SERVER_ADDRESS + ':3000/calendar/'+$localStorage.id).success(function (result) {
				$ionicLoading.hide();
				$scope.challenges = result ;
				$scope.$broadcast('scroll.refreshComplete');
			});
		};
  });
