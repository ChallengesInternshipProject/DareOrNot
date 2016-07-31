angular.module('starter.controllers')
.factory('moment', function ($window) {
	return $window.moment;
})
.controller('ActivityCtrl', function ($scope, $http, $q, $ionicPopup, $state, $localStorage, $sessionStorage, $log, $ionicHistory) {
	// $scope.shouldShowDelete = false;
	// $scope.shouldShowReorder = false;
	// $scope.listCanSwipe = true
	$scope.GoBack = function() {
		$ionicHistory.goBack();
	};
	$scope.activities = [
		{
			message:"Наблюдава 5 ваши предизвикателства",
			user : {
				name : "Петър Георгиев",
				avatar : "img/Activities/u1.jpg"
			},
			count : 5 ,
			lastUpdated : new moment().subtract(15, 'm').fromNow(),
			pictures:[
				'img/Activities/1.jpg',
				'img/Activities/2.jpg',
				'img/Activities/3.jpg',
				'img/Activities/9.jpg',
				'img/Activities/5.jpg',
			]
		},
		{
			message:"Ви следва",
			user : {
				name : "Мирела Минчева",
				avatar : "img/Activities/u2.jpg"
			},
			count : 5 ,
			lastUpdated : new moment().subtract(15, 'm').fromNow(),
			
		},
		{
			message:"Коментира ваше видео",
			user : {
				name : "Станислава Мартиова",
				avatar : "img/Activities/u3.jpg"
			},
			count : 5 ,
			lastUpdated : new moment().subtract(34, 'm').fromNow(),
			text : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium facilis vel, doloremque consequuntur corporis esse laudantium incidunt, velit eveniet a voluptate? Eaque officia, molestias architecto similique perspiciatis, libero assumenda vero!"
		},
		{
			message:"Наблюдава 3 ваши предизвикателства",
			user : {
				name : "Мирела Минчева",
				avatar : "img/Activities/u2.jpg"
			},
			count : 5 ,
			lastUpdated : new moment().subtract(34, 'm').fromNow(),
			pictures:[
				'img/Activities/6.jpg',
				'img/Activities/7.jpg',
				'img/Activities/8.jpg',
			]
		},
		{
			message:"Коментира ваша снимка",
			user : {
				name : "Петър Георгиев",
				avatar : "img/Activities/u1.jpg"
			},
			count : 5 ,
			lastUpdated : new moment().subtract(34, 'm').fromNow(),
			text : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium facilis vel, doloremque consequuntur corporis esse laudantium incidunt, velit eveniet a voluptate? Eaque officia, molestias architecto similique perspiciatis, libero assumenda vero!"
		},

	]

});
