import GameController from "./GameController.js";
import GameStatus from "./GameStatus.js";

let gameController = GameController;
const gameStatusH2 = document.getElementById('game-status');
const cells = document.querySelectorAll('.cell');
const currentPlayerSpan = document.getElementById('current-player-span');

cells.forEach(cell => {
    cell.addEventListener('click', (event) => clickHandlerBoard(event));})

const clickHandlerBoard = (event) => {
    event.stopPropagation();
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;
    gameController.playRound(row, col, 'P1', 'P2');
    updateScreen();
    updateCurrentPlayerTourSpan();
    updateGameResult();
}

const updateScreen = () => {
    clearCells(cells);
    fillCells(gameController.getMarkedBoard(), cells);
}

const clearCells = (cells) => {
    cells.forEach( (el) => {
        el.textContent = '';
    });
}

const fillCells = (markedBoard, cells) => {
    let counter = 0;
    for(let i = 0; i < markedBoard.length; i++) {
        for(let j = 0; j < markedBoard[0].length; j++) {
            const cellContent = document.createElement('span');
            cellContent.classList.add('mark');
            cellContent.classList.add(markedBoard[i][j].toUpperCase() === 'O' ? 'x' : 'o');
            cellContent.textContent = markedBoard[i][j];
            cells[counter++].appendChild(cellContent);
        }
    }
}

const updateCurrentPlayerTourSpan = () => {
    const player = gameController.getCurrentPlayerTour();
    const playerName = player.getName();
    const playerMark = player.getMark();
    console.log(playerName)
    console.log(playerMark)
    currentPlayerSpan.classList.add(playerMark.toUpperCase() === 'O' ? 'x' : 'o');
    currentPlayerSpan.textContent = playerName;
}

const updateGameResult = () => {
    const gameStatus = gameController.getCurrentGameStatus();
    console.log(gameStatus);
    if (gameStatus === GameStatus.WIN) {
        gameStatusH2.textContent = gameController.evaluateGameStatus().player.getName() + " WON !!!";
    } else if (gameStatus === GameStatus.TIE) {
        gameStatusH2.textContent ="It's a TIE";
    }
}

export default GameController;