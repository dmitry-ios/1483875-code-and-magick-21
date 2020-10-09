'use strict';

(function () {
  const NUMBER_OF_WIZRDS = 4;

  const userDialog = document.querySelector(`.setup`);
  const form = userDialog.querySelector(`.setup-wizard-form`);

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

  const setupWizardDialog = function (wizards) {
    const fragmentWithWizards = makeFragmetWizards(wizards);
    const similarListElement = userDialog.querySelector(`.setup-similar-list`);

    similarListElement.appendChild(fragmentWithWizards);

    userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  const successLoadHandler = function (jsonData) {
    window.util.shuffleArray(jsonData);
    setupWizardDialog(jsonData);
  };

  const successSaveHandler = function () {
    userDialog.classList.add(`hidden`);
  };

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);

    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;

    window.scrollTo(0, 0);

    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const onFormSubmit = function (evt) {
    const data = new FormData(form);

    window.backend.save(data, successSaveHandler, errorHandler);

    evt.preventDefault();
  };

  window.backend.load(successLoadHandler, errorHandler);

  form.addEventListener(`submit`, onFormSubmit);
})();
