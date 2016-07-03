angular.module('starter.services')
  .factory('RegisterService',
    ['$log', '$http', 'SERVER_ADDRESS', 'SERVER_PORT',
      function ($log, $http, $ionicPopup, SERVER_ADDRESS, SERVER_PORT) {

        //Register the user in the local DB
        function registerUser(user_data) {
          $http({
            method: 'GET',
            url: SERVER_ADDRESS + SERVER_PORT + '/auth/register',
            params: {
              email: user_data.email,
              name: user_data.name,
              id: user_data.id,
              picture: user_data.picture,
              password: user_data.password
            }
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
      }]);
