'use strict';

const doNothing = function () {
};

let wizard = {
  onEyesChange: doNothing,
  onCoatChange: doNothing
};

const userDialog = document.querySelector(`.setup`);
const wizardCoat = userDialog.querySelector(`.setup-wizard .wizard-coat`);
const coatColorInput = userDialog.querySelector(`input[name=coat-color]`);
const wizardEyes = userDialog.querySelector(`.setup-wizard .wizard-eyes`);
const eyesColorInput = userDialog.querySelector(`input[name=eyes-color]`);
const fireball = userDialog.querySelector(`.setup-fireball-wrap`);
const fireballColorInput = userDialog.querySelector(`input[name=fireball-color]`);

const nextColorValue = function (colors, input, element) {
  const color = window.util.getRandomColor(colors);

  input.value = color;

  if (element.tagName.toLowerCase() === `div`) {
    element.style.backgroundColor = color;
  } else {
    element.style.fill = color;
  }
  return color;
};

wizardCoat.addEventListener(`click`, function () {
  const newColor = nextColorValue(window.constants.COAT_COLORS, coatColorInput, wizardCoat);
  wizard.onCoatChange(newColor);
});

wizardEyes.addEventListener(`click`, function () {
  const newColor = nextColorValue(window.constants.EYES_COLORS, eyesColorInput, wizardEyes);
  wizard.onEyesChange(newColor);
});

fireball.addEventListener(`click`, function () {
  nextColorValue(window.constants.FIREBALL_COLORS, fireballColorInput, fireball);
});

const setCoatChangeHandler = function (cb) {
  wizard.onCoatChange = cb;
};

const setEyesChangeHandler = function (cb) {
  wizard.onEyesChange = cb;
};

window.wizard = {
  setCoatChangeHandler,
  setEyesChangeHandler
};
