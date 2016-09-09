angular.module('starter.controllers').controller('SingeDareCtrl', [
	'$scope',
	'$state',
	'DareService',
	'$stateParams',
	'dare',
	function (
	$scope,
	$state,
	DareService,
	$stateParams,
	dare
) {
		// $scope.dare = DareService.get($stateParams.dareID);
		$scope.dare=dare;
}]);
