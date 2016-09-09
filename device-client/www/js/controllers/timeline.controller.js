angular.module('starter.controllers')
	.controller('TimelineCtrl', function (
		$scope,
		$http,
		$ionicLoading,
		SERVER_ADDRESS,
		$state,
		$localStorage,
		$ionicSlideBoxDelegate,
		DaresResolver,
		$log,
		DareService,
		$state
		) {
		$scope.doRefresh = function () {
			$scope.dares = DareService.list($state.params ,$state.current.url == "/mydares" ? false : true);
		};
		$scope.nextSlide = function() {
			$ionicSlideBoxDelegate.next();
		}
		$scope.previousSlide = function(){
			$ionicSlideBoxDelegate.previous();
		}
		$scope.SERVER_ADDRESS = SERVER_ADDRESS;
		$scope.dares = DaresResolver;
		if ($state.current.name === 'mydares') {
			$scope.showBackButton = true;
		}
		$scope.goToDare = function(dareID){
			$state.go('app.dare',{dareID:dareID})
		}
	});
