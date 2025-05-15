import GameController from "./GameController.js";
import GameStatus from "./GameStatus.js";

let gameController = GameController;
const gameStatusH2 = document.getElementById('game-status');
const cells = document.querySelectorAll('.cell');
const currentPlayerSpan = document.getElementById('current-player-span');
const startRestartButton = document.getElementById('start-restart-button');
const startRestartButtonText = document.getElementById('start-restart-button-text');

let hasGameStarted = false;

document.addEventListener('DOMContentLoaded', () => {
    setButtonToStartMode();
})

cells.forEach(cell => {
    cell.addEventListener('click', (event) => clickHandlerBoard(event));
})


const clickHandlerBoard = (event) => {
    if (!hasGameStarted) {
        setButtonToRestartMode();
    }
    hasGameStarted = true;
    event.stopPropagation();
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;
    gameController.playRound(row, col, 'P1', 'P2');
    updateScreen();
}

const updateScreen = () => {
    clearCells(cells);
    fillCells(gameController.getMarkedBoard(), cells);
    updateGameResult();
    updateCurrentPlayerTourSpan();
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
    const playerName = player ? player.getName() : '';
    const playerMark = player ? player.getName() : '';
    currentPlayerSpan.classList.add(playerMark.toUpperCase() === 'O' ? 'x' : 'o');
    currentPlayerSpan.textContent = playerName;
}

const updateGameResult = () => {
    const gameStatus = gameController.getCurrentGameStatus();
    if (gameStatus === GameStatus.WIN) {
        gameStatusH2.textContent = gameController.evaluateGameStatus().player.getName() + " WON !!!";
    } else if (gameStatus === GameStatus.TIE) {
        gameStatusH2.textContent ="It's a TIE";
    }
}

startRestartButton.addEventListener('click', (event) => clickHandlerStartRestartButton(event));

const clickHandlerStartRestartButton = (event) => {
    if (hasGameStarted) {
        hasGameStarted = !hasGameStarted;
    }
    event.stopPropagation();
    gameController.resetGame();
    updateScreen();
    if (startRestartButton.classList.contains('start')) {
        setButtonToRestartMode();
    } else if (startRestartButton.classList.contains('restart')) {
        setButtonToStartMode();
    }
}


const setButtonToStartMode = () => {
    startRestartButton.classList.remove('restart');
    startRestartButton.classList.add('start');
    startRestartButtonText.textContent = 'Start Game';
}

const setButtonToRestartMode = () => {
    startRestartButton.classList.remove('start');
    startRestartButton.classList.add('restart');
    startRestartButtonText.textContent = 'Restart Game';
}

export default GameController;