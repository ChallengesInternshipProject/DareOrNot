angular.module('starter.controllers')

  .controller('LoginCtrl', function ($scope, $http, LoginService, $ionicLoading, $q, $ionicPopup, $state, $localStorage, $sessionStorage, $log, $ionicSideMenuDelegate) {


    //Object for the facebook register/login popup
    $scope.data = {
      password: ''
    };



    $scope.toggleLeft = function () {
      $log.info('called');
      $ionicSideMenuDelegate.toggleLeft();

    }

    $log.info(LoginService.getUser());
    var fbLoginSuccess = function (response) {
      if (!response.authResponse) {
        fbLoginError("Cannot find the authResponse");
        return;
      }

      var authResponse = response.authResponse;

      getFacebookProfileInfo(authResponse)
        .then(function (profileInfo) {
          // For the purpose of this example I will store user data on local storage
          var myPopup = $ionicPopup.show({
            template: '<input type="password" ng-model="data.password">',
            title: 'Set your password for the app',
            subTitle: 'Just a simple password !',
            scope: $scope,
            buttons: [
              {text: 'Cancel'},
              {
                text: '<b>Save</b>',
                type: 'button-positive',
                onTap: function (e) {
                  if (!$scope.data.password) {
                    //don't allow the user to close unless he enters wifi password
                    e.preventDefault();
                  } else {

                    //Register the user to the local db with the set password from the popup
                    $log.info($scope.data.password);
                    LoginService.setUser({
                      authResponse: authResponse,
                      userID: profileInfo.id,
                      name: profileInfo.name,
                      email: profileInfo.email,
                      picture: "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large",
                      password: $scope.data.password
                    });
                  }
                }
              }
            ]
          });

        }, function (fail) {
          // Fail get profile info
          console.log('profile info fail', fail);
        });
    };

    // This is the fail callback from the login method
    var fbLoginError = function (error) {
      console.log('fbLoginError', error);
      $ionicLoading.hide();
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
    $scope.facebookSignIn = function () {

      // For the purpose of this example I will store user data on local storage


      facebookConnectPlugin.getLoginStatus(function (success) {
        if (success.status === 'connected') {
          // The user is logged in and has authenticated your app, and response.authResponse supplies
          // the user's ID, a valid access token, a signed request, and the time the access token
          // and signed request each expire
          console.log('getLoginStatus', success.status);

          // Check if we have our user saved
          var user = LoginService.getUser('facebook');

          if (!user.userID) {
            getFacebookProfileInfo(success.authResponse)
              .then(function (profileInfo) {
                // For the purpose of this example I will store user data on local storage
                var myPopup = $ionicPopup.show({
                  template: '<input type="password" ng-model="data.password">',
                  title: 'Set your password',
                  subTitle: 'Just a simple password !',
                  scope: $scope,
                  buttons: [
                    {text: 'Cancel'},
                    {
                      text: '<b>Save</b>',
                      type: 'button-positive',
                      onTap: function (e) {
                        if (!$scope.data.wifi) {
                          //don't allow the user to close unless he enters wifi password
                          e.preventDefault();
                        } else {

                          //Register the user to the local db with the set password from the popup
                          LoginService.setUser({
                            authResponse: success.authResponse,
                            userID: profileInfo.id,
                            name: profileInfo.name,
                            email: profileInfo.email,
                            picture: "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large",
                            password: $scope.data.password
                          });
                        }
                      }
                    }
                  ]
                });

                $ionicLoading.hide();
                //register the user in the local db
                // $http({
                //   method: 'GET',
                //   url: SERVER_ADDRESS + SERVER_PORT + '/auth/register',
                //   params: {
                //     id: profileInfo.id,
                //     name: profileInfo.name,
                //     email: profileInfo.email,
                //     picture: "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
                //   }
                // }).then(function (response) {
                //   console.log(response.data);
                //   var successPopup = $ionicPopup.alert({
                //     title: 'Success',
                //     template: response.data
                //   });
                //
                //
                //   // $state.go('tab.login');
                // }, function (err) {
                //   console.log(err);
                // })

              }, function (fail) {
                // Fail get profile info
                $ionicLoading.hide();
                console.log('profile info fail', fail);
              });
          } else {
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

    $scope.data = {};
    $scope.$storage = $localStorage.$default({
      user: null
    });
    $scope.login = function () {
      LoginService.loginUser($scope.data.username, $scope.data.password).success(function (data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login Successful!',
          template: "Hello " + data.email
        });
        $scope.$storage.user = data.email;
        $log.info($scope.$storage.user);
        // $state.go('tab.chats');
      }).error(function (data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Invalid credentials!'
        });
      });
    }
  });

