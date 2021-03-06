angular.module('starter')
  .controller('HomeCtrl', function ($scope,
                                    $rootScope,
                                    $state,
                                    $stateParams,
                                    $timeout,
                                    $log,
                                    $ionicModal,
                                    $ionicHistory,
                                    $localStorage,
                                    $location,
                                    $sessionStorage,
                                    $ionicSlideBoxDelegate,
                                    ionicDatePicker,
                                    StatusFactory,
                                    LoginService,
                                    AuthFactory,
                                    RegisterService,
                                    FacebookService,
                                    UserResolver,
                                    SERVER_ADDRESS,
                                    $ionicPlatform) {

    $scope.isLogged = false;

    // Ionic.Auth.login('facebook').then(function (response) {
    //   $log.info(response);
    // });

    $scope.test = function () {
      LoginService.checkUserExists('krasimirvelichkov@gmail.com')
        .then(function (result) {
          $log.info(result);
        });
    };

    $scope.$watch('isLogged', function () {
      // $log.info('test : ', $localStorage.test)
      // $log.info('$localStorage isLogged ', $localStorage.isLogged);
      $log.info('isLogged is now ' + $scope.isLogged);
    });

    //Set the local storage
    $scope.$storage = $localStorage.$default({
      user: null,
      isLogged: false
    });

    //Modal for login/register options
    //I think that it is better than tabs
    $scope.registerInfo = {
      name: 'John Cena',
      email: 'test@test.com',
      password: '123',
      phone: '3592414124',
      address: 'Sofia, John Cena 33',
      dateOfBirth: Date.now(),
      gender: 'Male',
      interests: 'JavaScript, Ionic, AngularJS, MongoDB, ExpressJS',

      //TODO implement picture logic
      picture: 'picture link'
    };


    $scope.loginInfo = {
      email: 'ex3m4@mail.bg',
      password: 'test'
    };

    //Date picker
    var ipObj1 = {
      callback: function (val) {  //Mandatory
        $scope.registerInfo.dateOfBirth = val;
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

    $scope.loginWithFacebook = function () {
      FacebookService.facebookSignIn();
      $scope.loginModal.hide();
      $scope.registerModal.hide();
    };

    $scope.login = function () {
      AuthFactory.loginUser($scope.loginInfo.email, $scope.loginInfo.password)
        .success(function (result) {
          // $log.info(result);
          // $localStorage.isLogged = true;
          $localStorage.user = result;
          $localStorage.isLogged = true;
          $scope.loginModal.hide();

          //console.log();
          $state.go('profile');
        });
    };

    $scope.register = function () {
      $log.info($scope.registerInfo);
      RegisterService.registerUser($scope.registerInfo);
    };

    //TODO Improve validation with watch
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
      animation: 'slide-in-up',
      // hardwareBackButtonClose: false
    }).then(function (modal) {
      $scope.registerModal = modal;
    });

    // Init the login modal
    $ionicModal.fromTemplateUrl('templates/modals/login-modal.html', {
      scope: $scope,
      animation: 'slide-in-up',
      // hardwareBackButtonClose: false
    }).then(function (modal) {
      $scope.loginModal = modal;
    });

    $ionicModal.fromTemplateUrl('templates/modals/forgot-password-modal.html', {
      scope: $scope,
      animation: 'slide-in-up',
      // hardwareBackButtonClose: false
    }).then(function (modal) {
      $scope.forgottenPasswordModal = modal;
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
      $scope.loginModal.hide();
      $scope.registerModal.show();
    };

    $scope.callLoginModal = function () {
      $scope.registerModal.hide();
      $scope.loginModal.show();
    };

    $scope.callForgottenPasswordModal = function () {
      $scope.forgottenPasswordModal.show();
      $scope.loginModal.hide();
      $scope.registerModal.hide();
    };

    $scope.goToLogin = function () {
      $state.go('tab.login');
      $scope.modal.hide();
    };
    $scope.goToRegister = function () {
      $state.go('tab.register');
      $scope.modal.hide();
    };

    $scope.users = UserResolver;
  });
