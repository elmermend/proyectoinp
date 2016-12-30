var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice']);
addCtrl.controller('addCtrl', function($scope, $http, $rootScope, geolocation, gservice){

   
    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;

   
    $scope.formData.longitude = -71.329;
    $scope.formData.latitude = -16.267;

    
    geolocation.getLocation().then(function(data){

      
        coords = {lat:data.coords.latitude, long:data.coords.longitude};

       
        $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
        $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);

       
        $scope.formData.htmlverified = " (gracias por dar tu ubicaciones!)";

        gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

    });

   
    $rootScope.$on("clicked", function(){

       
        $scope.$apply(function(){
            $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
            $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
            $scope.formData.htmlverified = "Active su localizacion";
        });
    });

   
    $scope.refreshLoc = function(){
        geolocation.getLocation().then(function(data){
            coords = {lat:data.coords.latitude, long:data.coords.longitude};

            $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
            $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
            $scope.formData.htmlverified = "Gracias por dar su localizacion";
            gservice.refresh(coords.lat, coords.long);
        });
    };



   
    $scope.createUser = function() {

      
        var userData = {
            nombreevento: $scope.formData.nombreevento,
            organizador: $scope.formData.organizador,
            edad: $scope.formData.edad,
            descripcion: $scope.formData.descripcion,
            fecha: $scope.formData.fecha,
            location: [$scope.formData.longitude, $scope.formData.latitude],
            htmlverified: $scope.formData.htmlverified
        };

       
        $http.post('/users', userData)
            .success(function (data) {

               
                $scope.formData.nombreevento = "";
                $scope.formData.organizador = "";
                $scope.formData.edad = "";
                $scope.formData.descripcion = "";
                $scope.formData.fecha = "";

                
                gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
});

