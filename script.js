
// // Game variables
// let snake
// let score
// let direction
// let boardSquares
// let emptySquares
// let moveInterval


// const setDirection = (newDirection) =>{
//     direction = newDirection
// }
// const directionEvent = (key) => {
//     switch (key.code) {
//         case 'ArrowUp':
//              direction != 'ArrowDown' && setDirection(key.code)
//         break;
//         case 'ArrowDown':
//              direction != 'ArrowUp' && setDirection(key.code)
//         break;
//         case 'ArrowLeft':
//              direction != 'ArrowRight' && setDirection(key.code)
//         break;
//         case 'ArrowRight':
//              direction != 'ArrowLeft' && setDirection(key.code)
//         break;
//     }
// }


// Element references
const board = document.getElementById('board');
const scoreBoard = document.getElementById('scoreBoard');
const startButton = document.getElementById('startButton');
const gameOverSign = document.getElementById('gameOver');

// Game settings
const boardSize = 10;
const gameSpeed = 200;
const squareTypes = {
    emptySquare: 0,
    snakeSquare: 1,
    foodSquare: 2
};
const directions = {
    ArrowUp: -10,
    ArrowDown: 10,
    ArrowRight: 1,
    ArrowLeft: -1
};

// Game variables
let snake, score, direction, boardSquares, emptySquares, moveInterval;

function drawSnake() {
    snake.forEach(square => drawSquare(square, 'snakeSquare'));
}

function drawSquare(square, type) {
    const [row, col] = square.split('');
    boardSquares[row][col] = squareTypes[type];
    const squareElement = document.getElementById(square);
    squareElement.className = `square ${type}`;

    if (type === 'emptySquare') {
        emptySquares.push(square);
    } else {
        const index = emptySquares.indexOf(square);
        if (index !== -1) {
            emptySquares.splice(index, 1);
        }
    }
}

function moveSnake() {
    const newSquare = String(
        Number(snake[snake.length - 1]) + directions[direction]
    ).padStart(2, '0');
    const [row, col] = newSquare.split('');

    if (newSquare < 0 || 
        newSquare >= boardSize * boardSize ||
        (direction === 'ArrowRight' && col == 0) ||
        (direction === 'ArrowLeft' && col == 9) ||
        boardSquares[row][col] === squareTypes.snakeSquare) {
        gameOver();
    } else {
        snake.push(newSquare);
        if (boardSquares[row][col] === squareTypes.foodSquare) {
            addFood();
        } else {
            const emptySquare = snake.shift();
            drawSquare(emptySquare, 'emptySquare');
        }
        drawSnake();
    }
}

function addFood() {
    score++;
    updateScore();
    createRandomFood();
}

function gameOver() {
    gameOverSign.style.display = 'block';
    clearInterval(moveInterval);
    startButton.disabled = false;
}

function setDirection(newDirection) {
    direction = newDirection;
}

function directionEvent(key) {
    const oppositeDirections = {
        ArrowUp: 'ArrowDown',
        ArrowDown: 'ArrowUp',
        ArrowLeft: 'ArrowRight',
        ArrowRight: 'ArrowLeft'
    };

    if (key.code !== oppositeDirections[direction]) {
        setDirection(key.code);
    }
}
/// Para mobile
document.getElementById("Arrow-Up").addEventListener('click', ()=>{
    if (direction !== 'ArrowDown') setDirection('ArrowUp');
})
document.getElementById("Arrow-Down").addEventListener('click', ()=>{
    if (direction !== 'ArrowUp') setDirection('ArrowDown');
})
document.getElementById("Arrow-Left").addEventListener('click', ()=>{
    if (direction !== 'ArrowRight') setDirection('ArrowLeft');
})
document.getElementById("Arrow-Right").addEventListener('click', ()=>{
    if (direction !== 'ArrowLeft') setDirection('ArrowRight');
})


function createRandomFood() {
    const randomEmptySquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    drawSquare(randomEmptySquare, 'foodSquare');
}

function updateScore() {
    scoreBoard.innerText = score;
}

function createBoard() {
    boardSquares.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const squareValue = `${rowIndex}${colIndex}`;
            const squareElement = document.createElement('div');
            squareElement.className = 'square emptySquare';
            squareElement.id = squareValue;
            board.appendChild(squareElement);
            emptySquares.push(squareValue);
        });
    });
}

function setGame() {
    snake = ['00', '01', '02', '03'];
    score = snake.length;
    direction = 'ArrowRight';
    boardSquares = Array.from(Array(boardSize), () => new Array(boardSize).fill(squareTypes.emptySquare));
    board.innerHTML = '';
    emptySquares = [];
    createBoard();
}

function startGame() {
    gameOverSign.style.display = 'none';
    setGame();
    startButton.disabled = true;
    drawSnake();
    updateScore();
    createRandomFood();
    document.addEventListener('keydown', directionEvent);
    moveInterval = setInterval(moveSnake, gameSpeed);
}

startButton.addEventListener('click', startGame);