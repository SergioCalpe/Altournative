angular.module('altournative.usuarios', [
	'ui.router',
	'angular-storage',
	'angular-jwt'
])
.config(function($stateProvider) {
	$stateProvider.state('usuarios', {
		url: '/usuarios',
		controller: 'UsuariosCtrl',
		templateUrl: 'usuarios/usuarios.html',
		data: {
			requiresLogin:  true 
		}
	});
})
.controller('UsuariosCtrl', function UsuariosController($scope, $http, store, jwtHelper, $location) {
	$scope.signup = function() {
		$location.path('/signup');
	}

	$scope.login = function() {
		$location.path('/login');
	}

	$http({
  		method: 'GET',
  		url: 'http://localhost:3000/altournative/usuarios',
  		 headers: {
   			'x-access-token': store.get('jwt')
 		}
	}).then(function successCallback(response) {
		$scope.data = response.data || "Request failed";
		
		angular
		.forEach($scope.data, 
				function(value, key) {
					this.push({'expanded':false, 'items': value});
				},
				usuarios);

		$scope.data = usuarios;
		$scope.array = usuarios[2].items; //el vector de usuarios

  	}, function errorCallback(response) {
  		//Error server response
  	});

  	$scope.orderList = "login";
	var usuarios = [];
	
	$scope.toggleCategory = function(usuario) {
		usuario.expanded = !usuario.expanded;
	};

	Object.defineProperty($scope, "miFiltro", {
      get: function() {
          var out = {};
          out[$scope.list || "$"] = $scope.search;
          return out;
      }
  	});

}).controller('UserEditCtrl', function UsuarioEdicionController($scope, store, $http, jwtHelper) {
	// $scope.id_usuario = jwtHelper.decodeToken(store.get('jwt')).id;
	// console.log($scope.id_usuario+'/'+$scope.usuario.items.id+'-'+$scope.usuario.items.login);
	// if(id_usuario != $scope.usuario.items.id){
	// 	$('#botonEditar').prop( "disabled", true );
	// 	console.log(id_usuario+'/'+$scope.usuario.items.id+'-'+$scope.usuario.items.login);
	// }
	$scope.guardar = function() {
		

		$http({
  		method: 'PUT',
  		url: 'http://localhost:3000/altournative/usuarios/',
  		headers: {
   				'x-access-token': store.get('jwt')
 		},
 		data: $scope.usuario

		}).then(function successCallback(response) {

  		}, function errorCallback(response) {
 
  		});
  		
	}
}).controller('UserDelCtrl', function UsuarioEdicionController($scope, store, $http, jwtHelper) {
	// $scope.id_usuario = jwtHelper.decodeToken(store.get('jwt')).id;
	// console.log($scope.id_usuario+'/'+$scope.usuario.items.id+'-'+$scope.usuario.items.login);
	// if(id_usuario != $scope.usuario.items.id){
	// 	$('#botonEditar').prop( "disabled", true );
	// 	console.log(id_usuario+'/'+$scope.usuario.items.id+'-'+$scope.usuario.items.login);
	// }
	$scope.borrar = function() {
		

		$http({
  		method: 'DELETE',
  		url: 'http://localhost:3000/altournative/usuarios/'+$scope.usuario.login,
  		headers: {
   				'x-access-token': store.get('jwt')
 		},
 		data: $scope.usuario

		}).then(function successCallback(response) {

  		}, function errorCallback(response) {
 
  		});
  		
	}
});