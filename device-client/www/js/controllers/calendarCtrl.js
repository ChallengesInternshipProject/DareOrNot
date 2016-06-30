
angular.module('starter.controllers')
	.factory('moment', function ($window) {
	        return $window.moment;
	})
  	.controller('CalendarCtrl', function ($scope, $http, $ionicLoading, SERVER_ADDRESS, $state, $localStorage,$ionicSlideBoxDelegate) {
  		$scope.weekDays = ['Пон','Вт','Срд','Чтв','Пт','Съб','Нед']
		$scope.SERVER_ADDRESS = SERVER_ADDRESS+':3000/';
  		GetCalendar();


  		$scope.nextSlide = function() {
			$ionicSlideBoxDelegate.next();
		}
		$scope.previousSlide = function(){
			$ionicSlideBoxDelegate.previous();
		}
		$scope.doRefresh = function () {
			GetCalendar();
		};
		
		$scope.changeDate=function(year,month){
			GetCalendar(year,month)
			$scope.challenges = [];
		}

		$scope.getEvents=function(year,month,day,hasEvents){
			if(!hasEvents) {
				$scope.challenges = [];
				return;
			}
			GetEvents(year,month,day);
		}
		function GetCalendar(year,month) {
			if (year == undefined) year = new moment().format('YYYY');
			if (month == undefined) month = new moment().format('M');
			
			$ionicLoading.show({
				template: 'Loading...'
			});
			
			$http.get(SERVER_ADDRESS + ':3000/calendar/'+$localStorage.id+'/'+year+'/'+month).success(function (result) {
				$ionicLoading.hide();
				$scope.calendar = result ;
				$scope.weeks=[];
				for(var i = 1; i <= $scope.calendar.weeks ; i++){
					$scope.weeks.push(i)
				}

				$scope.$broadcast('scroll.refreshComplete');
			});
		};

		function GetEvents(year,month,day) {
			if (year == undefined) year = new moment().format('YYYY');
			if (month == undefined) month = new moment().format('M');
			if (day == undefined) day == new moment().format('d');

			$ionicLoading.show({
				template: 'Loading...'
			});
			
			$http.get(SERVER_ADDRESS + ':3000/calendar/events/'+$localStorage.id+'/'+year+'/'+month+'/'+day).success(function (result) {
				$ionicLoading.hide();
				$scope.challenges=result;
				$scope.$broadcast('scroll.refreshComplete');
			});
		};
  });
