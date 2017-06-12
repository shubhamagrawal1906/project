
// Module defination
var app = angular.module('LMS', ['ngRoute']);
// Services
app.factory("services", ["$http",
  function($http){
    var obj = {};
      obj.getBooks = function(){
        return $http.get('json/searchbook.json');
      }
    return obj;
  }
]);
// Contrllers
app.controller('bookCtrl', function($scope, services){
  $scope.hover = '';
  $scope.isLoader = true;
  $scope.search = "";
  $scope.jumptopage = 1;
  $scope.perPagination = 5;
  $scope.startPagination = 0;
  $scope.selectedperPage = "All";
  $scope.perPage = ['All', 10, 20, 50, 100];
  $scope.pages = [];
  $scope.showPagination = [];
  $scope.allBooks = [];
  $scope.books = [];
  $scope.ascIdTrigger = false;
  $scope.dscIdTrigger = false;
  $scope.ascTitleTrigger = false;
  $scope.dscTitleTrigger = false;
  $scope.currentPage = 0;
  function upadteSequence(){
    if($scope.ascIdTrigger == true){
      $scope.allBooks = sortAsc($scope.allBooks, 'globalbookid');
    }else if($scope.dscIdTrigger == true){
      $scope.allBooks = sortDsc($scope.allBooks, 'globalbookid');
    }else if($scope.ascTitleTrigger  == true){
      $scope.allBooks = sortAsc($scope.allBooks, 'title');
    }else if($scope.dscTitleTrigger  == true){
      $scope.allBooks = sortDsc($scope.allBooks, 'title');
    }
  }

  function setBook(lowerRange, upperRange){
    $scope.books = $scope.allBooks.slice(lowerRange, upperRange);
    for(var i = 1; i <= Math.ceil($scope.allBooks.length/$scope.selectedperPage); i++){
      $scope.pages.push(i);
    }
  }

  $scope.pagination = function(currentPage){
    $scope.jumptopage = $scope.currentPage = currentPage;
    $scope.pages = [];
    if($scope.selectedperPage == "All"){
      $scope.books = $scope.allBooks;
    }else{
      var lowerRange = $scope.selectedperPage*($scope.currentPage - 1);
      var upperRange = $scope.selectedperPage*($scope.currentPage);
      if(lowerRange < 0)
        lowerRange = 0;
      if(upperRange > $scope.allBooks.length)
        upperRange = $scope.allBooks.length - 1;
      setBook(lowerRange, upperRange);
      setShowPagination();
    }
  }

  $scope.perPageSelect =function(){
    upadteSequence();
    $scope.pagination(1);
  }
  $scope.sortAscId = function(){
    $scope.books = sortAsc($scope.books, 'globalbookid');
    $scope.ascIdTrigger = true;
    $scope.dscIdTrigger = false;
  }
  $scope.sortDscId = function(){
    $scope.books = sortDsc($scope.books, 'globalbookid');
    $scope.ascIdTrigger = false;
    $scope.dscIdTrigger = true;
  }
  $scope.sortAscTitle = function(){
    $scope.books = sortAsc($scope.books, 'title');
    $scope.ascTitleTrigger = true;
    $scope.dscTitleTrigger = false;
  }
  $scope.sortDscTitle = function(){
    $scope.books = sortDsc($scope.books, 'title');
    $scope.ascTitleTrigger = false;
    $scope.dscTitleTrigger = true;
  }
  services.getBooks().then(function(data){
    $scope.allBooks = data.data.books;
    $scope.pagination(1);
    $scope.isLoader = false;
  });
  $scope.searchBook = function(){
    var bookIndex = search($scope.books , 'title', $scope.search);
    bookIndex != -1 ? $scope.books = [$scope.books[bookIndex]] : $scope.books = [];
    $scope.pages = [];
  }

  function setShowPagination(){
    endPagination = (($scope.startPagination+$scope.perPagination+1) > $scope.pages.length) ? $scope.pages.length : $scope.startPagination+$scope.perPagination;
    $scope.showPagination = $scope.pages.slice($scope.startPagination, endPagination);
  }

  $scope.previous = function(){
    if($scope.startPagination+1 > $scope.perPagination){
      $scope.startPagination = $scope.startPagination - $scope.perPagination;
    }
    setShowPagination();
  }
  $scope.next = function(){
    if(($scope.pages.length - $scope.startPagination) > $scope.perPagination){
      $scope.startPagination = $scope.startPagination + $scope.perPagination;
    }
    setShowPagination();
  }
  function updatePageSequence(){
    if($scope.jumptopage < $scope.showPagination[0]){
      $scope.previous();
    }else if($scope.jumptopage > $scope.showPagination[$scope.showPagination.length-1]){
      $scope.next();
    }else{
      return ;
    }
    updatePageSequence();
  }
  $scope.jumpToPage = function(){
    $scope.jumptopage = parseInt($scope.jumptopage);
    if($scope.jumptopage < 1)
      $scope.jumptopage = 1;
    else if($scope.jumptopage > $scope.pages.length){
      $scope.jumptopage = $scope.pages.length;
    }
    updatePageSequence();
    $scope.pagination($scope.jumptopage);
  }
  $scope.hoverIn = function(data){
    $scope.hover = data;
  }
  $scope.hoverOut = function(){
    $scope.hover = '';
  }
});
//Routers
app.config(['$routeProvider',
  function($routeProvider){
    $routeProvider
      .when('/', {
        title: 'Books',
        templateUrl: 'partials/book.html',
        controller: 'bookCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
]);
