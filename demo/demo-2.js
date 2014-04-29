$(function () {
	var myWizard = $('#mywizard').stepper({
		forwardButton: ".nextStep",
		backButton: ".prevStep"
	});
	myWizard.showStep(1);
});
