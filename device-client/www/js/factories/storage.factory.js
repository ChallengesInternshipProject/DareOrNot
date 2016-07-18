angular.module('starter')
  .factory('StorageFactory', function ($localStorage,$log) {
    var _getAll = function () {
      return $localStorage;
    };
    var _get = function(field){
      return $localStorage[field];
    }
    var _add = function (field,value) {
      $localStorage[field]=value;
     // $localStorage.things.push(thing);
    };
    var _remove = function (thing) {
      $localStorage.things.splice($localStorage.things.indexOf(thing), 1);
    };
    return {
      getAll: _getAll,
      add: _add,
      get: _get,
      remove: _remove
    };
  });
