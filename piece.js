const Game = require('./game.js');

class Piece {
  constructor(game) {
    this.pos = {x: 0, y: 0};
    this.matrix =  null;
    this.score = 0; // move to game
    this.game = game;
    this.board = game.board;
    this.dropCounter = 0;
    this.dropInterval = 1000;

    this.createPiece();
  }

  createPiece() {

  }

  drop() {
    this.pos.y++;
    if (collision(this)) {
      this.pos.y--;
      this.board.addPiece(this);
      pieceReset();
      this.board.filledRow();
      updateScore();
    }
    dropCounter = 0;
  }

//handled by Board
// consolidate with drop
  move(shift) {
    this.pos.x += shift;
    if (collision(this)) {
        this.pos.x -= shift;
    }
  }

  rotate(dir) {
      const pos = this.pos.x;
      let check = 1;
      this.transpose(this.matrix, dir);
      while (this.board.collision(this)) {
          this.pos.x += check;
          check = -(check + (check > 0 ? 1 : -1));
          if (check > this.matrix[0].length) {
              rotate(this.matrix, -dir);
              this.pos.x = pos;
              return;
          }
      }
  }

  // _rotate(matrix, direction) {
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

  transpose(matrix, dir) {
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


    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
  }

  update(deltaTime) {
    this.dropCounter += deltaTime;
    if (this.dropCounter > this.dropInterval) {
      this.drop();
    }
  }

}

module.exports = Piece;
