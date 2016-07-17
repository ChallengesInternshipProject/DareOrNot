angular.module('starter')
  .factory('AuthFactory', function ($log, $timeout, $localStorage, $ionicModal, LoginService, FacebookService) {

    var currentUser = $localStorage.user;

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
      return $localStorage.isLogged ? true : false;
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
