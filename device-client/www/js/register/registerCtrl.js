angular.module('starter.controllers')
  .controller('RegisterCtrl', function ($scope, $http, $ionicLoading, $ionicPopup, ionicDatePicker, SERVER_ADDRESS, SERVER_PORT, SOCKET_CHAT_PORT) {
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
        // disabledDates: [            //Optional
        //   new Date(2016, 2, 16),
        //   new Date(2015, 3, 16),
        //   new Date(2015, 4, 16),
        //   new Date(2015, 5, 16),
        //   new Date('Wednesday, August 12, 2015'),
        //   new Date("08-16-2016"),
        //   new Date(1439676000000)
        // ],
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
          $http({
            method: 'GET',
            url: SERVER_ADDRESS + SERVER_PORT + '/auth/register',
            params: {
              email: $scope.data.email,
              password: $scope.data.password1,
              firstName: $scope.data.firstName,
              lastName: $scope.data.lastName,
              phone: $scope.data.phone,
              dateOfBirth: $scope.data.dateOfBirth

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
