function AppCtrl($scope, $http){
	console.log("hello from controller");
	var refresh = function() {
			$http.get('/xyz').success(function(response) {	
				console.log("I got the data I requested");
				$scope.chuntysPhoneBook = response;	
				$scope.contact = "";
		});
	};
	refresh();

	$scope.addContact = function() {
		console.log($scope.contact);
		$http.post('/xyz',$scope.contact).success(function(response) {
			console.log(response);
			refresh();
		});
	};

	$scope.remove = function(id){
		console.log(id);
		$http.delete('/xyz/' + id).success(function(response) {
			refresh();
		});
	};

	$scope.edit = function(id){
		console.log(id);
		$http.get('/xyz/' + id).success(function(response) {
			$scope.contact= response;
		});
	};
	$scope.update = function() {
		console.log($scope.contact._id);
		$http.put('/xyz/' + $scope.contact._id, $scope.contact).success(function(response){
			refresh();
		})
	};
	$scope.deselect = function() {
		$scope.contact = "";
	}
}
