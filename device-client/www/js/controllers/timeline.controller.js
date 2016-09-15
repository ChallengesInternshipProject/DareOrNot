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
		 $scope.doRefresh = function () {
		 	console.log("doRefresh")
		 	DareService.list($state.params ,$state.current.url == "/myDare" ? false : true).then(function(result){
				$scope.dares  = result;
				console.log(result);		
				$scope.$broadcast('scroll.refreshComplete');
			})
		};
		$scope.nextSlide = function() {
			$ionicSlideBoxDelegate.next();
		}
		$scope.previousSlide = function(){
			$ionicSlideBoxDelegate.previous();
		}
		$scope.SERVER_ADDRESS = SERVER_ADDRESS;
		if ($state.current.name === 'mydares') {
			$scope.showBackButton = true;
		}
		$scope.goToDare = function(dareID){
			$state.go('app.dare',{dareID:dareID})
		}

		$scope.$on("$ionicView.beforeEnter", function(event, data){
			$scope.doRefresh();
		});
	});
