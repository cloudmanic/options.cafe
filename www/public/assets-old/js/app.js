var app = angular.module('app', []);

//
// Site wide controller.
//
app.controller('SiteWideCtrl', function ($scope) {


});

//
// Newsletter controller.
//
app.controller('NewsletterCtrl', function ($scope, $http) {
	$scope.email = '';
	$scope.done = false;
	$scope.btn_text = 'Subscribe'; 
	
	// Send the subscribe to the server.
	$scope.subscribe = function ()
	{
		$scope.btn_text = 'Saving...';

		$http.post('/actions/sendy/newsletter/subscribe', { email: $scope.email }).success(function (json) {
			$scope.btn_text = 'Subscribe';
			$scope.done = true;
			
			// Log events.
			if(json.status && (! site.devMode))
			{
				clicky.goal('5193');
				_paq.push(['trackGoal', 1]);
			}
		});
	}

});