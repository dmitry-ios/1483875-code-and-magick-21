'use strict';

(function () {
  const NUMBER_OF_WIZRDS = 4;

  const userDialog = document.querySelector(`.setup`);

  const renderWizard = function (wizard, templateItem) {
    const wizardElement = templateItem.cloneNode(true);

    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardElement;
  };

  const makeFragmetWizards = function (elements) {
    const similarWizardTemplate = document.querySelector(`#similar-wizard-template`);
    const similarWizardItem = similarWizardTemplate.content.querySelector(`.setup-similar-item`);
    const fragment = document.createDocumentFragment();
    const length = Math.min(NUMBER_OF_WIZRDS, elements.length);

    for (let i = 0; i < length; i++) {
      const wizardElement = renderWizard(elements[i], similarWizardItem);

      fragment.appendChild(wizardElement);
    }

    return fragment;
  };

  const setupSimilarList = function (wizards) {
    const fragmentWithWizards = makeFragmetWizards(wizards);
    const similarListElement = userDialog.querySelector(`.setup-similar-list`);

    similarListElement.innerHTML = ``;

    similarListElement.appendChild(fragmentWithWizards);

    userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  window.render = {
    setupSimilarList
  };
})();
