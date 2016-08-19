/* Created by evgeni-tsn on 20-Jun-2016. */

angular.module('starter.controllers')
	.directive('ngFiles', ['$parse', function ($parse) {
		function fn_link(scope, element, attrs) {
			var onChange = $parse(attrs.ngFiles);
			element.on('change', function (event) {
				onChange(scope, { $files: event.target.files });
			});
		};

		return {
			link: fn_link
		}
	} ])
	.controller('DareCtrl', function (
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
			ionicDatePicker,	
			SERVER_ADDRESS,
			FriendsResolver
		) {
			var formdata = new FormData();
				$scope.getTheFiles = function ($files) {
						angular.forEach($files, function (value, key) {
								formdata.append(key, value);
						});
				};

			// NOW UPLOAD THE FILES.
			$scope.uploadFiles = function () {

							var request = {
											method: 'POST',
											url: 'http://localhost/files/',
											data: formdata,
											headers: {
															'Content-Type': undefined
											}
							};
							console.log(formdata)
							// SEND THE FILES.
							// $http(request)
							// 				.success(function (d) {
							// 								alert(d);
							// 				})
							// 				.error(function () {
							// 				});
			}
												
			$scope.testFile = function(){
				console.log($scope.dataFile);
			}
			var idpStartDate = {
					callback: function (val) { 
						resultDate = new Date(val).toLocaleDateString()
						$scope.data.startDate = resultDate;
						console.log(resultDate)
					},
			};

			$scope.openDatePicker = function(){
					ionicDatePicker.openDatePicker(idpStartDate);
			};
			$scope.categories = CategoryService.getAllGategories();
			// inital form data
			$scope.data = {
				isPrivate:true,
				_cretaor:			
$localStorage.user.data._id
			};
			//Friends
			$scope.friends = FriendsResolver;
			$log.info($scope.friends);
			//Array with friends by ID's
			$scope.data.invitedUsers = [];
			$scope.choice = [];

			$scope.submitDare = function () {
					// $scope.friendsForInvite = [];
					//Set the selected friends into the friends array for the post request
					angular.forEach($scope.data.friends, function (value, key) {
							if ($scope.data.friends[key]) {
									$scope.data.invitedUsers.push(key);
							}
					});
					DareService.create($scope.data);
					
			};

			//Load the Add Friends modal
			$ionicModal.fromTemplateUrl('templates/modals/friends-modal.html', {
					scope: $scope,
					animation: 'slide-in-up'
			}).then(function (modal) {
					$scope.friendsModal = modal;
			});

			


	});
