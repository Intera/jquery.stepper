# jquery.stepper
Shows DOM elements sequentially with next and previous buttons.

# Features
- Arbitrary DOM-elements can be displayed sequentially
- Unlimited number of steppers per page
- Multiple steppers can share DOM-elements
- Handling of first and last page
- Complete configuration through CSS classes possible (by specifying step numbers in class names)
- Callback methods - Setting different titles per step or other custom actions
- Steps can be outside the stepContainer (and the 'previous' button still works as expected)
- Steps can use multiple elements - they only need the right step number class and are all shown at the same time
- Animation

# Dependencies
- jQuery

# Usage
The default is to use elements with class ``step`` in the order defined by additional classes ``stepN``. For example ``step1``, ``step2``, etc.
Elements with the class "nextStep" or "prevStep" get the corresponding functionality in context.

## Example
```javascript
$(function () {
	var myWizard = $('#mywizard').stepper();
	myWizard.showStep(1);
});
```

A stepper step container HTML structure in css terms:

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
|stepConfig|Only to set steps manually|{stepNumber: jqueryObject, ...}|
|animation|Animation when changing steps|jQuery animation name|
|onStepChange|Must return a true value, otherwise the step change is aborted. Example use case: validation.|function(from, to, stepper)|

# Methods
- showStep(number)
- hideAll()
- showFirstStepThatContains(selector)
- hideAll()
- nextStep()
- prevStep()
- get(number)