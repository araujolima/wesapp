angular.module('app.actacc-controller', ['app.actaccService','mobiscroll-form'])

.controller('ActaccController', function($scope,$state,$stateParams,actaccResource,$ionicLoading,$ionicPopup,$rootScope) {
	$scope.settings = {
		lang: 'pt-BR',
		theme: 'mobiscroll' 
	};
	$scope.usuario = {
		email: null,
		
		
	};
	
	$scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
  };
  $scope.myGoBack = function() {
    $state.go('login');
  };
		$scope.submit = function(){
		if($scope.usuario.email == null ||$scope.usuario.email == '')
			return;
		
		$ionicLoading.show({
       template: '<img src="img/rmfavicon.png" alt="" width="32" height="32" />',
       animation: 'fade-in',
       noBackdrop: true,
       maxWidth: 40,
       showDelay: 0
		}).then(function(){
		});
		actaccResource.post($scope.usuario)
		.success(function(data, status, headers, config) {
			
			$ionicLoading.hide();
			if(data.PIN != '')
			{
				//$scope.showAlert('Success', data.MSG);
				$scope.showAlert('You need to activate your account', 'Email sent with your PIN code.');
				$rootScope.goRegpin(data.PIN,data.EMAIL);
				}
			else{
				$scope.showAlert('Error', data.MSG);
			}
			
			
		})
		.error(function(data, status, headers, config) {
			$ionicLoading.hide();
		});
	}

	
	
});