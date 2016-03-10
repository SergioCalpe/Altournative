angular.module('altournative.login', [
	'ui.router',
	'angular-storage'
])
.config(function($stateProvider) {
	$stateProvider.state('login', {
		url: '/login',
		controller: 'LoginCtrl',
		templateUrl: 'login/login.html'
	});
})
.controller('LoginCtrl', function LoginController($scope, $http, store, $state, $window) {
	$scope.user = {};

	$scope.userLogin = function() {
		$http({
			url: 'http://localhost:3000/altournative/login',
			method: 'POST',
			headers: {
				'login': $scope.user.login,	
				'password': $scope.user.password
			}
		}).then(function(res) {
			store.set('jwt', res.data.token);
			
			$state.go('home');
			
      		if(store.get('jwt')) {
				$scope.userLoged.login.login = $scope.user.login;
				$('#userLoged').show();
				$('#buttonAdmin').show();
				


			} else {
				$('#userLoged').hide();
				$('#buttonAdmin').hide();

			}

		}, function(error) {
			alert(error.data);
		});
	}
});