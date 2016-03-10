angular.module('altournative.signup', [
	'ui.router',
	'angular-storage'
])
.config(function($stateProvider) {
	$stateProvider.state('signup', {
		url: '/signup',
		controller: 'SignupCntl',
		templateUrl: 'signup/signup.html'
	});
})
.controller('SignupCntl', function SignupController($scope, $http, store, $state, $location) {
	$scope.user = {}
	$scope.signup = function() {
		$http({
			url: 'http://localhost:3000/altournative/signup',
			method: 'POST',
			data: $scope.user
		}).then(function (res) {
			store.set('jwt', res.data.idToken);
			$state.go('home');
			if(store.get('jwt')) {
				$scope.userLoged.msg = 'Bienvenido'
				$scope.userLoged.login = $scope.user.login;
				$('#userLoged').show();
			} else {
				$('#userLoged').hide();
			}
		}, function(error) {
			alert(error.data);
		});
	}
	$scope.home = function() {
		$location.path('/');
	}
});