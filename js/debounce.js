'use strict';

const DEBOUNCE_INTERVAL = 500;

window.debounce = function (cb) {
  let lastTimeout = null;

  return function (...args) {
    let parameters = args;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};
