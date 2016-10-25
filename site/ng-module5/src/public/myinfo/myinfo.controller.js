(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['RegistrationService'];
function MyInfoController(RegistrationService) {
	var myInfoCtrl = this;
	myInfoCtrl.hasValidMenuItem = RegistrationService.hasValidMenuItem === true;
	myInfoCtrl.menuItem = RegistrationService.getMenuItem();
	myInfoCtrl.menuImagePath = '';
	if (myInfoCtrl.menuItem) {
		myInfoCtrl.menuImagePath = 'images/menu/' + myInfoCtrl.menuItem.category_short_name + '/' + myInfoCtrl.menuItem.category_short_name + '.jpg';
	}
	myInfoCtrl.registration = RegistrationService.getRegistration();	
}

})();
