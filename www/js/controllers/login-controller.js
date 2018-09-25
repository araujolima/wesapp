angular.module('app.login-controller', ['app.loginService'])

.controller('LoginController', function($scope,$state,$rootScope,$ionicLoading,doLoginResource,$localStorage,$ionicHistory) {
	$scope.usuario = {};
	$scope.mensagem = '';
	console.log(this);
	$scope.goRecover = function(){
		$state.go('recover');
	};
	$scope.login = function(){
		console.log(this.formulario.$valid);
		if(this.formulario.$valid){
			console.log($scope.usuario);
			$ionicLoading.show({
       template: '<img src="img/rmfavicon.png" alt="" width="32" height="32" />',
       animation: 'fade-in',
       noBackdrop: true,
       maxWidth: 40,
       showDelay: 0
			}).then(function(){
			});
			doLoginResource.doLogin($scope.usuario)
			.success(function(data, status, headers, config) {
				var key = 'user';
				$localStorage.putObject(key,data);
				$rootScope.user = data;
				$ionicLoading.hide();
				if(data.CLI_ID != '' && data.CLI_ID != '0'){
					console.log(data);
					$scope.mensagem = '';
					$rootScope.goTabHome();	
				} else if(data.CLI_ID == ''){
					$scope.mensagem = '* Invalid user or password';
					$localStorage.putObject(key,{});
					$rootScope.user = {};
					$ionicHistory.clearHistory();
					$ionicHistory.clearCache();
				}else{
					$scope.mensagem = '* You need to activate your account';
					$localStorage.putObject(key,{});
					$rootScope.user = {};
					$ionicHistory.clearHistory();
					$ionicHistory.clearCache();

				}
				
			})
			.error(function(data, status, headers, config) {
				$ionicLoading.hide();
			});

			//$rootScope.goTabHome();
		}
		
	}
});