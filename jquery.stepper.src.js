/* jquery.stepper.src.js 2012-11-6 | https://github.com/Intera/jquery.stepper */
jQuery.fn.stepper = function (config) {

	// merge default config
	var defaultConfig = {

		// overwrite\set steps. format { stepNumber: jqueryObject }
		stepConfig: {},

		animation: 'fadeIn',

		// called on "show step", return true to continue switching
		onStepChange: function (from, to, stepper) { return true }
	}

	var config = $.extend(
		defaultConfig,
		config
	)

	// the jquery object for which the .stepper method is called
	var This = this

	// create stepper object
	var stepper = {

		// the currently active step number
		activeStep: 1,
		stepConfig: config.stepConfig,
		container: This,
		onStepChange: config.onStepChange,
		defaultAnimation: config.animation,
		animationSpeed: config.animationSpeed || 190,
		numberOfSteps: 0,

		get: function (number) {
			//get an object for step number //number//
			if (this.stepConfig && this.stepConfig[number]) {
				return this.stepConfig[number]
			} else {
				return this.container.find('.step' + number)
			}
		},

		nextStep: function () {
			this.showStep(this.activeStep + 1)
		},
		prevStep: function () {
			this.showStep(this.activeStep - 1)
		},

		setButtonEvents: function (step) {
			var This = this
			step.find('.nextStep').unbind('click.stepper').bind('click.stepper', function () { This.nextStep() })
			step.find('.prevStep').unbind('click.stepper').bind('click.stepper', function () { This.prevStep() })
			return step
		},

		hideAll: function () {

			// hide all steps which lie outside this step container
			if (this.stepConfig) {
				var t = this.stepConfig
				for (var key in t) {
					if (t.hasOwnProperty(key)) {
						t[key].hide()
					}
				}
			}
			this.container.hide().find('.step').hide()
			return this
		},

		init: function() {

			for (step in this.stepConfig) {
				if (this.stepConfig.hasOwnProperty(step)) {
					this.numberOfSteps++
				}
			}
			this.numberOfSteps += this.container.find('.step').length
			this.hideAll()
			return this
		},

		showStep: function (number) {

			var nextStep = this.get(number)

			// continue only if onStepChange is true
			if (this.onStepChange(this.activestep, number, this, nextStep)) {

				this.hideAll()

				// dom structure is only known with steps that are in 'this.container'
				var nextStep = this.setButtonEvents(nextStep)

				var nextStepContainer = nextStep.parent('div').show()
				var n = nextStep
				if (this.defaultAnimation) {
					var da = this.defaultAnimation
					if ('fadeIn' == da) { n.fadeIn(this.animationSpeed) }
					else if ('slideDown' == da) { n.slideDown(this.animationSpeed)	}
					else if ('slideUp' == da) {	n.slideUp(this.animationSpeed) }
					else { n.show()	}
				}
				else {
					n.show()
				}
				this.activeStep = number
			}

			return this
		},

		/**
		 * Selects the first step that contains an element
		 * that is found by the given jQuery selector
		 *
		 * @param string jQuery selector
		 * @return object Stepper instance
		 */
		showFirstStepThatContains: function(selector) {

			var step = 1
			var stepContainingElement = false
			while (step <= this.numberOfSteps) {

				var stepItem = this.get(step)
				if (stepItem.length) {
					if (stepItem.find(selector).length) {
						this.showStep(step)
						break
					}
				}

				step++
			}

			return this
		}
	}

	// init stepper object and return it
	return stepper.init()
}
