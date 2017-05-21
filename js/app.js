//Define app: //
var app = angular.module("catalogueApp", ['angularModalService']);
app.factory('booksFactory', function($q, $timeout) {
  // API Promise://
  var books = $q.defer();
  $timeout(function (){
    //Object with database: //
    var booksObj = [
      {
        "name" : "The Lightning Thief",
        "author" : "Rick Riordan",
        "price" : 12.50,
        "type" : "audiobook",
        "publisher" : "Agora",
        "publ_date" : "2017-06-01T18:25:43.511Z",
        "specialOffer" : false
      }
    ,
      {
        "name" : "The Sea of Monsters",
        "author" : "Rick Riordan",
        "price" : 6.49,
        "type" : "audiobook",
        "publisher" : "Znak",
        "publ_date" : "2010-01-13T18:25:43.511Z",
        "specialOffer" : true
      }
    ,
      {
        "name" : "Sophie's World",
        "author" : "Jostein Gaarder",
        "price" : 3.07,
        "type" : "ebook",
        "publisher" : "Media Rodzina",
        "publ_date" : "1992-12-20T18:25:43.511Z",
        "specialOffer" : true
      }
    ,
      {
        "name" : "Lucene in Action, Second Edition",
        "author" : "Michael McCandless",
        "price" : 30.50,
        "type" : "audiobook",
        "publisher" : "Agora",
        "publ_date" : "2017-05-14T18:25:43.511Z",
        "specialOffer" : false
      }
    ,
      {
        "name" : "Lucene in Action, First Edition",
        "author" : "Michael McCandless",
        "price" : 20.50,
        "type" : "ebook",
        "publisher" : "Agora",
        "publ_date" : "2010-05-22T18:25:43.511Z",
        "specialOffer" : false
      }
    ,
      {
        "name" : "Dzienniki Gwiazdowe",
        "author" : "Stanisław Lem",
        "price" : 60.50,
        "type" : "ebook",
        "publisher" : "PWN",
        "publ_date" : "1984-05-22T18:25:43.511Z",
        "specialOffer" : false
      }
    ,
      {
        "name" : "Solaris",
        "author" : "Stanisław Lem",
        "price" : 29.50,
        "type" : "ebook",
        "publisher" : "PWN",
        "publ_date" : "1966-05-02T18:25:43.511Z",
        "specialOffer" : false
      }
    ,
      {
        "name" : "Silmarillion",
        "author" : "J. R. R. Tolkien",
        "price" : 199.99,
        "type" : "ebook",
        "publisher" : "PWN",
        "publ_date" : "1976-05-02T18:25:43.511Z",
        "specialOffer" : false
      }
    ,
      {
        "name" : "Tajemnicza wyspa",
        "author" : "Juliusz Verne",
        "price" : 39.00,
        "type" : "ebook",
        "publisher" : "PWN",
        "publ_date" : "1896-05-02T18:25:43.511Z",
        "specialOffer" : false
      }
    ,
      {
        "name" : "Wyprawa do wnętrza Ziemi",
        "author" : "Juliusz Verne",
        "price" : 19.99,
        "type" : "audiobook",
        "publisher" : "PWN",
        "publ_date" : "2016-09-09T18:25:43.511Z",
        "specialOffer" : false
      }
    ,
      {
        "name" : "Władca Pierścieni",
        "author" : "J. R. R. Tolkien",
        "price" : 99.99,
        "type" : "audiobook",
        "publisher" : "PWN",
        "publ_date" : "2015-05-21T18:25:43.511Z",
        "specialOffer" : true
      }
    ,
      {
        "name" : "Anna Karenina - nowe wydanie",
        "author" : "Lew Tołstoj",
        "price" : 50.00,
        "type" : "audiobook",
        "publisher" : "Znak",
        "publ_date" : "2017-05-20T18:25:43.511Z",
        "specialOffer" : true
      }
    ,
      {
        "name" : "Harry Potter",
        "author" : "J.K. Rowling",
        "price" : 55.00,
        "type" : "ebook",
        "publisher" : "Media Rodzina",
        "publ_date" : "2017-05-30T18:25:43.511Z",
        "specialOffer" : false
      }
    ];
    books.resolve(booksObj);
  }, 2000);
  return {
    getBooks: function() {
      return books.promise;
    }
  }
});
//Sample controller: //
app.controller('SampleController', ['$scope', 'ModalService',
  function($scope, ModalService) {
    $scope.showAddToCart = function(book) {
      ModalService.showModal({
        templateUrl: "/addToCartPopup.html",
        controller: "ModalController",
         inputs: {
           selectedBook: book
         }
      }).then(function(modal) {
        // Display popup: //
        $('.popup').show();
        // Add order to cart: //
        modal.close.then(function(result) {
          var t =  {
            'book' : result.book,
            'media' : result.media,
            'quantity' : result.quantity
          };
          $scope.orders.push(t);
        });
      });
    };
    // $scope.openCart = function() {
    //   console.log("cart clicked");
    //   ModalService.showModal({
    //     templateUrl: "/CartPopup.html",
    //     controller: "ModalController",
    //     inputs: $scope.orders
    //   }).then(function(modal) {
    //     $('.cart-popup').show();
    //   })
    // };

  }]);
