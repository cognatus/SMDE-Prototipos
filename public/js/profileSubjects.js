var app = angular.module('proSub', []);

app.controller('proStuContacts', function($scope, $http) {

	$scope.profileStuContacts = '';
	
	$scope.cargarAlumnos = function(){
		//Obtiene info de asignaturas del perfil
		$http({
			method: 'POST',
			url: '/getProfileContactsStudents'
		}).
		success(function(data) {
			$scope.profileStuContacts = data;		
		}).
		error(function() {
			alert('Error al Obtener Contactos(Alumnos)');
		});
		
	}

});

app.controller('proSubjects', function($scope, $http) {

	$scope.profileSubjects = '';

	$scope.cargarAsignaturas = function(){
		//Obtiene info de asignaturas del perfil
		$http({
			method: 'POST',
			url: '/getProfileSubjectsDatabase'
		}).
		success(function(data) {
			$scope.profileSubjects = data;
			ajaxDone();	
		}).
		error(function() {
			alert('Error al Obtener Información de Asignaturas');
		});
		
	}

});