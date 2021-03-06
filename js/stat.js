'use strict';

const GAP = 10;

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const CLOUD_COLOR = `#ffffff`;
const CLOUD_SHADOW = `rgba(0, 0, 0, 0.7)`;

const BAR_GAP = 50;
const BAR_HEIGHT = 150;
const BAR_WIDTH = 40;

const TEXT_HEIGHT = 18;
const TEXT_X = CLOUD_X + GAP;
const TEXT_Y = CLOUD_Y + GAP;
const TEXT_GAP = 15;
const TEXT_COLOR = `#000000`;

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

const getColorByPlayer = function (player) {
  if (player === `Вы`) {
    return `rgba(255, 0, 0, 1)`;
  } else {
    const saturation = Math.floor(Math.random() * 100);
    return `hsl(240, ${saturation}%, 50%)`;
  }
};

const drawString = function (ctx, str, x, y) {
  str.split(`\n`).forEach(function (line, index) {
    ctx.fillText(line, x, y + index * TEXT_HEIGHT);
  });
};

const setDefaultFont = function (ctx) {
  ctx.font = `16px PT Mono`;
  ctx.textBaseline = `hanging`;
  ctx.fillStyle = TEXT_COLOR;
};

const drawInfo = function (ctx, text, x, y) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.fillText(text, x, y);
};

const drawBarForPlayer = function (ctx, player, x, y, height) {
  ctx.fillStyle = getColorByPlayer(player);
  ctx.fillRect(x, y, BAR_WIDTH, height);
};

window.renderStatistics = function (ctx, players, times) {
  // Показывает облако с тенью
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_SHADOW);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  // Показываем многострочный заголовок
  setDefaultFont(ctx);
  drawString(
      ctx,
      `Ура вы победили!\nСписок результатов:`,
      TEXT_X + TEXT_GAP,
      TEXT_Y + TEXT_GAP
  );

  const maxTime = getMaxElement(times);
  const barBottom = CLOUD_Y + CLOUD_HEIGHT;

  // Рисуем статистику в виде гистограммы
  for (let i = 0; i < players.length; i++) {
    const currentTime = Math.round(times[i]);
    const currentBarX = CLOUD_X + GAP + 2 * TEXT_GAP + i * (BAR_WIDTH + BAR_GAP);
    const currentBarHeight = (BAR_HEIGHT * times[i]) / maxTime;
    const currentBarY = barBottom - 2.5 * TEXT_GAP - currentBarHeight;
    const currentPointTextY = barBottom - 3.5 * TEXT_GAP - currentBarHeight;
    const currentPlayerTextY = barBottom - 2 * TEXT_GAP;

    // Показываем время игрока над столбиком
    drawInfo(ctx, currentTime, currentBarX, currentPointTextY);

    // Рисуем столбик
    drawBarForPlayer(ctx, players[i], currentBarX, currentBarY, currentBarHeight);

    // Показываем имя игрока под столбиком
    drawInfo(ctx, players[i], currentBarX, currentPlayerTextY);
  }
};
