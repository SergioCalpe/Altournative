angular.module('altournative.usuario', [
	'ui.router',
	'angular-storage',
	'angular-jwt'
])
.config(function($stateProvider) {
	$stateProvider.state('usuario', {
		url: '/',
		controller: 'usuarioCtrl',
		templateUrl: 'usuario/usuario.html',
		data: {
			requiresLogin:  true 
		}
	});
})
.controller('usuarioCtrl', function usuarioController($scope, $http, store, jwtHelper, $location) {
	$scope.signup = function() {
		$location.path('/signup');
	}

	$scope.login = function() {
		$location.path('/login');
	}

});