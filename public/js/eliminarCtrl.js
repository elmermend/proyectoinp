var eliminarCtrl = angular.module('eliminarCtrl', ['geolocation', 'gservice']);
eliminarCtrl.controller('eliminarCtrl', function($scope, $http, $rootScope, geolocation, gservice){

    
    $scope.eliminarEvento = function() {

       
        var userData = {
            idevento: $scope.formData.idevento,
            
        };

        
        $http.post('/eliminar', userData)
            .success(function (data) {

                
                $scope.formData.idevento = "";
               
                
                gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

	$scope.newPersona = {};
	$scope.personas = {};
	$scope.selected = false;



$http.get('/users').success(function(data) {
        $scope.personas = data;
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });


   
    $scope.registrarPersona = function() {
        $http.post('/users', $scope.newPersona)
        .success(function(data) {
                $scope.newPersona = {}; // Borramos los datos del formulario
                $scope.personas = data;
            })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // Función para editar los datos de una persona
    $scope.modificarPersona = function(newPersona) {
        $http.put('/users' + $scope.newPersona._id, $scope.newPersona)
        .success(function(data) {
                $scope.newPersona = {}; // Borramos los datos del formulario
                $scope.personas = data;
                $scope.selected = false;
            })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    $scope.borrarPersona = function(newPersona) {
		$http.delete('/users' + $scope.newPersona._id)
		.success(function(data) {
			$scope.newPersona = {};
			$scope.personas = data;
			$scope.selected = false;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	// Función para coger el objeto seleccionado en la tabla
	$scope.selectPerson = function(persona) {
		$scope.newPersona = persona;
		$scope.selected = true;
		console.log($scope.newPersona, $scope.selected);
	};
});

