angular.module('altournative.guias', [
	'ui.router',
	'angular-storage',
	'angular-jwt'
])
.config(function($stateProvider) {
	$stateProvider.state('guias', {
		url: '/guias',
		controller: 'guiasCtrl',
		templateUrl: 'guias/guias.html',
		data: {
			requiresLogin:  true 
		}
	});
})
.controller('guiasCtrl', function guiasController($scope, $http, store, jwtHelper, $location) {
	$scope.signup = function() {
		$location.path('/signup');
	}

	$scope.login = function() {
		$location.path('/login');
	}

	$http({
  		method: 'GET',
  		url: 'http://localhost:3000/altournative/guias',
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
				guias);
		console.log(guias[2].items);
		$scope.data = guias;
		$scope.array = guias[2].items; //el vector de guias

  	}, function errorCallback(response) {
  		//Error server response
  	});

  	$scope.orderList = "id";
	var guias = [];
	
	$scope.toggleCategory = function(guia) {
		guia.expanded = !guia.expanded;
	};

	Object.defineProperty($scope, "miFiltro", {
      get: function() {
          var out = {};
          out[$scope.list || "$"] = $scope.search;
          return out;
      }
  	});

}).controller('guiaEditCtrl', function UsuarioEdicionController($scope, store, $http, jwtHelper) {
	// $scope.id_usuario = jwtHelper.decodeToken(store.get('jwt')).id;
	// console.log($scope.id_usuario+'/'+$scope.usuario.items.id+'-'+$scope.usuario.items.login);
	// if(id_usuario != $scope.usuario.items.id){
	// 	$('#botonEditar').prop( "disabled", true );
	// 	console.log(id_usuario+'/'+$scope.usuario.items.id+'-'+$scope.usuario.items.login);
	// }
	$scope.guardar = function() {
		

		$http({
  		method: 'PUT',
  		url: 'http://localhost:3000/altournative/guias/',
  		headers: {
   				'x-access-token': store.get('jwt')
 		},
 		data: $scope.guia

		}).then(function successCallback(response) {

  		}, function errorCallback(response) {
 
  		});
  		
	}
}).controller('guiaDelCtrl', function GuiaEdicionController($scope, store, $http, jwtHelper, $state) {
	// $scope.id_usuario = jwtHelper.decodeToken(store.get('jwt')).id;
	// console.log($scope.id_usuario+'/'+$scope.usuario.items.id+'-'+$scope.usuario.items.login);
	// if(id_usuario != $scope.usuario.items.id){
	// 	$('#botonEditar').prop( "disabled", true );
	// 	console.log(id_usuario+'/'+$scope.usuario.items.id+'-'+$scope.usuario.items.login);
	// }
	$scope.borrar = function() {
		

		$http({
  		method: 'DELETE',
  		url: 'http://localhost:3000/altournative/guias/'+ $scope.guia.id,
  		headers: {
   				'x-access-token': store.get('jwt')
 		},
 		data: $scope.guia

		}).then(function successCallback(response) {
				$state.reload();
  		}, function errorCallback(response) {
 
  		});
  		
	}
});