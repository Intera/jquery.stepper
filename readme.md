# jquery.stepper
Shows DOM-elements sequentially with forward and back buttons and events.

# Features
- Arbitrary DOM-elements can be configured as a series and displayed sequentially
- Automatic Forward/back-button hiding/display and events for the first and last page
- Events before and after step switch, for example to set different headings per step or other custom actions
- Unlimited number of steppers per page
- Steps can be shared between series and multiple stepper instances
- Series configuration can optionally be made with CSS-classes alone
- Show/hide of one or multiple elements per step
- No encapsulating Container necessary
- Step switch Animation

# Dependencies
- jQuery

# Usage
The default is to use elements with class ``step`` in the order defined by additional classes ``stepN``. For example ``step1``, ``step2``, et cetera
Elements with the class "nextStep" or "prevStep" get the corresponding button-functionality

## Example
```javascript
$(function () {
	var stepper = $('#stepper').stepper()
	stepper.showStep(1)
})
```

An example stepper container HTML-structure with a series of steps configured using CSS-classes:

```css
  #stepper
    .step.step1
      .nextStep
    .step.step2
      .prevStep
      .nextStep
    .step.step3
      .nextStep
    ...
```

# Options
|optionName|description|optionValue|
----|----|----
|stepConfig|To set step containers and order manually|{stepNumber: jqueryObject, ...}|
|animation|Animation when changing steps|jQuery animation name|
|animationSpeed|Millisecond duration for the animation|integer|
|onStepChange|Must return a true value, otherwise the step change is aborted. Example use case: validation.|function(from, to, stepper, nextStep)|
|onAfterStepChange|Called after the next step element has been displayed|function(from, to, stepper, nextStep)|
|forwardButton|For retrieving the forwardButton by jQuery-selector, jQuery-object or function|string, jQuery, function(step)|
|backButton|For retrieving the backButton by jQuery-selector, jQuery-object or function|string, jQuery, function(step)|
|autoHideBackForward|If true, hides the back button on the first step and the forward button on the last step. The default is "true"|boolean|

# Methods
- showStep(number, boolean) - if the second argument is a true value, then the onStepChange and onAfterStepChange events are not triggered
- hideAll()
- showFirstStepThatContains(selector)
- nextStep()
- prevStep()
- get(number)
- disableButtonEvents()
- enableButtonEvents()
