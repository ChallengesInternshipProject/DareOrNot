angular.module('starter.controllers')
  .directive('noScroll', function($document) {

    return {
      restrict: 'A',
      link: function($scope, $element, $attr) {

        $document.on('touchmove', function(e) {
          e.preventDefault();
        });
      }
    }
  })

  .controller('CardsCtrl', function($scope, TDCardDelegate, $ionicSlideBoxDelegate) {

    var cardTypes = [
      { image: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg' },
      { image: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png' },
      { image: 'https://pbs.twimg.com/profile_images/692904108424982528/0PESpDwT.jpg'}
    ];

    $scope.cardSwipedLeft = function(index) {
      console.log('LEFT SWIPE');
      console.log(index);
      $scope.addCard();
    };
    $scope.cardSwipedRight = function(index) {
      console.log('RIGHT SWIPE');
      console.log(index);
      $scope.addCard();
    };

    $scope.cards = Array.prototype.slice.call(cardTypes, 0);

    $scope.cardDestroyed = function(index) {
      $scope.cards.splice(index, 1);
    };

    $scope.addCard = function() {
      var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      newCard.id = Math.random();
      $scope.cards.push(angular.extend({}, newCard));
    }
  });
