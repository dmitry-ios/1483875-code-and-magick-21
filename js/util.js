'use strict';

(function () {
  const randomNumber = function (limit) {
    return Math.floor(Math.random() * limit);
  };

  const getRandomColor = function (colors) {
    return colors[randomNumber(colors.length)];
  };

  const shuffleArray = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const t = array[i];
      array[i] = array[j];
      array[j] = t;
    }
  };

  window.util = {
    randomNumber,
    getRandomColor,
    shuffleArray
  };
})();
