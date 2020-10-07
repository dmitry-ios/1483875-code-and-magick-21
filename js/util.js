'use strict';

(function () {
  const randomNumber = function (limit) {
    return Math.floor(Math.random() * limit);
  };

  const getRandomColor = function (colors) {
    return colors[randomNumber(colors.length)];
  };

  window.util = {
    randomNumber,
    getRandomColor
  };
})();
