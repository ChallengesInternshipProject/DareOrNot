angular.module('starter.controllers')
  .controller('RegisterCtrl', function ($scope, $http, $ionicLoading, $ionicPopup, SERVER_ADDRESS, SERVER_PORT, SOCKET_CHAT_PORT) {
      $scope.data = {
        email: '',
        password1: '',
        password2: '',
        firstName: '',
        lastName: '',
        phone: '',
        town: '',
        country: '',
        dateOfBirth: '',
        gender: ''
      };

      $scope.register = function () {
        console.log($scope.data);

        //Simple password matching test
        if ($scope.data.password1 !== $scope.data.password2) {
          var alertPopup = $ionicPopup.alert({
            title: 'Passwords do not match',
            template: 'Passwords do not match'
          })
        }
        else {
          $http({
            method: 'GET',
            url: SERVER_ADDRESS + SERVER_PORT + '/auth/register',
            params: {
              email: $scope.data.email,
              password: $scope.data.password1
            }
          }).then(function (response) {
            console.log(response.data);
            var successPopup = $ionicPopup.alert({
              title: 'Success',
              template: response.data
            });
          }, function (err) {
            console.log(err);
          })
        }
        //TODO check if user exists

        // $scope.currentDate = new Date();
        // $scope.minDate = new Date(2105, 6, 1);
        // $scope.maxDate = new Date(2015, 6, 31);
        //
        // $scope.datePickerCallback = function (val) {
        //   if (!val) {
        //     console.log('Date not selected');
        //   } else {
        //     console.log('Selected date is : ', val);
        //   }
        // };
      };
    }
  )
;
