angular.module('starter.controllers')
  .controller('SearchCtrl', function (
  	$scope, 
  	UserService,
  	$localStorage,
  	$log
  ){
  	$scope.results = [];

  	$scope.search = function(){
  		UserService.getNonFriends($localStorage.user.id, $scope.searchString)
  	}

  });