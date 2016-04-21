angular.module('altournative.home', [
	'ui.router',
	'angular-storage',
	'angular-jwt'
])
.config(function($stateProvider) {
	$stateProvider.state('home', {
		url: '/',
		controller: 'HomeCtrl',
		templateUrl: 'home/home.html',
		data: {
			requiresLogin: false
		}
	});
})
.controller('HomeCtrl', function HomeController($scope, $http, store, jwtHelper, $location) {
	$scope.signup = function() {
		$location.path('/signup');
	}

	$scope.login = function() {
		$location.path('/login');
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
