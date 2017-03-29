/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(2);
const Piece = __webpack_require__(4);

class Game {
  constructor() {
    this.board = new Board(12, 20);
    this.piece = new Piece(this);
    this.score = 0;
    this.gameover = false;
  }

  gameover(){
    // check top row for any non-zero values
    const topRow = this.board[0];
    for (let i = 0; i < topRow.length; i++) {
      if (topRow[i] !== 0) {
        this.gameover = true;
      }
    }
    this.gameover = false;
  }

  resetScore() {
    this.score = 0;
    this.updateScore();
  }

  updateScore() {
    document.getElementById('score').innerText = this.score;
  }

}

Game.BG_COLOR = "#000";
Game.DIM_X = 240;
Game.DIM_Y = 400;
Game.FPS = 32;

module.exports = Game;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(2);
const Game = __webpack_require__(0);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Board {
  constructor(width, height) {
    this.matrix = this.create(width, height);
  }

  create(width, height) {
    const matrix = [];
    while (height > 0) {
        matrix.push(new Array(width).fill(0));
        height--;
    }
    return matrix;
  }

  addPiece(piece) {
    piece.matrix.forEach((row, y) => {
      row.forEach((el, x) => {
        if (el !== 0) {
          this.matrix[y + piece.pos.y][x + piece.pos.x] = el;
        }
      });
    });
  }

  collision(piece) {
      const tetromino = piece.matrix;
      const coord = piece.pos;
      for (let y = 0; y < tetromino.length; ++y) {
          for (let x = 0; x < tetromino[y].length; ++x) {
              if (tetromino[y][x] !== 0 &&
                 (this.matrix[y + coord.y] &&
                  this.matrix[y + coord.y][x + coord.x]) !== 0) {
                  return true;
              }
          }
      }
      return false;
  }

  filledRow() {
    let score = 0;
    let rowBonus = 1;
    outer: for (let y = this.matrix.length -1; y > 0; --y) {
        for (let x = 0; x < this.matrix[y].length; ++x) {
            if (this.matrix[y][x] === 0) {
                continue outer;
            }
        }

        // grab complete array, replace with 0's, recycle at the top
        const row = this.matrix.splice(y, 1)[0].fill(0);
        this.matrix.unshift(row);
        ++y;

        score += rowBonus * 100;
        rowBonus *= 4;
    }
    return score;
  }

  reset() {
    this.matrix.forEach(row => row.fill(0));
  }
}

module.exports = Board;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);
const  GameView = __webpack_require__(1);

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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

class Piece {
  constructor(game) {
    this.pos = {x: 0, y: 0};
    this.matrix =  null;
    this.score = 0; // move to game
    this.game = game;

    this.dropCounter = 0;
    this.dropInterval = 1000;

  }

  drop() {
    this.pos.y++;
    if (collide(board, piece)) {
      this.pos.y--;
      merge(board, piece);
      this.place();
      boardSweep();
      updateScore();
    }
    dropCounter = 0;
  }

// consolidate with drop
  move(shift) {
    this.pos.x += shift;
    if (collide(board, this)) {
        this.pos.x -= shift;
    }
  }

  place() {
      const pieces = 'TJLOSZI';
      piece.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
      piece.pos.y = 0;
      piece.pos.x = (board[0].length / 2 | 0) -
                     (piece.matrix[0].length / 2 | 0);


      if (collide(board, piece)) {
          board.forEach(row => row.fill(0));
          this.score = 0;
          updateScore();
      }
  }


  rotate(direction) {
      const pos = this.pos.x;
      let check = 1;
      this.transpose(this.matrix, direction);
      while (collide(board, this)) {
          this.pos.x += check;
          check = -(check + (check > 0 ? 1 : -1));
          if (check > this.matrix[0].length) {
              rotate(this.matrix, -direction);
              this.pos.x = pos;
              return;
          }
      }
  }

  transpose(matrix, direction) {
    for (let y = 0; y < matrix.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [
          matrix[x][y],
          matrix[y][x],
        ] = [
          matrix[y][x],
          matrix[x][y],
        ];
      }
    }

    if (direction > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
  }

  //step
  update(deltaTime) {
    this.dropCounter += deltaTime;
    if (this.dropCounter > this.dropInterval) {
      this.drop();
    }
  }

}


module.exports = Piece;






// transpose(matrix, direction) {
//   const result = [];
//
//   for(let i = 0; i < matrix.length; i++) {
//     result.push([]);
//   }
//
//   for (let i = 0; i < matrix.length; i++) {
//     for (let j = 0; j < matrix[i].length; j++) {
//       result[j].push(matrix[i][j]);
//     };
//   };
//   console.log(result);

  // if (direction > 0) {
  //   console.log(result);
  //   result.forEach(row => row.reverse());
  // } else {
  //   console.log(result);
  //   console.log("-1");
  //   result.reverse();
  // }
// }


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map