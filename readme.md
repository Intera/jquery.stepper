# jquery.stepper
Shows DOM-containers sequentially with next and previous buttons.

# Features
- Steps can be outside the stepContainer (and the 'previous' button still works as expected)
- Steps can use multiple containers - they only need the right step number class
- Animation

# Dependencies
- jQuery

# Usage
The default is to use elements with class ``step`` in the order defined by classes ``stepN``, for example ``step1``, ``step2``, etc.

## Example
```javascript
$(function () {
	var myWizard = $('#mywizard').stepper();
	myWizard.showStep(1);
});
```

A stepper step container HTML structure in css terms:

```css
  div.mystepcontainer
    div.step.step1
      div.nextStep
    div.step.step2
    div.step.step3
      div.prevStep
      div.nextStep
    ...
```

# Options
|optionName|description|optionValue|
----|----|----
|stepConfig|only to set steps manually|{stepNumber: jqueryObject, ...}|
|onAfterChange|animation|jQuery animation name|
|onStepChange||function(from, to, stepper)|

# Methods
- showStep(number)
- hideAll()
- showFirstStepThatContains(selector)
- hideAll()
- nextStep()
- prevStep()
- get(number)