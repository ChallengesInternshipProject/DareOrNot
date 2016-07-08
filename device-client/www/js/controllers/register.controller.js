angular.module('starter.controllers')
  .controller('RegisterCtrl', function ($scope, $http, $log, $ionicLoading, $ionicPopup, ionicDatePicker, StatusFactory, RegisterService, SERVER_ADDRESS, SERVER_PORT, SOCKET_CHAT_PORT) {

      $scope.isLogged = StatusFactory.isLogged;
      $log.info(StatusFactory.isLogged);

      //Data for the local registration
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

      //Date picker
      var ipObj1 = {
        callback: function (val) {  //Mandatory
          $scope.data.dateOfBirth = val;
          console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        },
        from: new Date(1900, 1, 1), //Optional
        to: new Date(), //Optional
        inputDate: new Date(),      //Optional
        mondayFirst: true,          //Optional
        disableWeekdays: [0],       //Optional
        closeOnSelect: false,       //Optional
        templateType: 'modal'       //Optional
      };

      $scope.openDatePicker = function () {
        ionicDatePicker.openDatePicker(ipObj1);
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
          RegisterService.registerUser({
            email: $scope.data.email,
            password: $scope.data.password1,
            firstName: $scope.data.firstName,
            lastName: $scope.data.lastName,
            phone: $scope.data.phone,
            dateOfBirth: $scope.data.dateOfBirth
          });
        }
      };
    }
  );
