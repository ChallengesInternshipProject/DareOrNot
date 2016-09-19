angular.module('starter.controllers')

.controller('ProfileCtrl', function($scope, $http, $log, $localStorage,notificationsCount) {
   $scope.user = $localStorage.user;
    $scope.notificationsCount = notificationsCount
});
