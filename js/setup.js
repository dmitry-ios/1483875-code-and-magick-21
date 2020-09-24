'use strict';

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

const generateWizardData = function () {
  const name = generateWizardName();
  const coatColor = COAT_COLORS[randomNumber(COAT_COLORS.length)];
  const eyesColor = EYES_COLORS[randomNumber(EYES_COLORS.length)];

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

const showSetupDialog = function () {
  // Создаем волшебников со случайными параметрами
  const wizards = generateWizards(NUMBER_OF_WIZRDS);

  // Показываем диалоговое окно игрока с настройками персонажа
  const userDialog = document.querySelector(`.setup`);
  userDialog.classList.remove(`hidden`);

  // Заполняем шаблонную разметку случайными персонажами
  const fragmentWithWizards = makeFragmetWithWizards(wizards);
  const similarListElement = userDialog.querySelector(`.setup-similar-list`);
  similarListElement.appendChild(fragmentWithWizards);

  // и показываем их
  userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
};

showSetupDialog();
