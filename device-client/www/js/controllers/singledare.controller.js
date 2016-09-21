angular.module('starter.controllers').controller('SingeDareCtrl', [
	'$scope',
	'$state',
	'DareService',
	'$stateParams',
	'dare',
	'$localStorage',
<<<<<<< HEAD
=======
	'$log',
	'$ionicLoading',
	'$ionicModal',
	'dare',
>>>>>>> master_css_rework
	function (
	$scope,
	$state,
	DareService,
	$stateParams,
<<<<<<< HEAD
	dare,
	$localStorage
) {
		// $scope.dare = DareService.get($stateParams.dareID);
		$scope.dare=dare;
		console.log(dare)
=======
	$localStorage,
	$log,
	$ionicLoading,
	$ionicModal,
	dare
) {
		$scope.dare = dare;
>>>>>>> master_css_rework
		$scope.FileService ={};
		$scope.FileService.processFiles = function(files){
			angular.forEach(files, function(flowFile, i){
				var fileReader = new FileReader();
				fileReader.onload = function (event) {
					DareService.addProve(event.target.result,$stateParams.dareID,$localStorage.user.data._id).then(function(){
<<<<<<< HEAD
						$state.go('app.timeline')
=======
						$state.go('app.timeline');
>>>>>>> master_css_rework
					});
				};
				fileReader.readAsDataURL(flowFile.file);
			});
		}
}]);
