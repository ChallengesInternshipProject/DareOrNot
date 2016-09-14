/* Created by evgeni-tsn on 20-Jun-2016. */

angular.module('starter.controllers').controller('DareCtrl', function (
	$scope,
	$http,
	$log,
	$ionicLoading,
	$ionicModal,
	SERVER_ADDRESS,
	SERVER_PORT,
	$localStorage,
	UserService,
	DareService,
	CategoryService,	
	SERVER_ADDRESS,
	FriendsResolver,
	$state,
	FileService
) {
	// inital form data
	$scope.data = {
		title : "New Dare",
		description : new Date(),
		isPrivate:true,
		_creator:	$localStorage.user.data._id,
		socialNetworks : {
			facebook : false,
			twitter : false,
			googlePlus : false
		},
		invitedUsers : [],
	};

	//Friends
	$scope.friends = FriendsResolver;
	
	// Get Categories
	$scope.categories = CategoryService.getAllGategories();
	//Files 
	$scope.FileService = FileService
	$scope.data.fileData =$scope.FileService.fileData
	
	$scope.toggleSocial = function(network){
		$scope.data.socialNetworks[network]  = !$scope.data.socialNetworks[network];
		
	}
	$scope.submitDare = function () {
			// $ionicLoading.show({
			// 	template: 'Loading...'
			// });
			$scope.data.invitedUsers =[]
			//Set the selected friends into the friends array for the post request
			angular.forEach($scope.data.friends, function (value, key) {
					if ($scope.data.friends[key]) {
							$scope.data.invitedUsers.push(key);
					}
			});
		
			DareService.create($scope.data).then(function(){
				$state.go("app.timeline")
			});
	};

	//Load the Add Friends modal
	$ionicModal.fromTemplateUrl('templates/modals/friends-modal.html', {
			scope: $scope,
			animation: 'slide-in-up'
	}).then(function (modal) {
			$scope.friendsModal = modal;
	});

	
});
