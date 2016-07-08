<!--home page for login/register-->
angular.module('starter')
  .controller('HomeCtrl', function ($scope, $state, $stateParams, $log, $ionicModal, $ionicSlideBoxDelegate, ionicDatePicker, StatusFactory, LoginService, AuthFactory, RegisterService) {

    $scope.isLogged = false;

    $scope.$watch('isLogged', function () {
      $log.info('isLogged is now ' + $scope.isLogged);
    });

    //Modal for login/register options
    //I think that it is better than tabs
    $scope.registerInfo = {
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      dateOfBirth: '',
      gender: '',
      interests: '',

      //TODO implement picture logic
      picture: ''
    };

    $scope.connectWithFacebook = function () {


    };

    $scope.loginInfo = {
      email: 'krasimirvelichkov@gmail.com',
      password: '123'
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

    $scope.login = function () {
      AuthFactory.loginUser($scope.loginInfo.email, $scope.loginInfo.password)
        .success(function (result) {
          // $log.info(result);
          $scope.isLogged = true;
        });
    };

    $scope.register = function () {
      $log.info($scope.registerInfo);
      RegisterService.registerUser($scope.registerInfo);
    };

    //Improve validation with watch
    $scope.slideHasChanged = function (index) {
      switch (index) {
        //Case 1 : Name Email Password and Phone number
        case 1:

          break;

        //Case 2 : Address, Date of Birth, Gender and Interests
        case 2:
          break;

        //Case 3 : Add picture TODO implement file upload and link save in the DB
        case 3:
          break;

        //Case 4 : Add social network
        case 4:
          break;

        //Case 5: Check the details and register
        case 5:
          break;
      }

      $log.info(index);
    };

    //Init the register modal
    $ionicModal.fromTemplateUrl('templates/modals/register-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.registerModal = modal;
    });

    // Init the login modal
    $ionicModal.fromTemplateUrl('templates/modals/login-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.loginModal = modal;
    });

    $scope.disableSwipe = function () {
      $ionicSlideBoxDelegate.enableSlide(false);
    };

    $scope.nextSlide = function () {
      $ionicSlideBoxDelegate.next();
    };

    $scope.previousSlide = function () {
      $ionicSlideBoxDelegate.previous();
    };

    $scope.callRegisterModal = function () {
      $scope.registerModal.show();
    };

    $scope.callLoginModal = function () {
      $scope.loginModal.show();
    };


    $scope.goToLogin = function () {
      $state.go('tab.login');
      $scope.modal.hide();
    };
    $scope.goToRegister = function () {
      $state.go('tab.register');
      $scope.modal.hide();
    };
  });
