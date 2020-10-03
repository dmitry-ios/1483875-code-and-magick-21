'use strict';

const TOO_SHORT_MESSAGE = `Имя персонажа не может содержать менее 2 символов`;
const TOO_LONG_MESSAGE = `Максимальная длина имени персонажа — 25 символов`;
const VALUE_MISSING_MESSAGE = `Обязательное поле`;

const FIRST_NAMES = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`
];

const LAST_NAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`
];

const COAT_COLORS = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];

const EYES_COLORS = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`
];

const FIREBALL_COLORS = [
  `#ee4830`,
  `#30a8ee`,
  `#5ce6c0`,
  `#e848d5`,
  `#e6e848`
];

const NUMBER_OF_WIZRDS = 4;

const randomNumber = function (limit) {
  return Math.floor(Math.random() * limit);
};

const generateWizardName = function () {
  const indexFirstName = randomNumber(FIRST_NAMES.length);
  const indexLastName = randomNumber(LAST_NAMES.length);
  const isReversed = randomNumber(2);
  const firstName = FIRST_NAMES[indexFirstName];
  const lastName = LAST_NAMES[indexLastName];

  return (!isReversed) ? `${firstName} ${lastName}` : `${lastName} ${firstName}`;
};

const getRandomColor = function (colors) {
  return colors[randomNumber(colors.length)];
};

const generateWizardData = function () {
  const name = generateWizardName();
  const coatColor = getRandomColor(COAT_COLORS);
  const eyesColor = getRandomColor(EYES_COLORS);

  return {name, coatColor, eyesColor};
};

const generateWizards = function (limit) {
  let wizards = [];

  for (let i = 0; i < limit; i++) {
    wizards[i] = generateWizardData();
  }

  return wizards;
};

const renderWizard = function (wizard, templateItem) {
  const wizardElement = templateItem.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

const makeFragmetWithWizards = function (wizards) {
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`);
  const similarWizardItem = similarWizardTemplate.content.querySelector(`.setup-similar-item`);
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < wizards.length; i++) {
    const wizardElement = renderWizard(wizards[i], similarWizardItem);

    fragment.appendChild(wizardElement);
  }

  return fragment;
};

const userDialog = document.querySelector(`.setup`);
const setupOpen = document.querySelector(`.setup-open`);
const setupClose = userDialog.querySelector(`.setup-close`);
const setupOpenIcon = document.querySelector(`.setup-open-icon`);
const setupUserName = document.querySelector(`.setup-user-name`);

const showSetupDialog = function () {
  // Создаем волшебников со случайными параметрами
  const wizards = generateWizards(NUMBER_OF_WIZRDS);

  // Заполняем шаблонную разметку случайными персонажами
  const fragmentWithWizards = makeFragmetWithWizards(wizards);
  const similarListElement = userDialog.querySelector(`.setup-similar-list`);
  similarListElement.appendChild(fragmentWithWizards);

  // и показываем их
  userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
};

showSetupDialog();

// Установка открытия и закрытия диалогового окна

const onDialogEscapePress = function (evt) {
  if (evt.key === `Escape` && evt.target !== setupUserName) {
    closeDialog();
  }
};

const onDialogEnterPress = function (evt) {
  if (evt.key === `Enter`) {
    closeDialog();
  }
};

const onDialogCloseClick = function () {
  closeDialog();
};

const openDialog = function () {
  userDialog.classList.remove(`hidden`);

  setupClose.addEventListener(`click`, onDialogCloseClick);
  setupClose.addEventListener(`keydown`, onDialogEnterPress);

  document.addEventListener(`keydown`, onDialogEscapePress);
};

const closeDialog = function () {
  userDialog.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onDialogEscapePress);

  setupClose.removeEventListener(`keydown`, onDialogEnterPress);
  setupClose.removeEventListener(`click`, onDialogCloseClick);
};

setupOpen.addEventListener(`click`, function () {
  openDialog();
});

setupOpenIcon.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    openDialog();
  }
});

// Валидация поля имени пользователя

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

// Установка действий на изменение внешнего вида

const wizardCoat = userDialog.querySelector(`.setup-wizard .wizard-coat`);
const coatColorInput = userDialog.querySelector(`input[name=coat-color]`);
const wizardEyes = userDialog.querySelector(`.setup-wizard .wizard-eyes`);
const eyesColorInput = userDialog.querySelector(`input[name=eyes-color]`);
const fireball = userDialog.querySelector(`.setup-fireball-wrap`);
const fireballColorInput = userDialog.querySelector(`input[name=fireball-color]`);

const setColorValue = function (colors, input, element, keyStyle) {
  const color = getRandomColor(colors);
  input.value = color;
  element.style[keyStyle] = color;
};

wizardCoat.addEventListener(`click`, function () {
  setColorValue(COAT_COLORS, coatColorInput, wizardCoat, `fill`);
});

wizardEyes.addEventListener(`click`, function () {
  setColorValue(EYES_COLORS, eyesColorInput, wizardEyes, `fill`);
});

fireball.addEventListener(`click`, function () {
  setColorValue(FIREBALL_COLORS, fireballColorInput, fireball, `backgroundColor`);
});
