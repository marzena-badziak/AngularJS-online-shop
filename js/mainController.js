var app = angular.module('catalogueApp');
//Main controller: //
app.controller('MainController', ['$scope', 'booksFactory',
  function($scope, booksFactory) {
  booksFactory.getBooks().then(function(res) {
    $('.loading').hide();
    $scope.books = res;
  }, function(err) {
    alert(err);
  });
  $scope.tab = 1;
  $scope.usedFilter = { type : ''};

  // Timestamps //
  $scope.startTimestamp = null;
  $scope.endTimestamp = null;

  // Function used to filter new and upoming books by date: //
  $scope.filterDate = function(selectedBook) {
    if($scope.startTimestamp === null && $scope.endTimestamp === null) {
      return true;
    }
    if(($scope.startTimestamp != null &&
      new Date(selectedBook['publ_date']) > $scope.startTimestamp)
        && ($scope.endTimestamp != null
          && new Date(selectedBook['publ_date']) < $scope.endTimestamp)) {
      return true;
    }
    return false;
    }
  // Set timestamps for filtering new and upcoming books//
  $scope.setNew = function() {
    $scope.startTimestamp = new Date().getTime() - 14*24*3600*1000;
    $scope.endTimestamp = new Date().getTime();
  };
  $scope.setUpcoming = function() {
    $scope.startTimestamp = new Date().getTime();
    $scope.endTimestamp = new Date().getTime() + 14*24*3600*1000;
  };
  $scope.clearDateFilter = function() {
    $scope.startTimestamp = null;
    $scope.endTimestamp = null;
  };

  //Main function used to filter books by different properties://
  $scope.filterBooks = function(filter, tabIndex, dateFilter) {
    if(dateFilter === 'new') {
      $scope.setNew();
    } else if(dateFilter === 'upcoming') {
      $scope.setUpcoming();
    } else {
      $scope.clearDateFilter();
    }
    $scope.usedFilter = filter;
    $scope.tab = tabIndex;
  };

  //Highlight a chosen tab: //
  $scope.isSet = function(tabIndex) {
    return $scope.tab === tabIndex;
  };

  $scope.orders = [];
  $scope.closeAddToCart = function() {
    $('.popup').hide();
  }
  //Count books in the cart and update the counter: //
  $scope.countBooks = function() {
    var count = 0;
    for (var i = 0; i < $scope.orders.length; i++) {
      count += $scope.orders[i].quantity;
    }
    return count;
  };
  //Count total price: //
  $scope.countTotalPrice = function() {

    var totalPrice = 0;
    for (var i = 0; i < $scope.orders.length; i++) {
      totalPrice += $scope.orders[i].quantity * $scope.orders[i].book.price;
    }
    return totalPrice;
  };

  $scope.search = null;

  //Search filter function: //
  $scope.searchFilter = function(selectedBook) {
     if ($scope.search === null) {
        return true
      }
     if (selectedBook.name.toLowerCase().indexOf($scope.search.toLowerCase()) >= 0
      ||  selectedBook.author.toLowerCase().indexOf($scope.search.toLowerCase()) >= 0) {
      return true
    }
     return false;
  }

}]);
