'use strict';

(function () {
  const userDialog = document.querySelector(`.setup`);
  const wizardCoat = userDialog.querySelector(`.setup-wizard .wizard-coat`);
  const coatColorInput = userDialog.querySelector(`input[name=coat-color]`);
  const wizardEyes = userDialog.querySelector(`.setup-wizard .wizard-eyes`);
  const eyesColorInput = userDialog.querySelector(`input[name=eyes-color]`);
  const fireball = userDialog.querySelector(`.setup-fireball-wrap`);
  const fireballColorInput = userDialog.querySelector(`input[name=fireball-color]`);

  const setColorValue = function (colors, input, element, keyStyle) {
    const color = window.util.getRandomColor(colors);
    input.value = color;
    element.style[keyStyle] = color;
  };

  wizardCoat.addEventListener(`click`, function () {
    setColorValue(window.constants.COAT_COLORS, coatColorInput, wizardCoat, `fill`);
  });

  wizardEyes.addEventListener(`click`, function () {
    setColorValue(window.constants.EYES_COLORS, eyesColorInput, wizardEyes, `fill`);
  });

  fireball.addEventListener(`click`, function () {
    setColorValue(window.constants.FIREBALL_COLORS, fireballColorInput, fireball, `backgroundColor`);
  });
})();
