/*
this example demonstrates:
- multiple steppers on one page
- custom step titles
*/

$(function () {
	// step titles
	// there are different names for the same forms for different steppers
	var textSetVersionName = 'Versionsnummer angeben';
	var textVersionAnlegen = 'Versionseigenschaften eintragen';
	var textValidierungAnlegen = 'Validierung anlegen';

	var versionStepTitles = [
		'Übergeordnete Software auswählen',
		textSetVersionName,
		textVersionAnlegen,
		textValidierungAnlegen
	];
	var softwareStepTitles = [
		'Typ auswählen',
		'Eigenschaften eintragen',
		textSetVersionName,
		textVersionAnlegen,
		textValidierungAnlegen
	];

	var createStepTitle = function (activestep, maxStep, endPart) {
		return 'Schritt ' + activestep + ' von ' + maxStep + ': ' + endPart;
	}

	// returns 'true' for "onStepChange" to continue - "onStepChange" can prevent the step switch
	var updateStepTitle = function (nextStep, text) {
		nextStep.find('.stepper-activestep-info').text(text);
		return true;
	}

	var onStepChangeFunction = function (maxStep, titles) {
		return function (from, to, stepper, nextStep) {
			return updateStepTitle(nextStep, createStepTitle(to, maxStep, titles[to - 1]));
		}
	}

	// steps init
	var createValidation = $('.create-validation');

	var versionSteps = $('#tx-inttoolbox-software-step-selectParentSoftware').stepper({
		animation: 'fadeIn',
		stepConfig: {
			1: $('#tx-inttoolbox-software-step-selectParentSoftware'),
			2: $('#tx-inttoolbox-software-step-version-name'),
			3: $('#tx-inttoolbox-software-step-version'),
			4: $('#tx-inttoolbox-software-step-validation')
		},
		onStepChange: onStepChangeFunction(4, versionStepTitles)
	});

	var softwareSteps = $('#tx-inttoolbox-software-step-selectSoftwareType').stepper({
		animation: 'fadeIn',
		stepConfig:	{
			1: $('#tx-inttoolbox-software-step-selectSoftwareType'),
			2: $('#tx-inttoolbox-software-step-software'),
			3: $('#tx-inttoolbox-software-step-version-name'),
			4: $('#tx-inttoolbox-software-step-version'),
			5: $('#tx-inttoolbox-software-step-validation')
		},
		onStepChange: onStepChangeFunction(5, softwareStepTitles)
	});

	// tabs
	var tabCreateVersion = $('#tab-create-version');
	tabCreateVersion.click(function () {
		$('#tx-inttoolbox-software-createMode-version').attr('checked', 'checked');
		$('#tx-inttoolbox-software-createMode-software').removeAttr('checked');
		tabCreateSoftware.removeClass('active');
		tabCreateVersion.addClass('active');
		softwareSteps.hideAll();
		versionSteps.showStep(1);
		tx_inttoolbox_swform.switchCreateMode("version");
		$('#tx-inttoolbox-software-createMode-backLink').hide();
	});

	var tabCreateSoftware = $('#tab-create-software');
	tabCreateSoftware.click(function () {
		$('#tx-inttoolbox-software-createMode-software').attr('checked', 'checked');
		$('#tx-inttoolbox-software-createMode-version').removeAttr('checked');
		tabCreateVersion.removeClass('active');
		tabCreateSoftware.addClass('active');
		versionSteps.hideAll();
		softwareSteps.showStep(1);
		tx_inttoolbox_swform.switchCreateMode("software");
		$('#tx-inttoolbox-software-createMode-backLink').hide();
	});

	// check active tab
	if ($('#tx-inttoolbox-software-createMode-software:checked').length) {
		tabCreateSoftware.click();
		softwareSteps.showFirstStepThatContains('.f3-form-error');
	}
	else if ($('#tx-inttoolbox-software-createMode-version:checked').length) {
		tabCreateVersion.click();
		versionSteps.showFirstStepThatContains('.f3-form-error');
	}
});
