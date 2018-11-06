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
  $scope.profileList = [];
  $scope.modaltitle = 'Success';
  $scope.modaltext = 'Profile created successfully';
  $scope.add = function(){
    console.log(this.user.email);

    profileFactory.addProfile($scope);
  }

    // at the bottom of your controller
    var init = function () {
        profileFactory.getAllProfile($scope);
    };
    // and fire it after definition
    init();
});

app.factory('profileFactory', function($http) {

    return {

        addProfile: function($scope) {
            var parameter = JSON.stringify({email:$scope.user.email, firstName: $scope.user.firstName, lastName: $scope.user.lastName, 
            displayName: $scope.user.displayName, description: $scope.user.description, department: $scope.user.department, team: $scope.user.team});
            
            var response = $http({
                method: 'POST',
                //url: 'http://zware-ngnewapi.azurewebsites.net/api/developersamim_at_gmail_com/profiles',
                url: 'https://localhost:5001/api/profile',
                contentType: "application/json",
                data: parameter})

            .then(function (response){
                debugger;
                $('#myModal').modal('show');
                $scope.user = {};
                $scope.profileList.unshift(response.data);
            },function (error){
                $scope.modaltitle = 'Error';
                $scope.modaltext = 'Something went wrong. Please try later!';
                $('#myModal').modal('show');
            });
        },

        getAllProfile: function($scope){
            var response = $http({
                method: 'GET',
                //url: 'http://zware-ngnewapi.azurewebsites.net/api/developersamim_at_gmail_com/profiles'
                url: 'https://localhost:5001/api/profile'
            }).then( function (response){
                $scope.profileList = response.data;
            }, function(error){

            });
        }
    };
});