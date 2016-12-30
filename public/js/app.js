var app = angular.module('meanInp', ['addCtrl', 'queryCtrl','eliminarCtrl', 'headerCtrl', 'geolocation', 'gservice', 'ngRoute'])

   
    .config(function($routeProvider){

       
        $routeProvider.when('/inicio', {
            controller: 'addCtrl',
            templateUrl: 'partials/addForm.html',

        
        }).when('/buscar', {
            controller: 'queryCtrl',
            templateUrl: 'partials/queryForm.html',

        
        }).when('/eliminar', {
            controller: 'eliminarCtrl',
            templateUrl: 'partials/eliminarForm.html',

        
        }).otherwise({redirectTo:'/inicio'})
    });
