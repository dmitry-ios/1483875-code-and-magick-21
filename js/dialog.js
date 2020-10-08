'use strict';

(function () {
  const ORIGIN_TOP_POSITION = `80px`;
  const ORIGIN_LEFT_POSITION = `50%`;

  const setupDialogElement = document.querySelector(`.setup`);
  const dialogHandle = setupDialogElement.querySelector(`.upload`);
  const setupOpen = document.querySelector(`.setup-open`);
  const setupClose = setupDialogElement.querySelector(`.setup-close`);
  const setupOpenIcon = document.querySelector(`.setup-open-icon`);
  const setupUserName = document.querySelector(`.setup-user-name`);

  const onMouseDown = function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    let dragged = false;

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      setupDialogElement.style.top = setupDialogElement.offsetTop - shift.y + `px`;
      setupDialogElement.style.left = setupDialogElement.offsetLeft - shift.x + `px`;
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener(`click`, onClickPreventDefault);
        };
        dialogHandle.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  const setupMoveDialog = function () {
    dialogHandle.addEventListener(`mousedown`, onMouseDown);
  };

  const resetMoveDialog = function () {
    dialogHandle.removeEventListener(`mousedown`, onMouseDown);

    setupDialogElement.style.top = ORIGIN_TOP_POSITION;
    setupDialogElement.style.left = ORIGIN_LEFT_POSITION;
  };

  const onDialogEscapePress = function (evt) {
    if (evt.key === `Escape` && evt.target !== setupUserName) {
      closeDialog();
    }
  };

  const onDialogEnterPress = function (evt) {
    if (evt.key === `Enter`) {
      closeDialog();
    }
  };

  const onDialogCloseClick = function () {
    closeDialog();
  };

  const openDialog = function () {
    setupDialogElement.classList.remove(`hidden`);

    setupClose.addEventListener(`click`, onDialogCloseClick);
    setupClose.addEventListener(`keydown`, onDialogEnterPress);

    document.addEventListener(`keydown`, onDialogEscapePress);

    setupMoveDialog();
  };

  const closeDialog = function () {
    setupDialogElement.classList.add(`hidden`);

    document.removeEventListener(`keydown`, onDialogEscapePress);

    setupClose.removeEventListener(`keydown`, onDialogEnterPress);
    setupClose.removeEventListener(`click`, onDialogCloseClick);

    resetMoveDialog();
  };

  setupOpen.addEventListener(`click`, function () {
    openDialog();
  });

  setupOpenIcon.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      openDialog();
    }
  });
})();
