angular.module('app.regpinService', ['ngResource'])

.factory("regpinResource", function($http,$rootScope) {

	var service = {};

	service.post = function(model) {
		

		var config = {
			headers : {
				'Content-Type': 'multipart/form-data-encoded'
			}
		}
		return $http({method: 'POST',url: $rootScope.baseURL+'/RestFull/regpin/',data:model,config:config});


	};
	return service;
});