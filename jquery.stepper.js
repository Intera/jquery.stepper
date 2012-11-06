/* jquery.stepper.src.js 2012-11-6 | https://github.com/Intera/jquery.stepper */jQuery.fn.stepper=function(e){var t={stepConfig:{},animation:"fadeIn",onStepChange:function(e,t,n){return!0}},e=$.extend(t,e),n=this,r={activeStep:1,stepConfig:e.stepConfig,container:n,onStepChange:e.onStepChange,defaultAnimation:e.animation,animationSpeed:e.animationSpeed||190,numberOfSteps:0,get:function(e){return this.stepConfig&&this.stepConfig[e]?this.stepConfig[e]:this.container.find(".step"+e)},nextStep:function(){this.showStep(this.activeStep+1)},prevStep:function(){this.showStep(this.activeStep-1)},setButtonEvents:function(e){var t=this;return e.find(".nextStep").unbind("click.stepper").bind("click.stepper",function(){t.nextStep()}),e.find(".prevStep").unbind("click.stepper").bind("click.stepper",function(){t.prevStep()}),e},hideAll:function(){if(this.stepConfig){var e=this.stepConfig;for(var t in e)e.hasOwnProperty(t)&&e[t].hide()}return this.container.hide().find(".step").hide(),this},init:function(){for(step in this.stepConfig)this.stepConfig.hasOwnProperty(step)&&this.numberOfSteps++;return this.numberOfSteps+=this.container.find(".step").length,this.hideAll(),this},showStep:function(e){var t=this.get(e);if(this.onStepChange(this.activestep,e,this,t)){this.hideAll();var t=this.setButtonEvents(t),n=t.parent("div").show(),r=t;if(this.defaultAnimation){var i=this.defaultAnimation;"fadeIn"==i?r.fadeIn(this.animationSpeed):"slideDown"==i?r.slideDown(this.animationSpeed):"slideUp"==i?r.slideUp(this.animationSpeed):r.show()}else r.show();this.activeStep=e}return this},showFirstStepThatContains:function(e){var t=1,n=!1;while(t<=this.numberOfSteps){var r=this.get(t);if(r.length&&r.find(e).length){this.showStep(t);break}t++}return this}};return r.init()};