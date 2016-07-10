angular.module('starter')
  .service('FacebookService', function ($rootScope, $localStorage, $log, $q, $http, $state, $localStorage, $ionicPopup, $ionicLoading, LoginService) {
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

            $log.info(profileInfo);
            alert('already registered !');
            $localStorage.isLogged = true;
            $localStorage.user = profileInfo;

            // // A popup for the local login after the email is set from the FB login
            // var myPopup = $ionicPopup.show({
            //   template: '<input type="password" ng-model="data.password">',
            //   title: 'Set your password for the app',
            //   subTitle: 'Just a simple password !',
            //   scope: $rootScope,
            //   buttons: [
            //     {text: 'Cancel'},
            //     {
            //       text: '<b>Save</b>',
            //       type: 'button-positive',
            //       onTap: function (e) {
            //         if (!$rootScope.data.password) {
            //           //don't allow the user to close unless he enters wifi password
            //           $log.info($rootScope.data.password);
            //           e.preventDefault();
            //         } else {
            //           $log.info('exists 2 ?')
            //           //Register the user to the local db with the set password from the popup
            //           $log.info($rootScope.data.password);
            //           $log.info(profileInfo);
            //
            //           LoginService.setUser({
            //             authResponse: authResponse,
            //             userID: profileInfo.id,
            //             name: profileInfo.name,
            //             email: profileInfo.email,
            //             picture: "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large",
            //             password: $rootScope.data.password
            //           });
            //         }
            //       }
            //     }
            //   ]
            // });

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
                  // For the purpose of this example I will store user data on local storage
                  var myPopup = $ionicPopup.show({
                    template: '<input type="password" ng-model="data.password">',
                    title: 'Set your password',
                    subTitle: 'Just a simple password !',
                    scope: $rootScope,
                    buttons: [
                      {text: 'Cancel'},
                      {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                          if (!$rootScope.data.password) {
                            //don't allow the user to close unless he enters wifi password
                            e.preventDefault();
                          } else {
                            $log.info('exists 1 ?')
                            //Register the user to the local db with the set password from the popup
                            LoginService.setUser({
                              authResponse: success.authResponse,
                              userID: profileInfo.id,
                              name: profileInfo.name,
                              email: profileInfo.email,
                              picture: "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large",
                              password: $rootScope.data.password
                            });
                          }
                        }
                      }
                    ]
                  });
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
