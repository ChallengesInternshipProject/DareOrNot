angular.module('starter.controllers').controller('SingeDareCtrl', [
	'$scope',
	'$state',
	'DareService',
	'$stateParams',
	'$localStorage',
	'$log',
	'$ionicLoading',
	'$ionicModal',
	'dare',
	function (
	$scope,
	$state,
	DareService,
	$stateParams,
	$localStorage,
	$log,
	$ionicLoading,
	$ionicModal,
	dare
) {
		$scope.dare = dare;
		$scope.FileService ={};
		$scope.FileService.processFiles = function(files){
			angular.forEach(files, function(flowFile, i){
				var fileReader = new FileReader();
				fileReader.onload = function (event) {
					DareService.addProve(event.target.result,$stateParams.dareID,$localStorage.user.data._id).then(function(){
						$state.go('app.timeline');
					});
				};
				fileReader.readAsDataURL(flowFile.file);
			});
		}
		$ionicModal.fromTemplateUrl('templates/modals/view-file.html', {
		    scope: $scope,
		    animation: 'slide-in-up'
		  }).then(function(modal) {
		    $scope.modal = modal;
		  });

		$scope.openFile = function(fileID){
			for(var index  in $scope.dare.proves) {
				if ($scope.dare.proves[index]._id == fileID){
					$scope.modalFile = $scope.dare.proves[index].fileString;
					$scope.modal.show()
				}
			}
		}
		$scope.openFile2 = function(fileID){
			for(var index  in $scope.dare.pictures) {
				if ($scope.dare.pictures[index]._id == fileID){
					$scope.modalFile = $scope.dare.pictures[index].fileString;
					$scope.modal.show()
				}
			}
		}
}]);
