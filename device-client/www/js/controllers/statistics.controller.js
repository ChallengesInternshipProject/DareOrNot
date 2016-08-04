angular.module('starter.controllers')
.controller('StatisticsCtrl', function ($scope, $http) {
	$scope.options = {
		legend : {
			position :'top'
		}
	}
	$scope.labels = ["Dec", "Nov", "Sep", "Aug", "Jul", "Jun", "May", "Apr", "Mar", "Feb", "Jan","Dec 1" ];
	$scope.series = ['Предизвикателства', 'Завършени','Спечелени'];
	$scope.data = [
		[65, 59, 80, 81, 56, 55, 40,5,10,18,12,12,0],
		[28, 48, 40, 19, 86, 27, 90,50,68,75,80,24,0],
		[30,50,45,87,96,87,96,58,3,2,52,51,12,0]
	];
});