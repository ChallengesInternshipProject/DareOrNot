angular.module('starter')
  .service('FacebookService', function ($rootScope, $log, $q, $http, $state, $localStorage, $ionicPopup, $ionicLoading, LoginService, RegisterService) {
      $rootScope.data = {
        password: ''
      };
      //Set the local storage
      $rootScope.$storage = $localStorage.$default({
        user: null
      });

      var fbLoginSuccess = function (response) {
        if (!response.authResponse) {
          fbLoginError("Cannot find the authResponse");
          return;
        }

        var authResponse = response.authResponse;

        getFacebookProfileInfo(authResponse)
          .then(function (profileInfo) {

            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

            //Check if the user exists
            LoginService.checkUserExists(profileInfo.email)
              .then(function (result) {
                $log.info(result);
                $log.info('exists ^');
                // $log.info('something went really bad');

                if (result.data === null) {
                  $log.info('no result.email !??!?!?');

                  RegisterService.registerUser(profileInfo);
                  $localStorage.isLogged = true;
                  $localStorage.user = profileInfo;

                }
                else if (result.data.email) {
                  $log.info('Result.email exists');
                  $localStorage.isLogged = true;
                  $localStorage.user = result;
                  $state.go('tab.users');
                } else {

                  //Register the user
                  // RegisterService.registerUser(profileInfo);
                }
              });

          }, function (fail) {
            // Fail get profile info
            console.log('profile info fail', fail);
          });
      };

// This is the fail callback from the login method
      var fbLoginError = function (error) {
        console.log('fbLoginError', error);
        // $ionicLoading.hide();
      };

// This method is to get the user profile info from the facebook api
      var getFacebookProfileInfo = function (authResponse) {
        var info = $q.defer();

        facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
          function (response) {
            console.log(response);
            info.resolve(response);
          },
          function (response) {
            console.log(response);
            info.reject(response);
          }
        );
        return info.promise;
      };

//This method is executed when the user press the "Login with facebook" button
      var facebookSignIn = function () {

        // For the purpose of this example I will store user data on local storage

        facebookConnectPlugin.getLoginStatus(function (success) {
          if (success.status === 'connected') {
            // The user is logged in and has authenticated your app, and response.authResponse supplies
            // the user's ID, a valid access token, a signed request, and the time the access token
            // and signed request each expire
            console.log('getLoginStatus?', success.status);

            // Check if we have our user saved
            var user = LoginService.getUser('facebook');

            $log.info(user);

            if (!user.userID) {
              getFacebookProfileInfo(success.authResponse)
                .then(function (profileInfo) {

                  LoginService.checkUserExists(profileInfo.email)
                    .then(function (result) {
                      $localStorage.isLogged = true;
                      $localStorage.user = profileInfo;
                      $state.go('tab.users');

                    });

                  // $localStorage.user = profileInfo;
                  //got profile info !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                }, function (fail) {
                  // Fail get profile info
                  $ionicLoading.hide();
                  console.log('profile info fail', fail);
                });
            } else {
              $log.info('welcome', user.email);
              $ionicLoading.hide();
              $state.go('tab.login');
            }
          } else {
            // If (success.status === 'not_authorized') the user is logged in to Facebook,
            // but has not authenticated your app
            // Else the person is not logged into Facebook,
            // so we're not sure if they are logged into this app or not.

            console.log('getLoginStatus', success.status);
            //
            // $ionicLoading.show({
            //   template: 'Logging in...'
            // });

            // Ask the permissions you need. You can learn more about
            // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
            facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
          }
        });
      };

      return {
        facebookSignIn: facebookSignIn
      }
    }
  )
;
