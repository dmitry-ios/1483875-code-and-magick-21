'use strict';

const TOO_SHORT_MESSAGE = `Имя персонажа не может содержать менее 2 символов`;
const TOO_LONG_MESSAGE = `Максимальная длина имени персонажа — 25 символов`;
const VALUE_MISSING_MESSAGE = `Обязательное поле`;

const setupUserName = document.querySelector(`.setup-user-name`);

setupUserName.addEventListener(`invalid`, function () {
  const validity = setupUserName.validity;

  if (validity.tooShort) {
    setupUserName.setCustomValidity(TOO_SHORT_MESSAGE);
  } else if (validity.tooLong) {
    setupUserName.setCustomValidity(TOO_LONG_MESSAGE);
  } else if (validity.valueMissing) {
    setupUserName.setCustomValidity(VALUE_MISSING_MESSAGE);
  } else {
    setupUserName.setCustomValidity(``);
  }
});

