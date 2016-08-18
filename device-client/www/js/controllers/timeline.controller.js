angular.module('starter.controllers')
	.controller('TimelineCtrl', function (
		$scope,
		$http,
		$ionicLoading,
		SERVER_ADDRESS,
		$state,
		$localStorage,
		$ionicSlideBoxDelegate,
		DareService
	 ) {

		$scope.doRefresh = function () {
			GetTimeline();
		};

		$scope.nextSlide = function() {
			$ionicSlideBoxDelegate.next();
		}
		$scope.previousSlide = function(){
			$ionicSlideBoxDelegate.previous();
		}
		$scope.SERVER_ADDRESS = SERVER_ADDRESS;
		GetTimeline();
		function GetTimeline() {
			$ionicLoading.show({
				template: 'Loading...'
			});
			DareService.list({$or:[{_id:$localStorage.user.data._id},{isPublic:true}]}).then(function(result){
				$ionicLoading.hide();
				$scope.challenges = result ;
				$scope.$broadcast('scroll.refreshComplete');
			})
		}



	

	});
