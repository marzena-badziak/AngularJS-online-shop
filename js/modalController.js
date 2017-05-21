var app = angular.module('catalogueApp');

//Modal Service Controler used in a popup window: //
app.controller('ModalController', [
  '$scope', '$element', 'selectedBook', 'close',
  function($scope, $element, selectedBook, close) {
  $scope.media = null;
  $scope.quantity = null;
  $scope.book = selectedBook;

  $scope.possibleMedia = [ 'PenDrive', 'płyta cd', 'płyta dvd' ];

  $scope.close = function() {
 	  close({
      book: $scope.book,
      media: $scope.media,
      quantity: $scope.quantity

    }, 500);
  };
  $scope.cancel = function() {
    $element.modal('hide');
  };
  // $scope.closeCart = function() {
  //   console.log('closeCart clicked!');
  //   $element.modal('hide');
  //   };


}]);
