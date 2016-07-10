angular.module('starter')
  .factory('AuthFactory', function ($log, $timeout, $ionicModal, LoginService, FacebookService) {

    var currentUser = null;

    var loginUser = function (username, password) {
      return LoginService.loginUser(username, password)
        .success(function (result) {
          currentUser = result;
        })
        .error(function (error) {
          $log.info(error);
        });
    };
    var loginWithFacebook = function () {
      FacebookService.facebookSignIn();
    };

    var isAuthenticated = function () {
      return currentUser ? true : false;
    };

    var getCurrent = function () {
      return isAuthenticated() ? currentUser : null;
    };

    return {
      loginUser: loginUser,
      isAuthenticated: isAuthenticated,
      getCurrent: getCurrent
    }
  });
