var app = angular.module('TaskManager', ['ngRoute']);

app.config(['$routeProvider',
  function($routeProvider){
    $routeProvider
      .when('/', {
        title: 'Books',
        templateUrl: 'partials/book.html',
        controller: 'bookCtrl'
      })
      .when('/signup/', {
        title: 'SignUp',
        templateUrl: 'partials/signup.html',
        controller: 'signupCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
]);
