// elements
const board= document.getElementById('board')
const scoreBoard= document.getElementById('scoreBoard')
const startButton = document.getElementById('startButton')
const gameOverSign = document.getElementById('gameOver')
// Game Settings
const boardSize= 10;
const gameSpeed= 200;
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
    squareElement.setAttribute('class',`square ${type}`)
    if(type === 'emptySquare'){
        emptySquares.push(square)
    } else {
        if(emptySquares.indexOf(square) !== -1){
            emptySquares.splice(emptySquares.indexOf(square), 1)
        }
    }
}

function moveSnake () {
    const newSquare = String(
        Number(snake[snake.length -1]) + directions[direction])
    .padStart(2,'0')
    const [row,col] = newSquare.split('')

    if(newSquare < 0 || 
        newSquare > boardSize * boardSize ||
        (direction === 'ArrowRight' && col == 0) ||
        (direction === 'ArrowLeft' && col == 9 ||
        boardSquares[row][col] === squareTypes.snakeSquare) ) {
            gameOver()
        }else {
        snake.push(newSquare)
        if(boardSquares[row][col] === squareTypes.foodSquare){
            addFood()
        } else {
            const emptySquare = snake.shift()
            drawSquare(emptySquare, 'emptySquare')
        }
        drawSnake()
    }
}

const addFood = () => {
    score++;
    updateScore();
    createRandomFood()
}

const gameOver = () => {
    gameOverSign.style.display = 'block'
    clearInterval(moveInterval)
    startButton.disabled= false
}



const setDirection = (newDirection) =>{
    direction = newDirection
}
const directionEvent = (key) => {
    switch (key.code) {
        case 'ArrowUp':
             direction != 'ArrowDown' && setDirection(key.code)
        break;
        case 'ArrowDown':
             direction != 'ArrowUp' && setDirection(key.code)
        break;
        case 'ArrowLeft':
             direction != 'ArrowRight' && setDirection(key.code)
        break;
        case 'ArrowRight':
             direction != 'ArrowLeft' && setDirection(key.code)
        break;
    }
}


function createRandomFood () {
    const randomEmptySquare= emptySquares[Math.floor(Math.random()*emptySquares.length)]
    drawSquare(randomEmptySquare, 'foodSquare')
}

function updateScore () {
    scoreBoard.innerText = score
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
    updateScore()
    createRandomFood()
    document.addEventListener('keydown', directionEvent)
    moveInterval= setInterval( () =>moveSnake(), gameSpeed)
}

startButton.addEventListener('click',startGame)

