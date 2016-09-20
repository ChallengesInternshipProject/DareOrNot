angular.module('starter').config(function (
	$stateProvider,
	$urlRouterProvider,
	ionicDatePickerProvider,
	$ionicConfigProvider,
	ChartJsProvider,
	$sceDelegateProvider,
	$localStorageProvider
	) {
	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js

	$ionicConfigProvider.tabs.position('top'); //bottom

	//Check if the user is authenticated
	function isAuthenticated($q, $state, $log, $timeout, AuthFactory) {
		var data = {};
		if (AuthFactory.isAuthenticated()) {
			//$log.info('You are 100% logged no scam !');
			return $q.when();
		} else {
			// console.log('false')
			$timeout(function () {
				// modal.loginModal.show();
				console.log('not logged');
				// $state.go('tab.home');
				//Refresh the state because $state.go is not working !!! IMPORTANT
				$state.go("login");
			}, 0);
			return $q.reject();
		}
	}


	var datePickerObj = {
		inputDate: new Date(),
		setLabel: 'Избери',
		todayLabel: 'Днес',
		closeLabel: 'Затвори',
		mondayFirst: true,
		weeksList: ["S", "M", "T", "W", "T", "F", "S"],
		monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
		templateType: 'modal',
		from: new Date(2012, 8, 1),
		to: new Date(2018, 8, 1),
		showTodayButton: false,
		//dateFormat: 'dd MMMM yyyy',
		closeOnSelect: true,
	};
	ionicDatePickerProvider.configDatePicker(datePickerObj);

	$stateProvider

	// setup an abstract state for the tabs directive
		

		.state('login', {
			url: '/login',
			templateUrl: 'templates/modals/login-modal.html',
			controller: 'LoginCtrl'
		})
		.state('app', {
			url: '/app',
			abstract: true,
			templateUrl: 'templates/side-menu/side-menu.html',
			controller: 'SideMenuCtrl',
			
		})
		.state('app.home', {
			url: '/home',
			views : {
				'menuContent' : {
					templateUrl: 'templates/tab-home.html',
					controller: 'HomeCtrl',
					resolve: {
						UserResolver: ['UserService', function (UserService) {
							return UserService.getAllUsers().then(function (data) {
								return data
							})
						}]
					}
				}
			}
		})
		
		.state('app.search', {
			url: '/search',
			views : {
				'menuContent' : {
					templateUrl: 'templates/tab-search.html',
					controller: 'SearchCtrl'
				}
			}
		})

		.state('app.map', {
			url: '/map',
			views : {
				'menuContent' : {
					templateUrl: 'templates/tab-gMaps.html',
					controller: 'GoogleMapCtrl'
				}
			}
		})

		.state('app.calendar', {
			url: '/calendar',
			views : {
				'menuContent' : {
					templateUrl: 'templates/tab-calendar.html',
					controller: 'CalendarCtrl',
				}
			}
		})
		.state('app.timeline', {
			url: '/timeline',
			views : {
				'menuContent' : {
					templateUrl: 'templates/tab-timeline.html',
					controller: 'TimelineCtrl',
				}
			},
			resolve: {
				isAuthenticated: isAuthenticated,
			}
		})
		.state('app.categories', {
			url: '/categories',
			views : {
				'menuContent' : {
					templateUrl: 'templates/tab-categories.html',
					controller: 'CategoriesCtrl'
				}
			}
		})
		.state('app.history', {
			url: '/history',
			views : {
				'menuContent' : {
					templateUrl: 'templates/_app/history.html',
					controller: 'HistoryCtrl'
				}
			}
		})
		.state('app.funny',{
			url: '/funny',
			params:{
				category:1
			},
			views : {
				'menuContent' : {
					templateUrl: 'templates/tab-timeline.html',
					controller: 'TimelineCtrl',
				}
			}
		})
		.state('app.business',{
			url: '/business',
			params:{
				category:2
			},
			views : {
				'menuContent' : {
					templateUrl: 'templates/tab-timeline.html',
					controller: 'TimelineCtrl',
				}
			}
		
		})
		.state('app.price',{
			url: '/price',
			params:{
				category:3
			},
			views : {
				'menuContent' : {
					templateUrl: 'templates/tab-timeline.html',
					controller: 'TimelineCtrl',
				}
			}
		})
		.state('app.charity',{
			url: '/charity',
			params:{
				category:4
			},
			views : {
				'menuContent' : {
					templateUrl: 'templates/tab-timeline.html',
					controller: 'TimelineCtrl',
				}
			}
		})
		
		.state('app.statistics', {
			url: '/statistics',
			views : {
				'menuContent' : {
					templateUrl: 'templates/tab-statistics.html',
					controller: 'StatisticsCtrl'	
				}
			}
		})
		.state('app.contacts', {
			url: '/contacts',
			views : {
				'menuContent' : {
					templateUrl: 'templates/tab-contacts.html',
					controller: 'ContactsCtrl'
				}
			}
		})
		.state('app.newdare',{
			url : '/newdare',
			views : {
				'menuContent' : {
					templateUrl: 'templates/tab-new-dare.html',
					controller: 'DareCtrl',
					resolve: {
						isAuthenticated: isAuthenticated,
						FriendsResolver: ['UserService', '$localStorage', function (UserService, $localStorage) {
							return UserService.getFriends($localStorage.user.data._id, 'Accepted', "").then(function (data) {
								return data
							})
						}
					]}
				}
			}
		})

		.state('app.chat',{
			url : '/chat',
			views : {
				'menuContent' : {
					templateUrl: 'templates/tab-chat.html',
					controller: 'ChatCtrl'
				}
			}
		})

		.state('app.chat-details', {
			url: '/chat/:userID',
				views : {
				'menuContent' : {
					templateUrl: 'templates/tab-chat-detail.html',
					controller: 'ChatDetailCtrl',
				}
			}
		})
		.state('app.activity',{
			url : '/activity',
			views : {
				'menuContent' : {
					templateUrl: 'templates/side-menu/activity.html',
					controller: 'ActivityCtrl',
					resolve:{
						notifications : ['NotificationService','$localStorage',function(NotificationService,$localStorage){
							console.log("triggered");
							return NotificationService.getAll($localStorage.user.data._id);
						}]
					}
				}
			}
		})
		.state('app.profile',{
			url: '/profile',
			views : {
				"menuContent" : {
					templateUrl: 'templates/side-menu/profile.html',
					controller: 'ProfileCtrl',
					resolve : {
						notificationsCount : ['NotificationService','$localStorage',	 function(NotificationService,$localStorage){
							return   NotificationService.getUnseen($localStorage.user.data._id)
		    						.then(function(result){
		    							return result.length
		  						})
						}]
					}
				}
			}
		})
		.state('app.mydares',{
			url: '/mydares',
			params: {
				title : {$ne : null},
				description : { $ne : null},
				endDate : {$gt : new Date()},
				_creator :$localStorageProvider.get('user') ?$localStorageProvider.get('user').data._id : null ,
			},
			views : { 
				'menuContent' : {
					templateUrl: 'templates/tab-timeline.html',
					controller: 'TimelineCtrl',
				}
			}
		})
		.state('friends', {
			url: '/friends',
			views : {
				'menuContent' : {
					templateUrl: 'templates/tab-friends.html',			
				}
			}
		})
		.state('friends.all', {
			url: '/all',
			views: {
				'app-friends-all': {
					templateUrl: 'templates/tab-friends-all.html',
					controller: 'UsersCtrl',
					resolve: {
						friendsPromise: ['UserService', '$localStorage', function (UserService, $localStorage) {
							return UserService.getFriends($localStorage.user.data._id, 'Accepted', '').then(function (data) {
								return data
							})
						}]
					}
				}
			}
		})
		.state('friends.active', {
			url: '/active',
			views: {
				'app-friends-active': {
					templateUrl: 'templates/tab-friends-active.html',
					controller: 'UsersCtrl',
					resolve: {
						friendsPromise: ['UserService', '$localStorage', function (UserService, $localStorage) {
							return UserService.getFriends($localStorage.user.data._id, 'Accepted', '').then(function (data) {
								return data
							})
						}]
					}
				}
			}
		})
		.state('app.notifications',{
			url : '/notifications',
			views : {
				'menuContent' : {
					templateUrl: 'templates/side-menu/notifications.html',
					controller: 'ActivityCtrl',
					resolve:{
						notifications : ['NotificationService','$localStorage',function(NotificationService,$localStorage){
							return NotificationService.getAll($localStorage.user.data._id);
						}]
					}
				}
			}
		})
		.state('app.settings',{
			url : '/settings',
			views : {
				'menuContent' : {
					templateUrl: 'templates/side-menu/settings.html',
				}
			}
			// controller: 'A'
		})
		.state('favorites',{
			url : '/favorites',
			views : {
				'menuContent' : {
					templateUrl: 'templates/side-menu/favorites.html',
				}
			}
			// controller: 'A'
		})
		.state('app.dare',{
			url : '/dare/:dareID',
			params : {
				dareID:null
			},
			views : {
				'menuContent' : {
					templateUrl: 'templates/tab-single-dare.html',
					controller: 'SingeDareCtrl',
					 resolve : { 
				        dare : [ 'DareService','$stateParams', function(DareService,$stateParams) { 
				            return DareService.get($stateParams.dareID);    
				          } 
				        ] 
				      } 
				}
			}
		})
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/login');

		// .state('tab', {
		// 	url: '/tab',
		// 	abstract: true,
		// 	templateUrl: 'tabs.html'

		// 	// Each tab has its own nav history stack:
		// })
		

		// .state('tab.register', {
		// 	url: '/register',
		// 	views: {
		// 		'tab-register': {
		// 			templateUrl: 'templates/tab-register.html',
		// 			controller: 'RegisterCtrl'
		// 		}
		// 	}
		// })

		// .state('tab.users', {
		// 	url: '/users',
		// 	views: {
		// 		'tab-users': {
		// 			templateUrl: 'templates/tab-users.html',
		// 			controller: 'UsersCtrl',
		// 			resolve: {
		// 				isAuthenticated: isAuthenticated
		// 			}
		// 		}
		// 	}
		// })
		// .state('tab.user-details', {
		// 	url: '/user/:userID',
		// 	views: {
		// 		'tab-users': {
		// 			templateUrl: 'templates/tab-user-detail.html',
		// 			controller: 'UserDetailCtrl',
		// 			resolve: {
		// 				isAuthenticated: isAuthenticated
		// 			}
		// 		}
		// 	}
		// })
		// .state('tab.chat', {
		// 	url: '/chat',
		// 	views: {
		// 		'tab-chat': {
		// 			templateUrl: 'templates/tab-chat.html',
		// 			controller: 'ChatCtrl',
		// 			resolve: {
		// 				isAuthenticated: isAuthenticated
		// 			}
		// 		}
		// 	}
		// })
		// .state('tab.chat-details', {
		// 	url: '/chat/:userID',
		// 	views: {
		// 		'tab-chat': {
		// 			templateUrl: 'templates/tab-chat-detail.html',
		// 			controller: 'ChatDetailCtrl',
		// 			resolve: {
		// 				isAuthenticated: isAuthenticated
		// 			}
		// 		}
		// 	}
		// })
		// // .state('tab.map', {
		// //   url: '/map',
		// //   views: {
		// //     'tab-map': {
		// //       templateUrl: 'templates/tab-map.html',
		// //       controller: 'MapCtrl',
		// //       resolve: {
		// //         isAuthenticated: isAuthenticated
		// //       }
		// //     }
		// //   }
		// // })
		// .state('tab.gMaps', {
		// 	url: '/gMaps',
		// 	views: {
		// 		'tab-gMaps': {
		// 			templateUrl: 'templates/tab-gMaps.html',
		// 			controller: 'GoogleMapCtrl',
		// 			// resolve: {
		// 			//   isAuthenticated: isAuthenticated
		// 			// }
		// 		}
		// 	}
		// })

		// .state('tab.dare-list', {
		// 	url: '/dare-list',
		// 	views: {
		// 		'tab-dare-list': {
		// 			templateUrl: 'templates/tab-dare-list.html',
		// 			controller: 'DareListCtrl',
		// 			resolve: {
		// 				isAuthenticated: isAuthenticated
		// 			}
		// 		}
		// 	}
		// })


		// .state('tab.calendar', {
		// 	url: '/calendar',
		// 	views: {
		// 		'tab-calendar': {
		// 			templateUrl: 'templates/tab-calendar.html',
		// 			controller: 'CalendarCtrl',
		// 			resolve: {
		// 				isAuthenticated: isAuthenticated
		// 			}
		// 		}
		// 	}
		// })

		// .state('tab.home', {
		// 	url: '/home',
		// 	views: {
		// 		'tab-home': {
		// 			templateUrl: 'templates/tab-home.html',
		// 			controller: 'HomeCtrl'
		// 		}

		// 	}
		// })
		// .state('tab.walkthrough', {
		// 	url: '/walkthrough',
		// 	views: {
		// 		'tab-walkthrough': {
		// 			templateUrl: 'templates/tab-walkthrough.html',
		// 			controller: 'CardsCtrl'
		// 		}
		// 	}
		// })

		// .state('tab.landing', {
		// 	url: '/landing',
		// 	views: {
		// 		'tab-landing': {
		// 			templateUrl: 'templates/tab-landing.html'
		// 			// controller: 'CategoriesCtrl'
		// 		}
		// 	}
		// });



	


});
