angular.module('altournative.rutas', [
	'ui.router',
	'angular-storage',
	'angular-jwt'
])
.config(function($stateProvider) {
	$stateProvider.state('rutas', {
		url: '/rutas',
		controller: 'rutasCtrl',
		templateUrl: 'rutas/rutas.html',
		data: {
			requiresLogin:  false
		}
	});
})
.controller('rutasCtrl', function rutasController($scope, $http, store, jwtHelper, $location,$sce) {
	$scope.signup = function() {
		$location.path('/signup');
	}

	$scope.login = function() {
		$location.path('/login');
	}

	$http({
  		method: 'GET',
  		url: 'http://localhost:3000/altournative/rutas',
  		 headers: {
   			'x-access-token': store.get('jwt')
 		}
	}).then(function successCallback(response) {
		$scope.data = response.data || "Request failed";
		//console.log($scope.data);
		angular
		.forEach($scope.data,
				function(value, key) {
					this.push({'expanded':false, 'items': value});
				},
				rutas);
		$scope.data = rutas;
		$scope.array = rutas[2].items; //el vector de rutas
		$scope.renderHtml = function(mapa)
		{
		    return $sce.trustAsHtml(mapa);
		};
		//$angular.element(document.querySelector('ru8taMapa').innerHTML+= $scope.array[0].mapa;
		//console.log($scope.array);

  	}, function errorCallback(response) {
  		//Error server response
  	});

  	$scope.orderList = "id";
	var rutas = [];

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

})
.controller('guiaCrearCtrl', function rutasController($scope, $http, store, jwtHelper, $location, $state) {
		$scope.signup = function() {
		$location.path('/signup');
	}

	$scope.login = function() {
		$location.path('/login');
	}

	$http({
  		method: 'POST',
  		url: 'http://localhost:3000/altournative/rutas',
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
				rutas);
		$scope.data = rutas;
		$scope.array = rutas[2].items; //el vector de rutas


  	}, function errorCallback(response) {
  		//Error server response
  	});

  	$scope.orderList = "id";
	var rutas = [];

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

})
.controller('guiaEditCtrl', function UsuarioEdicionController($scope, store, $http, jwtHelper) {
	// $scope.id_usuario = jwtHelper.decodeToken(store.get('jwt')).id;
	// console.log($scope.id_usuario+'/'+$scope.usuario.items.id+'-'+$scope.usuario.items.login);
	// if(id_usuario != $scope.usuario.items.id){
	// 	$('#botonEditar').prop( "disabled", true );
	// 	console.log(id_usuario+'/'+$scope.usuario.items.id+'-'+$scope.usuario.items.login);
	// }
	$scope.guardar = function() {
		$http({
  		method: 'PUT',
  		url: 'http://localhost:3000/altournative/rutas/',
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
  		url: 'http://localhost:3000/altournative/rutas/'+ $scope.guia.id,
  		headers: {
   				'x-access-token': store.get('jwt')
 		},
 		data: $scope.guia

		}).then(function successCallback(response) {
				$state.reload();
  		}, function errorCallback(response) {

  		});

	}
}).controller('rutaQueGuiaCtrl', function rutasQueGuiaController($scope, $http, store, jwtHelper, $location) {
	$scope.signup = function() {
		$location.path('/signup');
	}

	$scope.login = function() {
		$location.path('/login');
	}
	$http({
  		method: 'GET',
  		url: 'http://localhost:3000/altournative/rutas/guia/'+ $scope.ruta.id,
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
				rutas);
		//console.log($scope.data[2]);
		$scope.data = rutas;
		$scope.arrayGuia = rutas[2].items[0]; //el vector con datos del guía
  	}, function errorCallback(response) {
  		console.log("Error en server");
  	});

  	$scope.orderList = "id";
	var rutas = [];

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

});
