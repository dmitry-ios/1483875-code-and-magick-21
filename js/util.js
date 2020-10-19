'use strict';

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

const createErrorMessage = function (message) {
  const node = document.createElement(`div`);

  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `30px`;

  node.textContent = message;

  window.scrollTo(0, 0);

  document.body.insertAdjacentElement(`afterbegin`, node);
};

window.util = {
  randomNumber,
  getRandomColor,
  shuffleArray,
  createErrorMessage
};

