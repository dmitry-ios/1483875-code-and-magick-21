'use strict';

(function () {
  const generateWizardName = function () {
    const indexFirstName = window.util.randomNumber(window.constants.FIRST_NAMES.length);
    const indexLastName = window.util.randomNumber(window.constants.LAST_NAMES.length);
    const isReversed = window.util.randomNumber(2);
    const firstName = window.constants.FIRST_NAMES[indexFirstName];
    const lastName = window.constants.LAST_NAMES[indexLastName];

    return (!isReversed) ? `${firstName} ${lastName}` : `${lastName} ${firstName}`;
  };

  const generateWizardData = function () {
    const name = generateWizardName();
    const coatColor = window.util.getRandomColor(window.constants.COAT_COLORS);
    const eyesColor = window.util.getRandomColor(window.constants.EYES_COLORS);

    return {name, coatColor, eyesColor};
  };

  const generateWizards = function (limit) {
    let wizards = [];

    for (let i = 0; i < limit; i++) {
      wizards[i] = generateWizardData();
    }

    return wizards;
  };

  window.mock = {
    generateWizards
  };
})();
