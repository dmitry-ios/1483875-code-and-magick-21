'use strict';

const userDialog = document.querySelector(`.setup`);
const form = userDialog.querySelector(`.setup-wizard-form`);

let coatColor = `rgb(101, 137, 164)`;
let eyesColor = `black`;
let wizards = [];

const getRank = function (wizard) {
  let rank = 0;

  if (wizard.colorCoat === coatColor) {
    rank += 2;
  }
  if (wizard.colorEyes === eyesColor) {
    rank += 1;
  }

  return rank;
};

const namesComparator = function (left, right) {
  if (left > right) {
    return 1;
  } else if (left < right) {
    return -1;
  } else {
    return 0;
  }
};

const updateWizards = function () {
  const uniqueWizards = wizards.sort(function (left, right) {
    let rankDiff = getRank(right) - getRank(left);
    if (rankDiff === 0) {
      rankDiff = namesComparator(left.name, right.name);
    }
    return rankDiff;
  });

  window.render.setupSimilarList(uniqueWizards);
};

window.wizard.setEyesChangeHandler(window.debounce(function (color) {
  eyesColor = color;
  updateWizards();
}));

window.wizard.setCoatChangeHandler(window.debounce(function (color) {
  coatColor = color;
  updateWizards();
}));

const successLoadHandler = function (jsonData) {
  wizards = jsonData;
  updateWizards();
};

const successSaveHandler = function () {
  userDialog.classList.add(`hidden`);
};

const errorHandler = function (errorMessage) {
  window.util.createErrorMessage(errorMessage);
};

const onFormSubmit = function (evt) {
  const data = new FormData(form);

  window.backend.save(data, successSaveHandler, errorHandler);

  evt.preventDefault();
};

window.backend.load(successLoadHandler, errorHandler);

form.addEventListener(`submit`, onFormSubmit);

