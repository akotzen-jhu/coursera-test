(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['RegistrationService'];
function MyInfoController(RegistrationService) {
	var myInfoCtrl = this;
	myInfoCtrl.hasValidMenuItem = RegistrationService.hasValidMenuItem();
	myInfoCtrl.menuItem = RegistrationService.getMenuItem();
	myInfoCtrl.menuCategoryShortName = RegistrationService.getMenuCategoryShortName();
	myInfoCtrl.registration = RegistrationService.getRegistration();
}

})();
