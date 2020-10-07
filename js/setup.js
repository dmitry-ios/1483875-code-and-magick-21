'use strict';

(function () {
  const NUMBER_OF_WIZRDS = 4;

  const userDialog = document.querySelector(`.setup`);

  const wizards = window.mock.generateWizards(NUMBER_OF_WIZRDS);

  const renderWizard = function (wizard, templateItem) {
    const wizardElement = templateItem.cloneNode(true);

    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

    return wizardElement;
  };

  const makeFragmetWizards = function (elements) {
    const similarWizardTemplate = document.querySelector(`#similar-wizard-template`);
    const similarWizardItem = similarWizardTemplate.content.querySelector(`.setup-similar-item`);
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < elements.length; i++) {
      const wizardElement = renderWizard(elements[i], similarWizardItem);

      fragment.appendChild(wizardElement);
    }

    return fragment;
  };

  const setupWizardDialog = function () {
    const fragmentWithWizards = makeFragmetWizards(wizards);
    const similarListElement = userDialog.querySelector(`.setup-similar-list`);

    similarListElement.appendChild(fragmentWithWizards);

    userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  setupWizardDialog();
})();
