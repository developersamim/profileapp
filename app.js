var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider

  .when('/', {
    templateUrl : 'pages/home.html',
    controller  : 'ProfileController'
  })

  .otherwise({redirectTo: '/'});
});

app.controller('ProfileController', function($scope, profileFactory) {
  $scope.message = 'Hello from ProfileController';
  $scope.user = {};
  $scope.add = function(){
    console.log(this.user.email);
    profileFactory.addProfile($scope);
  }
});

app.factory('profileFactory', function($http) {
    var loggedIn = false;
    var toState;

    return {

        addProfile: function($scope) {
            var parameter = JSON.stringify({email:$scope.user.email, firstName: $scope.user.firstName, lastName: $scope.user.lastName, 
            displayName: $scope.user.displayName, description: $scope.user.description, department: $scope.user.department, team: $scope.user.team});
            var response = $http({
                method: 'POST',
                url: 'http://zware-ngnewapi.azurewebsites.net/api/developersamim_at_gmail_com/profiles',
                data: parameter})

            .then(function (response){

            },function (error){
         
            });
        }
    };
});