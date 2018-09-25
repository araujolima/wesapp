angular.module('app.register-controller', ['app.registerService','mobiscroll-form'])

//.controller('RegisterController', function($scope,$state,$stateParams,registerResource,$ionicLoading,$ionicHistory,$ionicPopup,$rootScope) {
.controller('RegisterController', function($scope,$state,registerResource,$ionicLoading,$ionicPopup) {
	$scope.settings = {
		lang: 'pt-BR',
		theme: 'mobiscroll' 
	};
	$scope.user = {
		email: null,
		password:null,
		confpassword: null
	};
	
	$scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
  };
  //alert($stateParams.param1);
  $scope.myGoBack = function() {
    //$state.go('login');
	
	//$ionicHistory.goBack(); INIBIDO PARA TESTE CAMERA
	
  };
	$scope.submit = function(){
		alert('1');
		if($scope.user.password == null || $scope.user.confpassword == null)
			return;
		if($scope.user.password != $scope.user.confpassword)
		{
			$scope.msgConfSenha = 'Passwords must match.';
			console.log($scope.msgConfSenha.length);
			return;
		}
		$ionicLoading.show({
       template: '<img src="img/rmfavicon.png" alt="" width="32" height="32" />',
       animation: 'fade-in',
       noBackdrop: true,
       maxWidth: 40,
       showDelay: 0
		}).then(function(){
		});
		registerResource.post($scope.user)
		.success(function(data, status, headers, config) {
			if(data.length == 0)
			{
				$ionicLoading.hide();
				$scope.showAlert('Error', 'User already registered.');
				return;
			}
			$ionicLoading.hide();
			//alert(data.PIN);
			$scope.showAlert('Success', 'User registered successfully.');
			//$state.go('login');
			//$state.go('regpin');
			//goRegpin(data.PIN,data.EMAIL);
			
			//$rootScope.goRegpin(data.PIN,data.EMAIL); INIBIDO PARA TESTE CAMERA
			
		})
		.error(function(data, status, headers, config) {
			$ionicLoading.hide();
		});
	}

	
	
});