// Tuesday Morning
// map naming
// sort into Classes
// rearrange logically
//
// Tuesday Night
// refactor
//   collide
//   create and draw methods
// reorder pieces and numbers used
//
// Tuesday Night/Wednesday Morning
// add game loop
// pause
// start
// reset
//
// Wednesday Night/Thursday
// styling
//   colors
//   font
//   initech styling

const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

function boardSweep() {
    let rowCount = 1;
    outer: for (let y = board.length -1; y > 0; --y) {
        for (let x = 0; x < board[y].length; ++x) {
            if (board[y][x] === 0) {
                continue outer;
            }
        }

        const row = board.splice(y, 1)[0].fill(0);
        board.unshift(row);
        ++y;

        this.score += rowCount * 10;
        rowCount *= 2;
    }
}

function collide(board, piece) {
    const m = piece.matrix;
    const o = piece.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
               (board[y + o.y] &&
                board[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function createPiece(type)
{
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
            [0, 7, 0],
            [7, 7, 7],
            [0, 0, 0],
        ];
    }
}

function drawMatrix(matrix, coords) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect(x + coords.x,
                                 y + coords.y,
                                 1, 1);

            }
        });
    });
}

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(board, {x: 0, y: 0});
    drawMatrix(piece.matrix, piece.pos);
}

function merge(board, piece) {
    piece.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                board[y + piece.pos.y][x + piece.pos.x] = value;
            }
        });
    });
}

// function pieceReset() {
//     const pieces = 'TJLOSZI';
//     piece.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
//     piece.pos.y = 0;
//     piece.pos.x = (board[0].length / 2 | 0) -
//                    (piece.matrix[0].length / 2 | 0);
//
//
//     if (collide(board, piece)) {
//         board.forEach(row => row.fill(0));
//         this.score = 0;
//         updateScore();
//     }
// }



// function gameover(board){
//   // check top row for any non-zero values
//   const topRow = board[0];
//   for (let i = 0; i < topRow.length; i++) {
//     if (topRow[i] !== 0) {
//       return true;
//     }
//   }
//   return false;
// }
//
// function resetBoard() {
//   board.forEach(row => row.fill(0));
// }

// function resetScore() {
//   this.score = 0;
//   this.updateScore();
// }

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;

function update(time = 0) {

    const deltaTime = time - lastTime;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        piece.drop();
    }

    lastTime = time;

    draw();
    requestAnimationFrame(update);
}

document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
        piece.move(-1);
    } else if (event.keyCode === 39) {
        piece.move(1);
    } else if (event.keyCode === 40) {
        piece.drop();
    } else if (event.keyCode === 81) {
        piece.rotate(-1);
    } else if (event.keyCode === 87) {
        piece.rotate(1);
    }
});

const colors = [
    null,
    '#F61067',
    '#008080',
    '#ECA400',
    '#C14953',
    '#241E4E',
    '#F28123',
    '#D34E24',
];

const board = createMatrix(12, 20);

const piece = new Piece;

piece.place();
updateScore();
update();





// function updateScore() {
//     document.getElementById('score').innerText = this.score;
// }
