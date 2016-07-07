<!--home page for login/register-->
angular.module('starter')
  .controller('HomeCtrl', function ($scope, $state, $stateParams, $log, $ionicModal, $ionicSlideBoxDelegate, StatusFactory) {

    //Modal for login/register options
    //I think that it is better than tabs

    $scope.slideHasChanged = function (index) {
      $log.info(index);
    };

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

    $scope.loginInfo = {
      email: '',
      password: ''
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

    $scope.nextSlide = function () {
      $ionicSlideBoxDelegate.next();
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
