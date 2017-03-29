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
