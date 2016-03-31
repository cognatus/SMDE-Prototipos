var app = angular.module('profile', []);

app.controller('perfil', function($scope, $http) {

	$scope.profileInfo = '';
	$scope.profileSubjects = '';

	/*$scope.auxSubject = [];

	$scope.verCual = function(uno){
		$scope.auxSubject = [];

		for (var i = 0; i < $scope.profileSubjects.length; i++) {
			if( uno == $scope.profileSubjects[i].idStudent){
				$scope.auxSubject.push($scope.profileSubjects[i]);
				console.log(uno);
				ajaxDone();
			}
		}
	};*/

	$scope.cargarInfo = function(){
		//Obtiene info del perfil
		$http({
			method: 'POST',
			url: '/getProfileInfo'
		}).
		/*success(function(data) {
			$http({
				method: 'POST',
				url: '/getProfileSubjectsDatabase'
			}).
			success(function(data2) {
				$scope.profileInfo = data;
				$scope.profileSubjects = data2;
			}).
			error(function() {
				alert('Error al recuperar info admin');
			});			
		}).*/
		error(function() {
			alert('Error al Obtener Información');
		});
		
	}

});