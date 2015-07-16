discoverlands.config(function($routeProvider){
	$routeProvider
		.when('/user/:id', {
			templateUrl: 'partials/newblank.html'
		})
		.when('/singleartist/:name', {
			templateUrl: 'partials/singleartist.html'
		})
		.when('/login', {
			templateUrl: 'partials/login.html'
		})
		.when('/lineup', {
			templateUrl: 'partials/linup.html'
		})
		.when('/view', {
			templateUrl: 'partials/view.html'
		})
		.when('/test/:id', {
			templateUrl: 'partials/newblank.html'
		})
		.when('/artist/:id', {
			templateUrl: 'partials/artistbackend.html'
		})
		.otherwise({
			redirectTo: '/login'
		})

})
