(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['RegistrationService'];
function SignupController(RegistrationService) {

	var signupCtrl = this;

	signupCtrl.registration = {
		account: {
			firstName: '',
			lastName: '', 
			emailAddress: '',
			phoneNumber: ''
		},
		menuItem: {
			shortName: ''
		}
	};

	signupCtrl.saveRegistration = function() {
		RegistrationService.saveRegistration(signupCtrl.registration);
	};
}

})();