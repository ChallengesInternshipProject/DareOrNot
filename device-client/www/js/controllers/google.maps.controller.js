angular.module('starter.controllers', ['ionic', 'ngCordova'])

  .controller('GoogleMapCtrl', function ($scope, $state, $cordovaGeolocation, $ionicPopup) {
    var options = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

      // Get Current Location from device
      var currLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);


      //Initial map options
      var mapOptions = {
        center: currLocation,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      //Initialize the map itself.
      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

      //OnTap button set center of map to your location.
      $scope.centerOnMe = function (currentLocation) {
        //Create marker with curr location
        var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: currLocation
        });

        $scope.map.setZoom(15);
        // Info Message on marker click
        var infoWindow = new google.maps.InfoWindow({
          content: "Here I am!"
        });

        $scope.map.setCenter(currLocation);
        // Show info message on marker click
        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
        });
      };

      // Test array with location objects
      var myLatLngArray = [{lat: -25.363, lng: 131.044}, {lat: -45.363, lng: 12.044}, {lat: -29.363, lng: 111.044}];

      //Foreach location set marker
      myLatLngArray.forEach(function (location, count) {
        var marker = new google.maps.Marker({
          position: location,
          map: $scope.map
        });
        console.log(location);
        count++;
        var infoWindow = new google.maps.InfoWindow({
          content: "Location number: " + count
        });

        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
        });
      });

      // //On tap create marker
      // google.maps.event.addListener($scope.map, 'click', function(event) {
      //   placeMarker(event.latLng);
      // });
      //
      // function placeMarker(location) {
      //   var marker = new google.maps.Marker({
      //     position: location,
      //     map: $scope.map
      //   });
      // }

    }, function (error) {
      $ionicPopup.alert({
        title: 'Location error'
      });
    });
  });
