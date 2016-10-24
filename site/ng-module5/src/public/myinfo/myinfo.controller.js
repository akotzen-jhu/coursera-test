(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['RegistrationService'];
function MyInfoController(RegistrationService) {

	var myInfoCtrl = this;

	myInfoCtrl.getRegistration = function() {
		myInfoCtrl.registration = RegistrationService.getRegistration();
	};
}

})();
