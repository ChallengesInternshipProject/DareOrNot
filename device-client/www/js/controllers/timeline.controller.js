angular.module('starter.controllers')
	.controller('TimelineCtrl', function (
		$scope,
		$http,
		$ionicLoading,
		SERVER_ADDRESS,
		$state,
		$localStorage,
		$ionicSlideBoxDelegate,
		$log,
		DareService
		) {
	
		$scope.dares = [];
		$scope.SERVER_ADDRESS = SERVER_ADDRESS;
		$scope.$on("$ionicView.beforeEnter", function(event, data){
		 	$scope.doRefresh()
		});
		
		 $scope.doRefresh = function () {
		 	$ionicLoading.show();
		 	DareService.list($state.params ,$state.current.url == "/mydares" ? false : true).then(function(result){
				$scope.dares= result
				$scope.$broadcast('scroll.refreshComplete');
				$ionicLoading.hide();
			})
		};
		$scope.nextSlide = function() {
			$ionicSlideBoxDelegate.next();
		}
		$scope.previousSlide = function(){
			$ionicSlideBoxDelegate.previous();
		}
	
		$scope.goToDare = function(dareID){
			$state.go('app.dare',{dareID:dareID})
		}
	});
