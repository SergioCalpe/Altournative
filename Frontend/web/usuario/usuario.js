angular.module('altournative.usuario', [
	'ui.router',
	'angular-storage',
	'angular-jwt'
])
.config(function($stateProvider) {
	$stateProvider.state('usuario', {
		url: '/usuario',
		controller: 'usuarioCtrler',
		templateUrl: 'usuario/usuario.html',
		data: {
			requiresLogin:  true 
		}
	});
})
.controller('usuarioCtrler', function usuarioController($scope, $http, store, jwtHelper, $location) {
	$scope.signup = function() {
		$location.path('/signup');
	}

	$scope.login = function() {
		$location.path('/login');
	}

	var decodedString = jwtHelper.decodeToken(store.get('jwt'))
	console.log(decodedString);
	$http({
  		method: 'GET',
  		url: 'http://localhost:3000/altournative/usuarios/' + decodedString.login,
  		 headers: {
   			'x-access-token': store.get('jwt')
 		}
	}).then(function successCallback(response) {
		$scope.data = response.data || "Request failed";

		$scope.usuario = $scope.data.Usuarios[0];
		console.log($scope.usuario)

  	}, function errorCallback(response) {
  		//Error server response
  	});

});