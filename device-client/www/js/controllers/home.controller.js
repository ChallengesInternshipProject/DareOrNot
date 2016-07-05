<!--home page for login/register-->
angular.module('starter')
  .controller('HomeCtrl', function ($scope, $state, $stateParams, $log, $ionicModal, StatusFactory) {

    //Modal for login/register options
    //I think that it is better than tabs
    $ionicModal.fromTemplateUrl('templates/modals/login-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
      // if (!StatusFactory.isLogged) {
      //   modal.show();
      // }

    });
    $scope.callModal = function () {
      $scope.modal.show();
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
