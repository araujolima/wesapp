angular.module('app.transfers-controller', ['app.transfersService','mobiscroll-listview','mobiscroll-cards'])

.controller('TransfersController', function($scope,transfersResource,$ionicLoading,$rootScope,$localStorage) {
	$scope.transfers = [];
	
	$scope.listSettings = {
		theme: 'mobiscroll',
		lang: 'en-UK'
	};
	$ionicLoading.show({
       template: '<img src="img/rmfavicon.png" alt="" width="32" height="32" />',
       animation: 'fade-in',
       noBackdrop: true,
       maxWidth: 40,
       showDelay: 0
	}).then(function(){
	});
	var key = 'user';
	// mobiscroll
	var myDataWork = [];
	$rootScope.user = $localStorage.getObject(key);
	transfersResource.get($rootScope.user)
	.success(function(data, status, headers, config) {
		myDataWork = [];
		for (var i = 0;i < data.length; i++) {
			if(data[i].status == 'Paid'){
				data[i].icon = 'icon ion-checkmark-circled'
				data[i].estilo = 'position: relative;top: 5px; color: #00B300; left: 2px; text-align: left;float:left;'
			}else if(data[i].status == 'Sent to Payment' || data[i].status == 'On Hold Compliance'){
				data[i].icon = 'icon ion-forward'
				data[i].estilo = 'position: relative;top: 5px; color: #00B300; left: 2px; text-align: left;float:left;'
			}else if(data[i].status == 'Ready to Pay'){
				data[i].icon = 'icon ion-forward'
				data[i].estilo = 'position: relative;top: 5px; color: #275387; left: 2px; text-align: left;float:left;'
			}else if(data[i].status == 'Waiting Confirmation'){
				data[i].icon = 'icon ion-help-circled'
				data[i].estilo = 'position: relative;top: 5px; color: #FF8000; left: 2px; text-align: left;float:left;'
			}else{
				data[i].icon = 'icon ion-close-circled'
				data[i].estilo = 'position: relative;top: 5px; color: #FF4D4D; left: 2px; text-align: left;float:left;'
			}
			data[i].currency = data[i].currency.replace("GBP", "GBP to ");
			// mobicroll
			/*myDataWork.push({
				title: data[i].firstname + ' ' + data[i].lastname,
				subtitle: data[i].id + ' ' + data[i].valuepaid + ' ' + data[i].currency,
				img: '<span class="'+$scope.moedas[i].flag+'"></span>'+$scope.moedas[i].name
			});*/
			// mobiscroll
		}
		
		$scope.transfers = data;
		$ionicLoading.hide();
	})
	.error(function(data, status, headers, config) {
		$scope.transfers = [];
		$ionicLoading.hide();
	});
});