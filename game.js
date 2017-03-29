class Game {
  constructor() {
    this.board = new Board(12, 20);
    this.piece = new Piece(this);
  }
}

module.exports = Game;
