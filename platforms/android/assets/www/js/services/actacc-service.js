angular.module('app.actaccService', ['ngResource'])

.factory("actaccResource", function($http,$rootScope) {

	var service = {};

	service.post = function(model) {
		

		var config = {
			headers : {
				'Content-Type': 'multipart/form-data-encoded'
			}
		}
		return $http({method: 'POST',url: $rootScope.baseURL+'/RestFull/actacc/',data:model,config:config});


	};
	return service;
});