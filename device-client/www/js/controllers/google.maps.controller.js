angular.module('starter.controllers')

  .controller('GoogleMapCtrl', function ($scope, $state, $ionicModal, SERVER_ADDRESS, SERVER_PORT, $cordovaGeolocation, $ionicPopup, $http) {
    var options = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

      // Get Current Location from device
      var currLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);


      //Initial map options
      var mapOptions = {
        center: currLocation,
        zoom: 20,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      //Initialize the map itself.
      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
      setMarkersFromLocations();

      // Center map on start on Bulgaria
      var address = "Bulgaria";
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          $scope.map.setCenter(results[0].geometry.location);
          $scope.map.fitBounds(results[0].geometry.bounds);
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });

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


      function setMarkersFromLocations() {
        $http.get(SERVER_ADDRESS + SERVER_PORT + '/challenges').success(function (challenges) {
          challenges.forEach(function (challenge) {
            console.log(challenge);
            var marker = new google.maps.Marker({
              position: challenge.location,
              map: $scope.map
            });
            google.maps.event.addListener(marker, 'click', function () {
              $scope.mapsModal.show();
            });
          })
        });
      }


      // Test array with location objects
      var myLatLngArray = [{lat: 43.210388, lng: 27.864430}, {lat: 42.446897, lng: 24.711757}, {lat: 42.688577, lng: 23.321437}];
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
          $scope.mapsModal.show();
          // infoWindow.open($scope.map, marker);
        });
      });

      $ionicModal.fromTemplateUrl('templates/modals/maps-modal.html', {
        scope: $scope,
        animation: 'slide-in-up',
        hardwareBackButtonClose: true
      }).then(function (modal) {
        $scope.mapsModal = modal;
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
    $scope.signingUpForChallenge = function () {
      alert("This button should sign up user for this challenge")
    }

    $scope.closeModal = function () {
      $scope.mapsModal.hide();
    };

    var locationsArray = [];


  });
