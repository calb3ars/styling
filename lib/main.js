const Game = require("./game");
const  GameView = require('./game_view');

document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementById("tetris");
  const ctx = canvasEl.getContext("2d");
  ctx.scale(20,20);
  ctx.fillStyle = '#000';
  ctx.fillRect(0,0, canvasEl.width, canvasEl.height);
  const game = new Game();
  // new (game, ctx);
  new GameView(game, ctx);
});
