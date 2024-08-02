// elements
const board= document.getElementById('board')
const scoreBoard= document.getElementById('scoreBoard')
const start = document.getElementById('startButton')
const gameOver = document.getElementById('gameOver')
// Game Settings
const boardSize= 10;
const gameSpeed= 100;
const squareTypes= {
    emptySquare: 0,
    snakeSquare:1,
    foodSquare:2
}
const directions = {
    ArrowUp: -10,
    ArrowDown: 10,
    ArrowRight: 1,
    ArrowLeft: -1
}
// Game variables
let snake
let score
let direction
let boardSquares
let emptySquares
let moveInterval



