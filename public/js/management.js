var app = angular.module('management', []);

app.controller('todos', function($scope, $http) {

	$scope.adminsInfo = '';
	$scope.studentsInfo = '';
	$scope.studentsSubjects = '';
	$scope.teachersInfo = '';
	$scope.teachersSubjects = '';

	$scope.auxSubject = [];
	$scope.auxSubject2 = [];

	$scope.verCual = function(uno){
		$scope.auxSubject = [];

		for (var i = 0; i < $scope.studentsSubjects.length; i++) {
			if( uno == $scope.studentsSubjects[i].idStudent){
				$scope.auxSubject.push($scope.studentsSubjects[i]);
				console.log(uno);
			}
		}
	};

	$scope.verCual2 = function(uno){
		$scope.auxSubject2 = [];

		for (var i = 0; i < $scope.teachersSubjects.length; i++) {
			if( uno == $scope.teachersSubjects[i].idTeacher){
				$scope.auxSubject2.push($scope.teachersSubjects[i]);
				console.log(uno);
			}
		}
	};

	$scope.cargarTodos = function(){
		//saca admins
		$http({
			method: 'POST',
			url: '/getAdministratorsDatabase'
		}).
		success(function(data) {
			$scope.adminsInfo = data;
		}).
		error(function() {
			alert('Error al recuperar info admin');
		});
		//saca alumnos
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
				alert('Error al recuperar info admin');
			});			
		}).
		error(function() {
			alert('Error al recuperar info admin');
		});
		//saca profes
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
				ajaxDone();
			}).
			error(function() {
				alert('Error al recuperar info admin');
			});		
		}).
		error(function() {
			alert('Error al recuperar info admin');
		});
	}

});