const Board = require('./board.js');
const Game = require('./game.js');

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.piece = this.createPiece;
  }

  createPiece(type) {
    if (type === 'I') {
      return [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ];
    } else if (type === 'L') {
      return [
        [0, 2, 0],
        [0, 2, 0],
        [0, 2, 2],
      ];
    } else if (type === 'J') {
      return [
        [0, 3, 0],
        [0, 3, 0],
        [3, 3, 0],
      ];
    } else if (type === 'O') {
      return [
        [4, 4],
        [4, 4],
      ];
    } else if (type === 'Z') {
      return [
        [5, 5, 0],
        [0, 5, 5],
        [0, 0, 0],
      ];
    } else if (type === 'S') {
      return [
        [0, 6, 6],
        [6, 6, 0],
        [0, 0, 0],
      ];
    } else if (type === 'T') {
      return [
        [0, 0, 0],
        [7, 7, 7],
        [0, 7, 0],
      ];
    }
  }
  //start()

  // animate(time)
    //deltaTime

    //this.game.step
    //this.game.draw
    //this.game.lastTime

    //this.lastTime = time;

    // requestAnimationFrame(this.animate.bind(this));
//   }
// }
}
module.exports = GameView;
