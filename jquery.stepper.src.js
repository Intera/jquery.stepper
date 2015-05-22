/* jquery.stepper.src.js 2014-5-2 | https://github.com/Intera/jquery.stepper */

jQuery.fn.stepper = function(config) {

	// merge default config
	var defaultConfig = {

		// overwrite\set steps. format { stepNumber: jqueryObject }
		stepConfig: {},

		animation: "fadeIn",

		// called on "show step", return true to continue switching
		onStepChange: function(from, to, stepper, nextStep) { return true },

		onAfterStepChange: function(from, to, stepper, nextStep) { },

		forwardButton: function(step) { return step.find(".nextStep") },
		backButton: function(step) { return step.find(".prevStep") },
		autoHideBackForward: true
	}

	var config = $.extend(
		defaultConfig,
		config
	)

	function getButton(config, step) {
		if ($.isFunction(config)) return config(step)
		else return (typeof config == "string") ? $(config) : config
	}

	// create stepper object
	var stepper = {

		// the currently active step number
		activeStepNumber: 1,
		stepConfig: config.stepConfig,
		container: this,
		onStepChange: config.onStepChange,
		onAfterStepChange: config.onAfterStepChange,
		defaultAnimation: config.animation,
		animationSpeed: config.animationSpeed || 190,
		numberOfSteps: 0,

		get: function(number) {
			//get an object for step number //number//
			if (this.stepConfig && this.stepConfig[number]) {
				return this.stepConfig[number]
			} else {
				return this.container.find(".step" + number)
			}
		},

		nextStep: function() {
			this.showStep(this.activeStepNumber + 1)
		},
		prevStep: function() {
			this.showStep(this.activeStepNumber - 1)
		},

		disableButtonEvents: function(step) {
			getButton(config.forwardButton, step).add(getButton(config.backButton, step)).off("click.stepper")
		},

		enableButtonEvents: function() { this.setButtonEvents(this.get(this.activeStepNumber)) },

		setButtonEvents: function(step) {
			//remove existing events because containers can be reused and used in different orders at the same time
			getButton(config.forwardButton, step).off("click.stepper").on("click.stepper", function(event) { stepper.nextStep(); return false; })
			getButton(config.backButton, step).off("click.stepper").on("click.stepper", function(event) { stepper.prevStep(); return false; })
			return step
		},

		hideAll: function() {

			// hide all steps which lie outside this step container
			if (this.stepConfig) {
				var t = this.stepConfig
				for (var key in t) {
					if (t.hasOwnProperty(key)) {
						t[key].hide()
					}
				}
			}
			this.container.find(".step").hide()
			return this
		},

		init: function() {

			for (step in this.stepConfig) {
				if (this.stepConfig.hasOwnProperty(step)) {
					this.numberOfSteps += 1
				}
			}
			this.numberOfSteps += this.container.find(".step").length
			this.hideAll()
			return this
		},

		showStep: function(number, withoutEvents) {

			var nextStep = this.get(number)

			// continue only if onStepChange is true
			if (withoutEvents || this.onStepChange(this.activeStepNumber, number, this, nextStep)) {

				this.hideAll()

				if (config.autoHideBackForward) {
					if (number < 2) {
						getButton(config.backButton, nextStep).hide()
						getButton(config.forwardButton, nextStep).show()
					}
					else if (number >= this.numberOfSteps) {
						getButton(config.forwardButton, nextStep).hide()
						getButton(config.backButton, nextStep).show()
					}
				}

				// dom structure is only known with steps that are in "this.container"
				var nextStep = this.setButtonEvents(nextStep)

				var n = nextStep
				var previousStepNumber = stepper.activeStepNumber
				function onComplete () {
					if (!withoutEvents) config.onAfterStepChange(previousStepNumber, number, stepper, nextStep)
				}
				if (this.defaultAnimation) {
					var da = this.defaultAnimation
					if ("fadeIn" == da) { n.fadeIn(this.animationSpeed, onComplete) }
					else if ("slideDown" == da) { n.slideDown(this.animationSpeed, onComplete)	}
					else if ("slideUp" == da) {	n.slideUp(this.animationSpeed, onComplete) }
					else { n.show(this.animationSpeed, onComplete)	}
				}
				else {
					n.show(this.animationSpeed, onComplete)
				}
				this.activeStepNumber = number
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
