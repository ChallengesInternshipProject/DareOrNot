angular.module('starter.services')
  .service('LoginService', function ($q, $http, $log, $ionicLoading, $ionicPopup, RegisterService, SERVER_ADDRESS, SERVER_PORT, SOCKET_CHAT_PORT) {

    
      // Save the user after the Facebook login/registration in the database with a ionicPopup for the password with a local login.
      var setUser = function (user_data) {
        RegisterService.registerUser(user_data);
        $ionicLoading.hide();
        window.localStorage.starter_facebook_user = JSON.stringify(user_data);
      };

      var getUser = function () {
        return JSON.parse(window.localStorage.starter_facebook_user || '{}');
      };

      var loginUser = function (name, pass) {
        var deferred = $q.defer();
        var promise = deferred.promise;

        $http.get(SERVER_ADDRESS + SERVER_PORT + '/auth/login', {
          params: {
            email: name,
            password: pass
          }
        }).success(function successCallback(response) {
          console.log(response);
          // this callback will be called asynchronously
          // when the response is available
          if (response.success === true) {
            deferred.resolve(response);
          } else if (response.success != true) {
            deferred.reject('Invalid credentials.');
          }
        });

        promise.success = function (fn) {
          promise.then(fn);
          return promise;
        };
        promise.error = function (fn) {
          promise.then(null, fn);
          return promise;
        };
        return promise;
      };

      return {
        getUser: getUser,
        setUser: setUser,
        loginUser: loginUser
      }
    }
  );
