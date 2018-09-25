angular.module('app.benefi-persist-controller', ['app.benefiService','app.bankService','app.countryService','app.moedaService','mobiscroll-form','mobiscroll-select','ngMask','selector'])

.controller('BenefiPersistController', function($scope,$state,benefiResource,$localStorage,bankResource,countryResource,$ionicLoading,$rootScope,$ionicPopup,$stateParams,moedaResource) {

//alert('1');	
$scope.benef = {
	firstname: '',
	lastname: '',
	email: '',
	type: null,
	currency: null,
	bank: null,
	agency: '',
	account: '',
	agencydig: '',
	accountdig: '',
	routingnumber: '',
	accounttype:null,
	countryname : null,
	mobile:'',
	cpf:'',
	hash: JSON.parse(localStorage.getItem('user')).CLI_ID//$rootScope.user.CLI_ID
};
	// mobiscroll
	$scope.settings = {
		lang: 'en-UK',
		//lang: 'pt-BR',
		theme: 'mobiscroll' 
	};
	var myDataWork = [];
	$scope.selectOptions2 = {
		theme: 'mobiscroll',
		lang: 'en-UK',
		multiline: 1,
		height: 50,
		closeOnOverlayTap: true,
		circular: false,
		cssClass: 'my_btn_select',
		//buttons: ['cancel'],
		buttons: [
		{
					text: 'Done',
					handler: 'set'
		},
		{
					text: 'Cancel',
					handler: 'cancel'
		}
		],
		showScrollArrows: false,
		showLabel: false,
		showInput: true,
		filter: false,
		inputClass: 'demo-non-form',
		placeholder: 'Please Select...',
		//onItemTap: function (event,inst) {
		//	var countryselected = inst.getVal(); // Call the getVal method
		//	alert('Country ' + countryselected);
		//},
		onBeforeShow: function (event,inst) {
			//inst.setVal('44');
		},
		onSet: function (event,inst) {
			var cityselected1 = inst.getVal(); // Call the getVal method
			$scope.sel2 = cityselected1;
			$scope.benef.bank = cityselected1;
			//alert('CountrySet ' + countryselected1);
		}
	};

	$scope.cpfError = false;
$scope.back = function() {
    $state.go('tab.benefi');
  };

	var arrt = [];
	var arrt1 = [];
	$scope.countriest1 = [{}];
//alert('b1');
	$scope.moedas =[];
	$scope.moedast1 = [{}];
	$scope.benef.currency = '';
	//$scope.benef.init = 'y';

	$scope.updateMySelectedOptions= function(oldValue, newValue, typeChg) {
		//alert(JSON.stringify(newValue));
		//alert(newValue.id);
		//alert(newValue.id.substr(3,3));
		/*for (var i =0; i < $scope.moedas.length; i++) { 
			if ($scope.moedas[i].id == newValue.id) {
				$scope.benef.currency = substr(newValue.id,3,3);
				//alert($scope.benef.currency);
				$scope.currencyChange();
				break;
			}
		}*/
		//alert(substr(newValue.id,3));
		if (typeChg == 'curc') {
			//$scope.benef.init = 'n';
			//$scope.benef.currency = newValue.id.substr(3,3);
			$scope.benef.currency = newValue.ctry;
			//alert($scope.benef.currency + ' - ' + newValue.ctry);
			//alert($scope.benef.currency);
			$scope.currencyChange();
		}
	}

  
 $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
  };
/* REPLACE
	moedaResource.query(function(listamoedas) {
		$scope.moedas = listamoedas;
		for (var i =0; i < $scope.moedas.length; i++) {
			arrt1.push({
				id: $scope.moedas[i].id,
				name: $scope.moedas[i].name,
				rate: $scope.moedas[i].rate,
				//flag: $scope.moedas[i].flag
				flag: 'flag '+$scope.moedas[i].flag
			});
			$scope.moedas[i].flag = 'flag '+$scope.moedas[i].flag;
		}
		$scope.moedast1 = arrt1;
		//$scope.mymoedast = "GBPBRL";


		$ionicSlideBoxDelegate.update();
		$ionicLoading.hide();
	}, function(erro) {
		console.log(erro);
		$ionicLoading.hide();
		var myPopup = $ionicPopup.show({
			template: 'Verifique se você está conectado a internet!',
			title: 'Erro de conexão',
		});

	});
*/
		// AQUI REPLACE moedaResource.query by moedaResource.do(options)
		$ionicLoading.show({
		   template: '<img src="img/rmfavicon.png" alt="" width="32" height="32" />',
		   animation: 'fade-in',
		   noBackdrop: true,
		   maxWidth: 40,
		   showDelay: 0
		}).then(function(){
		});
			var options ={
				curnot: '',
				tipo: 'BEN'
			};
			moedaResource.do(options)
			.success(function(data, status, headers, config) {
			$scope.moedas = data;
			myDataWork = [];
			// mobicroll
			myDataWork.push({
				//value: $scope.moedas[i].id,
				value: '',
				text: 'Please Select...'
				//html: '<span class="flag '+$scope.moedas[i].flag+'"></span>'+$scope.moedas[i].name
			});
				// mobiscroll
			for (var i =0; i < $scope.moedas.length; i++) {
				arrt1.push({
					id: $scope.moedas[i].id,
					name: $scope.moedas[i].name,
					rate: $scope.moedas[i].rate,
					flag: 'flag '+$scope.moedas[i].flag,
					
					cur: $scope.moedas[i].id.substr(3,3) + ' ' + $scope.moedas[i].ctrn, // JUL18
					ctry: $scope.moedas[i].ctry, // JUL18
					ctrn: $scope.moedas[i].ctrn // JUL18
				});
				// mobicroll
				myDataWork.push({
					//value: $scope.moedas[i].id,
					value: $scope.moedas[i].ctry,
					text: $scope.moedas[i].name,
					html: '<span class="flag '+$scope.moedas[i].flag+'"></span>'+$scope.moedas[i].name
				});
				// mobiscroll
				$scope.moedas[i].flag = 'flag '+$scope.moedas[i].flag;
			}
			$scope.myData = myDataWork;
			$scope.moedast1 = arrt1;
			//alert('B');
			//$scope.sel = '351';

			//$ionicSlideBoxDelegate.update();
			$ionicLoading.hide();
			})
			.error(function(data, status, headers, config) {
			$ionicLoading.hide();
			var myPopup = $ionicPopup.show({
				template: 'Verifique se você está conectado a internet!',
				title: 'Erro de conexão',
			});

		});
		//
	$scope.selectOptions1 = {
		theme: 'mobiscroll',
		lang: 'en-UK',
		multiline: 1,
		height: 50,
		//display: 'bubble',
		closeOnOverlayTap: true,
		circular: false,
		cssClass: 'my_btn_select',
		//buttons: ['cancel','set'],
		buttons: [
		{
					text: 'Done',
					handler: 'set'
		},
		{
					text: 'Cancel',
					handler: 'cancel'
		}
		],
		showScrollArrows: false,
		showLabel: false,
		showInput: true,
		filter: false,
		inputClass: 'demo-non-form',
		placeholder: 'Please Select...',
		//onItemTap: function (event,inst) {
		//	var countryselected = inst.getVal(); // Call the getVal method
		//	alert('Country ' + countryselected);
		//},
		onBeforeShow: function (event,inst) {
			//inst.setVal('351');
			//$scope.sel = '351';
			//alert('C');
		},
		onCancel: function (event,inst) {
			//alert('a ' + $scope.sel);
			if ($scope.sel == null || typeof $scope.sel == "undefined") {
				//alert('ab ' + $scope.sel);
				//inst.setVal('351');
				//$scope.sel = '351';
				//$scope.sel = '';
			}
			//$scope.sel = '';
			//inst.clear();
		},
		onSet: function (event,inst) {
			var countryselected1 = inst.getVal(); // Call the getVal method
			$scope.sel = countryselected1;
			$scope.benef.currency = countryselected1;
			//alert('CountrySet ' + countryselected1);
			for (var i =0; i < $scope.moedas.length; i++) {
				if ($scope.moedas[i].id == countryselected1) {
					countryselected1 = $scope.moedas[i].ctry;
					$scope.benef.currency = $scope.moedas[i].ctry;
					break;
				}
			}
			$scope.sel2 = 'Please Select...';
			//alert('CountrySet ' + countryselected1);
			bankResource.get(countryselected1)
			.success(function(data, status, headers, config) {
				$scope.banks = data;
					myDataWork = [];
					myDataWork.push({
						//value: $scope.moedas[i].id,
						value: '',
						text: 'Please Select...'
						//html: '<span class="flag '+$scope.moedas[i].flag+'"></span>'+$scope.moedas[i].name
					});
					for (var i =0; i < $scope.banks.length; i++) {
						// mobicroll
						myDataWork.push({
							value: $scope.banks[i].id,
							text: $scope.banks[i].name
						});
						// mobiscroll
					}
					$scope.myData2 = myDataWork;
					/*for (var i =0; i < $scope.cities.length; i++) {
						if ($scope.cities[i].id == $scope.profile.CITY) {
							$scope.city1 = $scope.cities[i];
							break;
						}
					}*/
				$ionicLoading.hide();
			})
			.error(function(data, status, headers, config) {
				$ionicLoading.hide();
			});
		}
	};
  
  $scope.currencyChange = function() {
	  bankResource.get($scope.benef.currency)
	.success(function(data, status, headers, config) {
		$scope.banks = data;
		$ionicLoading.hide();
	});
	countryResource.where($scope.benef.currency)
	.success(function(data, status, headers, config) {
		$scope.countries = data;
		arrt = [];
		for (var i =0; i < $scope.countries.length; i++) {
			//if (i == 0) {
			//alert($scope.countries[i].flag);
			//}
			arrt.push({
				id: $scope.countries[i].id,
				name: $scope.countries[i].name,
				flag: $scope.countries[i].flag
			});
		}
		$scope.countriest1 = arrt;
		if ($scope.countries.length == 1) {
			//alert($scope.countries[0].id);
			$scope.countriest = $scope.countries[0].id;
		}
		$ionicLoading.hide();
	});
  };
  $scope.banks = [];
  $scope.countries = [];
  bankResource.get('')
	.success(function(data, status, headers, config) {
		$scope.banks = data;
		$ionicLoading.hide();
	});
	
$scope.submit = function(){
	console.log($scope.benef);
//alert('2');	
		$ionicLoading.show({
       template: '<img src="img/rmfavicon.png" alt="" width="32" height="32" />',
       animation: 'fade-in',
       noBackdrop: true,
       maxWidth: 40,
       showDelay: 0
	}).then(function(){
	});
//alert('21');	
	var error = false;
	$scope.cpfError = false;
	//validações
	
		if(($scope.benef.cpf == '' || !$scope.isCPF($scope.benef.cpf)) && $scope.benef.currency == '55')
	{
		$scope.cpfError = true;
		error = true;
//alert('22');	
	}
	if($scope.benef.firstname == '')
	{
		error = true;
//alert('23');	
	}
	if($scope.benef.lastname == '')
	{
		error = true;
//alert('24');	
	}
	if($scope.benef.type == null && $scope.benef.currency == 'EUR')
	{
		error = true;
//alert('25');	
	}
	if($scope.benef.routingnumber == null && $scope.benef.currency == 'USD')
	{
		error = true;
//alert('26');	
	}
	if($scope.benef.currency == null)
	{
		error = true;
//alert('27');	
	}
	//if($scope.benef.bank == null && $scope.benef.currency != 'EUR' && $scope.benef.currency != 'USD')
	if($scope.benef.bank == null)
	{
		error = true;
//alert('28');	
	}
	if($scope.benef.agency == ''  && $scope.benef.currency == '55')
	{
		error = true;
//alert('29');	
	}
	if($scope.benef.account == '' && $scope.benef.currency == '55')
	{
		error = true;
//alert('291');	
	}
	//if($scope.benef.accounttype == null && $scope.benef.currency != 'EUR')
	if($scope.benef.accounttype == null)
	{
		error = true;
//alert('292');	
	}
	
	if(error)
	{
			$ionicLoading.hide();
			return;
	}
//alert('3');	
		
	benefiResource.post($scope.benef)
		.success(function(data, status, headers, config) {
			$ionicLoading.hide();
			$scope.showAlert('Success', 'Beneficiary saved.');
			$state.go('tab.benefi');
		})
		.error(function(data, status, headers, config) {
			$ionicLoading.hide();
		});
	
};

$scope.isCPF = function (value) {
        // value = jQuery.trim(value);
    //var cpf0 = value.toString(); //.replace(/.|-|/gi, ''); // elimina .(ponto), -(hifem) e /(barra)
	//var cpf1 = cpf0.replace(/.|-|/gi, '');
	var cpf1 = value.replace('.','');
	var cpf2 = cpf1.replace('.','');
	var cpf3 = cpf2.replace('.','');
	var cpf4 = cpf3.replace('-','');
	cpf = cpf4; //.toString().replace(/.|-|/gi, '');
	
//alert('CPF ' + cpf);
    while (cpf.length < 11) cpf = "0" + cpf;
    var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
    var a = [];
    var b = new Number;
    var c = 11;
    for (i = 0; i < 11; i++) {
        a[i] = cpf.charAt(i);
        if (i < 9) b += (a[i] * --c);
    }
    if ((x = b % 11) < 2) {
        a[9] = 0
    } else {
        a[9] = 11 - x
    }
    b = 0;
    c = 11;
    for (var y = 0; y < 10; y++) b += (a[y] * c--);
    if ((x = b % 11) < 2) {
        a[10] = 0;
    } else {
        a[10] = 11 - x;
    }
    if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) return false;
    return true;
}

$scope.formatcpf = function (input) {
      var str = input + '';
      if(str.length <= 11){
        str = str.replace(/\D/g, '');
        str = str.replace(/(\d{3})(\d)/, "$1.$2");
        str = str.replace(/(\d{3})(\d)/, "$1.$2");
        str = str.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      }
	$scope.benef.cpf = str;
	//return $scope.benef.cpf;
}	

});

