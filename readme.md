# jquery.stepper
Shows DOM-elements sequentially with forward and back buttons and events.

# Features
- Arbitrary DOM-elements can be displayed sequentially
- Unlimited number of steppers per page
- Multiple steppers can share DOM-elements
- forward/back-button hiding/display and events for the first and last page
- Step and order configuration can be made with CSS classes
- Events - for example for setting different titles per step or other custom actions
- Steps can be outside a main "stepContainer" (and the back-button still works as expected)
- Steps can show/hide multiple elements at once
- Animation

# Dependencies
- jQuery

# Usage
The default is to use elements with class ``step`` in the order defined by additional classes ``stepN``. For example ``step1``, ``step2``, etc.
Elements with the class "nextStep" or "prevStep" get the corresponding functionality in context.

## Example
```javascript
$(function () {
	var myWizard = $('#mywizard').stepper()
	myWizard.showStep(1)
});
```

An example stepper container HTML-structure using CSS-classes (not required):

```css
  div#mywizard
    div.step.step1
      div.nextStep
    div.step.step2
      div.prevStep
      div.nextStep
    div.step.step3
      div.nextStep
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

# Methods
- showStep(number)
- hideAll()
- showFirstStepThatContains(selector)
- nextStep()
- prevStep()
- get(number)
- disableButtonEvents()
- enableButtonEvents()
