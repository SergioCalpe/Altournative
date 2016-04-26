angular.module('altournative', [
	'altournative.home',
	'altournative.signup',
	'altournative.login',
	'altournative.usuario',
	'altournative.usuarios',
	'altournative.guias',
	'altournative.guiasAdmin',
	'altournative.rutas',
	'angular-jwt',
	'angular-storage',
	'ui.bootstrap',
	'ngAnimate',
	'ui.gravatar'
])
.config(function myAppConfig($urlRouterProvider, jwtInterceptorProvider, $httpProvider) {
	$urlRouterProvider.otherwise('/');

	jwtInterceptorProvider.tokenGetter = function(store) {
		return store.get('jwt');
	}

	$httpProvider.interceptors.push('jwtInterceptor');
})
.run(function($rootScope, $state, store, jwtHelper) {
	$rootScope.$on('$stateChangeStart', function(e, to) {
		if(to.data && to.data.requiresLogin) {
			if(!store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
				e.preventDefault();
				$state.go('login');
			}
		}
	});
})
.controller( 'AppCtrl', function AppCtrl ($scope, $http,  $location, store, jwtHelper, $state) {
	$scope.userLoged = {};
	if(store.get('jwt')) {
		$scope.userLoged.login = jwtHelper.decodeToken(store.get('jwt'));
		$('#userLoged').show();
		$('#buttonAdmin').show();
		$http({
	  		method: 'GET',
	  		url: 'http://localhost:3000/altournative/usuarios/' + $scope.userLoged.login.login,
	  		 headers: {
	   			'x-access-token': store.get('jwt')
	 		}
		}).then(function successCallback(response) {
			$scope.data = response.data || "Request failed";

			$scope.usuario = $scope.data.Usuarios[0];
			console.log($scope.usuario);

	  	}, function errorCallback(response) {
	  		//Error server response
	  	});
	} else {
		$('#userLoged').hide();
		$('#buttonAdmin').hide();
	}

	$scope.signup = function() {
		$location.path('/signup');
	}

	$scope.login = function() {
		$location.path('/login');
	}

	$scope.logout = function() {
		store.remove('jwt');
		$state.go('home');
		$('#userLoged').hide();
		$('#buttonAdmin').hide();

	}


	$scope.perfil = function(){
		$location.path('/usuario');
	}
	$scope.usuarios = function(){
		$location.path('/usuarios');
	}
	$scope.guias = function(){
		$location.path('/guias');
	}
	$scope.guiasAdmin = function(){
		$location.path('/guiasAdmin');
	}
	$scope.rutas = function(){
		$location.path('/rutas');
	}
	
}).directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover',
            'height' : '640px',
            'width' : '1280px'
        });
    };
});
