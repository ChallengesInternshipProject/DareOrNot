angular.module('starter.controllers').controller('SingeDareCtrl', [
	'$scope',
	'$state',
	'DareService',
	'$stateParams',
	'dare',
	'$localStorage',
	function (
	$scope,
	$state,
	DareService,
	$stateParams,
	dare,
	$localStorage
) {
		// $scope.dare = DareService.get($stateParams.dareID);
		$scope.dare=dare;
		console.log(dare)
		$scope.FileService ={};
		$scope.FileService.processFiles = function(files){
			angular.forEach(files, function(flowFile, i){
				var fileReader = new FileReader();
				fileReader.onload = function (event) {
					DareService.addProve(event.target.result,$stateParams.dareID,$localStorage.user.data._id).then(function(){
						$state.go('app.timeline')
					});
				};
				fileReader.readAsDataURL(flowFile.file);
			});
		}
}]);
