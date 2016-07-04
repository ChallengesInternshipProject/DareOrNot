angular.module('starter.controllers')

  .controller('LoginCtrl', function ($scope, $http, LoginService, $ionicLoading, $q, $ionicPopup, $state, $localStorage, $sessionStorage, $log, $ionicSideMenuDelegate, FacebookService) {

    //Object for the facebook register/login popup
    $scope.data = {
      password: ''
    };

    $scope.toggleLeft = function () {
      $log.info('called');
      $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.facebookSignIn = function () {
      return FacebookService.facebookSignIn();
    };

    // TODO put the code in the service
    // $scope.googleSignIn = function () {
    //   return GoogleService.googleSignIn();
    // };
    // $scope.googleSignIn = function () {
    //   $ionicLoading.show({
    //     template: 'Logging in...'
    //   });
    //
    //   window.plugins.googleplus.login(
    //     {},
    //     function (user_data) {
    //       // For the purpose of this example I will store user data on local storage
    //       LoginService.setUser({
    //         userID: user_data.userId,
    //         name: user_data.displayName,
    //         email: user_data.email,
    //         picture: user_data.imageUrl,
    //         accessToken: user_data.accessToken,
    //         idToken: user_data.idToken
    //       });
    //
    //       $ionicLoading.hide();
    //       $state.go('starter.users');
    //     },
    //     function (msg) {
    //       $ionicLoading.hide();
    //     }
    //   );
    // };
    // $log.info(LoginService.getUser());


    $scope.$storage = $localStorage.$default({
      user: null
    });
    $scope.login = function () {
      LoginService.loginUser($scope.data.email, $scope.data.password)
        .success(function (data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Login Successful!',
            template: "Hello " + data.email
          });
          $scope.$storage.user = data.email;
          $log.info($scope.$storage.user);
          // $state.go('tab.chats');
        })
        .error(function (data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: 'Invalid credentials!'
          });
        });
    }
  });
