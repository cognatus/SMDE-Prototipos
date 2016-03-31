var app = angular.module('management', []);

app.controller('todos', function($scope, $http) {

	$scope.adminsInfo = '';
	$scope.studentsInfo = '';
	$scope.studentsSubjects = '';
	$scope.teachersInfo = '';
	$scope.teachersSubjects = '';
	$scope.departmentInfo= '';
	$scope.subjectInfo= '';
	$scope.courseInfo= '';

	$scope.auxSubject = [];
	$scope.auxSubject2 = [];


	$scope.cargarTodos = function(){
		//Obtiene admins
		$http({
			method: 'POST',
			url: '/getAdministratorsDatabase'
		}).
		success(function(data) {
			$scope.adminsInfo = data;
		}).
		error(function() {
			alert('Error al obtener información de Aministradores');
		});
		//Obtiene Alumnos
		$http({
			method: 'POST',
			url: '/getStudentsDatabase'
		}).
		success(function(data) {
			$http({
				method: 'POST',
				url: '/getStudentsSubjectsDatabase'
			}).
			success(function(data2) {
				$scope.studentsInfo = data;
				$scope.studentsSubjects = data2;
			}).
			error(function() {
				alert('Error al obtener información de Asignaturas de Alumnos');
			});			
		}).
		error(function() {
			alert('Error al obtener información de Alumnos');
		});
		//Obtiene Profesores
		$http({
			method: 'POST',
			url: '/getTeachersDatabase'
		}).
		success(function(data) {
			$http({
				method: 'POST',
				url: '/getTeachersSubjectsDatabase'
			}).
			success(function(data2) {
				$scope.teachersInfo = data;
				$scope.teachersSubjects = data2;
			}).
			error(function() {
				alert('Error al obtener información de Asignaturas de Profesores');
			});
		}).
		error(function() {
			alert('Error al obtener información de Profesores');
		});
		//Obtiene Departamentos
		$http({
			method: 'POST',
			url: '/getDepartmentsDatabase'
		}).
		success(function(data) {
			$scope.departmentInfo = data;
		}).
		error(function() {
			alert('Error al obtener información de Departamentos');
		});
		//Obtiene Asignaturas
		$http({
			method: 'POST',
			url: '/getSubjectsDatabase'
		}).
		success(function(data) {
			$scope.subjectInfo = data;
		}).
		error(function() {
			alert('Error al obtener información de Asignaturas');
		});
		//Obtiene Grupos
		$http({
			method: 'POST',
			url: '/getCoursesDatabase'
		}).
		success(function(data) {
			$scope.courseInfo = data;
		}).
		error(function() {
			alert('Error al obtener información de Grupos');
		});
	}

	$scope.verCual = function(uno){
		$scope.auxSubject = [];

		for (var i = 0; i < $scope.studentsSubjects.length; i++) {
			if( uno == $scope.studentsSubjects[i].idStudent){
				$scope.auxSubject.push($scope.studentsSubjects[i]);
				console.log(uno);
				ajaxDone();
			}
		}
	};

	$scope.verCual2 = function(uno){
		$scope.auxSubject2 = [];

		for (var i = 0; i < $scope.teachersSubjects.length; i++) {
			if( uno == $scope.teachersSubjects[i].idTeacher){
				$scope.auxSubject2.push($scope.teachersSubjects[i]);
				console.log(uno);
				ajaxDone();
			}
		}
	};

});