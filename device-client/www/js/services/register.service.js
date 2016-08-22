angular.module('starter.services')
  .factory('RegisterService',
    function ($log, $http, $ionicPopup, SERVER_ADDRESS, SERVER_PORT) {

      //Register the user in the local DB
      function registerUser(user_data) {
        $log.info(user_data.password);
        $http({
          method: 'POST',
          url: SERVER_ADDRESS + SERVER_PORT + '/auth/register',
          params: user_data
        }).then(function (response) {
          console.log(response.data);
          //On success show a popup
          var successPopup = $ionicPopup.alert({
            title: 'Success',
            template: response.data
          });
        }, function (err) {
          $log.info(err);
        });
      }

      return {
        registerUser: registerUser
      }
    });
