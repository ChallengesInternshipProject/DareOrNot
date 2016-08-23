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
	$state
) {

	//Friends
	$scope.friends = FriendsResolver;
	// Get Categories
	$scope.categories = CategoryService.getAllGategories();
	
	// inital form data
	$scope.data = {
		isPrivate:true,
		_creator:	$localStorage.user.data._id,
		socialNetworks : {
			facebook : false,
			twitter : false,
			googlePlus : false
		},
		invitedUsers : []
	};


	$scope.toggleSocial = function(network){
		$scope.data.socialNetworks[network]  = !$scope.data.socialNetworks[network];
		
	}
	$scope.submitDare = function () {
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
