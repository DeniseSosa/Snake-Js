// elements
const board= document.getElementById('board')
const scoreBoard= document.getElementById('scoreBoard')
const startButton = document.getElementById('startButton')
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




function drawSnake () {
    snake.forEach(square => drawSquare(square,'snakeSquare'))
}

// Para crear un square y rellenar cada cuadrado del tablero
// params // 
//square: poosicion del cuadrado
//type: tipo de cuadrado (si es emptySquare, foodSquare o snakeSquare)

function drawSquare (square, type) {
    const [row, col] = square.split('')
    boardSquares[row][col]= squareTypes[type]
    const squareElement= document.getElementById(square)
    squareElement.setAttribute('class',`square${type}`)
    if(type === 'emptySquare'){
        emptySquares.push(square)
    } else {
        if(emptySquares.indexOf(square) !== -1){
            emptySquares.splice(emptySquares.indexOf(square), 1)
        }
    }
}

function createBoard () {
    boardSquares.forEach((row, rowIndex) => {
        row.forEach((col,colIndex) => {
           const squareValue = `${rowIndex}${colIndex}` 
           const squareElement= document.createElement('div')
           squareElement.setAttribute('class', 'square emptySquare')
           squareElement.setAttribute('id', squareValue)
           board.appendChild(squareElement)
           emptySquares.push(squareValue)
        });
    })
}

const setGame = () => {
    snake=['00','01','02','03']
    score= snake.length
    direction= 'ArrowRight'
    boardSquares= Array.from(Array(boardSize), () => new Array(boardSize).fill(squareTypes.emptySquare))
    console.log(boardSquares);
    board.innerHTML= ""
    emptySquares= []
    createBoard()
}

const startGame = () => {
    setGame()
    startButton.disabled= true
    drawSnake()
}

startButton.addEventListener('click',startGame)

