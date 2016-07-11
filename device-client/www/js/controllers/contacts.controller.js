angular.module('starter.controllers')

  .controller('ContactsCtrl', function ($scope, $http, $q, $ionicPopup, $state, $localStorage, $sessionStorage, $log) {

    //Information fields for contact view
    $scope.companyLocation = "Company Address: TEST ADDRESS";
    $scope.companyPhone = "Company Phone Number: TEST PHONE NUMBER";
    $scope.contactFormTitle = "Fill the form below to contact with us.";

    //Initialize empty object
    $scope.contact = {
      'name': '',
      'email': '',
      'phone': '',
      'message': ''
    };

    $scope.submit = function () {
      //Success
      if ($scope.contactForm.$valid) {
        $ionicPopup.alert({
          title: 'Feedback sended successfully',
          template: "Sended info <br>" +
          "Name " + $scope.contact.name + '<br>' +
          "Email " + $scope.contact.email + '<br>' +
          "Phone " + $scope.contact.phone + '<br>' +
          "Message " + $scope.contact.message
        });

        //TODO: Get the information and add it to database.
        // DEBUG TEST
        console.log($scope.contact);

        //After submit clear the form
        $scope.contact.name = null;
        $scope.contact.email = null;
        $scope.contact.phone = null;
        $scope.contact.message = null;
      }
      else {
        //Validation msgs for every field.
        if (!$scope.contactForm.fieldName.$valid) {
          $ionicPopup.alert({
            title: 'Invalid Name',
            template: "Name must be between 2 and 70 characters."
          });
        } else if (!$scope.contactForm.fieldEmail.$valid) {
          $ionicPopup.alert({
            title: 'Invalid Email',
            template: "Email address must be valid email up to 50 characters."
          });
        } else if (!$scope.contactForm.fieldPhone.$valid) {
          $ionicPopup.alert({
            title: 'Invalid Phone',
            template: "Phone must be between 5 and 15 numbers"
          });
        } else if (!$scope.contactForm.fieldMessage.$valid) {
          $ionicPopup.alert({
            title: 'Invalid Message',
            template: "Message must be between 5 and 250 characters"
          });
        }
      }
    }
  })

  .directive('formManager', function () {
    return {
      restrict: 'A',
      controller: function ($scope) {

        $scope.$watch('contactForm.$valid', function () {
          // console.log("Form validity changed. Now : " + $scope.faleComigoForm.$valid);
        })
      }
    }
  });
