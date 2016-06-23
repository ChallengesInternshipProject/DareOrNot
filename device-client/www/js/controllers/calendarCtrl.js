angular.module('starter.controllers')

  .controller('CalendarCtrl', function ($scope, $http, $log, $state, $stateParams) {
   	console.log( new Date(Date.UTC(2016,5,24)))
   	$scope.calendarEvents =[
   		{
	   		"title":"First event",
	   		"startTime": new Date(Date.UTC(2016,5,24)),
	   		"endTime": new Date(Date.UTC(2016,5, 26))
	   	},
	   	{
	   		"title":"Second event",
	   		"startTime": new Date(Date.UTC(2016,5,25)),
	   		"endTime": new Date(Date.UTC(2016,5, 27))
	   	},
	   	{
	   		"title":"Third event",
	   		"startTime": new Date(Date.UTC(2016,5,24)),
	   		"endTime": new Date(Date.UTC(2016,5, 26))
	   	}
   	];

   	
   	
   	console.log($scope.calendarEvents)
   	
  });
