angular.module('starter')
  .factory('AuthFactory', function ($timeout, $ionicModal, LoginService, StorageFactory) {

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

    var isAuthenticated = function () {
      return StorageFactory.get('success');
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
