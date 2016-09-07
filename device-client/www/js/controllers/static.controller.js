angular.module('starter.controllers')
	.controller('StaticCtrl',['$scope','$ionicHistory','$state','$log', function (
		$scope,
		$ionicHistory,
		$state,
		$log
	){
		$scope.goBack = function(){
			var stateId = $ionicHistory.backView() ? $ionicHistory.backView().stateId : 'app.home';
			$log.info($ionicHistory.viewHistory());
			$state.go(stateId);
		}
}]);