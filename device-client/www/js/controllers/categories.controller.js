angular.module('starter.controllers')

  .controller('CategoriesCtrl', function ($scope,CategoryService) {
  		$scope.categories = CategoryService.getAllGategories();	
  });
