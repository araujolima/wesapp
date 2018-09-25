angular.module('app.regpin-controller', ['app.regpinService','mobiscroll-form','mobiscroll-numpad'])

.controller('RegpinController', function($scope,$state,$stateParams,regpinResource,$ionicLoading,$ionicPopup) {
	$scope.pinset = $stateParams.param1;
	//$scope.dsblBtn = true;

	$scope.settings = {
		lang: 'en-UK',
		theme: 'mobiscroll' 
	};
	$scope.settingspin = {
		theme: 'mobiscroll',
		lang: 'en-UK',
		template: 'dddddd',
		allowLeadingZero: true,
		placeholder: '-',
		deleteIcon: '',
		mask: '*',
		validate: function (event, inst) {
			return {
				invalid: event.values.length != 6
			};
		},
		onInit: function (event,inst) {
			//$scope.pin1 = '0';
		},
		onSet: function (event,inst) {
			var pin = inst.getVal(); // Call the getVal method
			//$scope.pin1 = '1';
			$scope.mynumpad = pin;
		}
	};
	$scope.user = {
		email: $stateParams.param2,
		password:null,
		confpassword: null,
		pin: $stateParams.param1
	};
	
	$scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
  };
  //alert($stateParams.param1);
  $scope.myGoBack = function() {
    $state.go('login');
  };
	$scope.submit = function(){
		/*if($scope.user.password == null || $scope.user.confpassword == null)
			return;
		if($scope.user.password != $scope.user.confpassword)
		{
			$scope.msgConfSenha = 'Passwords must match.';
			console.log($scope.msgConfSenha.length);
			return;
		}*/
		$ionicLoading.show({
       template: '<img src="img/rmfavicon.png" alt="" width="32" height="32" />',
       animation: 'fade-in',
       noBackdrop: true,
       maxWidth: 40,
       showDelay: 0
		}).then(function(){
		});
		regpinResource.post($scope.user)
		.success(function(data, status, headers, config) {
			if(data.length == 0)
			{
				$ionicLoading.hide();
				$scope.showAlert('Error', 'User account not activated.');
				return;
			}
			$ionicLoading.hide();
			//alert(data.PIN);
			$scope.showAlert('Success', 'User account activated successfully.');
			$state.go('login');
		})
		.error(function(data, status, headers, config) {
			$ionicLoading.hide();
		});
	}

	
	
});