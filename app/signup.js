// Module defination
var app = angular.module('TaskManager', ['ngRoute']);
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

app.controller('signupCtrl', function($scope, services){
  
});
