angular.module('altournative', [
	'altournative.home',
	'altournative.signup',
	'altournative.login',
	'altournative.usuarios',
	'angular-jwt',
	'angular-storage',
	'ui.bootstrap',
	'ngAnimate'
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
.controller( 'AppCtrl', function AppCtrl ($scope, $location, store, jwtHelper, $state) {
	$scope.userLoged = {};
	if(store.get('jwt')) {
		$scope.userLoged.login = jwtHelper.decodeToken(store.get('jwt'));
		$('#userLoged').show();
		$('#buttonAdmin').show();
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

	$scope.usuarios = function(){
		$location.path('/usuarios');
	}
	
});
