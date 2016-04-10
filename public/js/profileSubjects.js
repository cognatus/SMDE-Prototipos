var app = angular.module('proSub', []);

app.controller('proSubjects', function($scope, $http) {

	$scope.profileSubjects = '';

	$scope.cargarInfo = function(){
		//Obtiene info de asignaturas del perfil
		$http({
			method: 'POST',
			url: '/getProfileSubjectsDatabase'
		}).
		success(function(data) {
			$scope.profileSubjects = data;		
		}).
		error(function() {
			alert('Error al Obtener Información de Asignaturas');
		});
		
	}

});