import GameController from "./GameController.js";
import Gameboard from "./Gameboard.js";
import gameboard from "./Gameboard.js";

let gameController = GameController;
const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
    cell.addEventListener('click', (event) => clickHandlerBoard(event));})

const clickHandlerBoard = (event) => {
    event.stopPropagation();
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;
    gameController.playRound(row, col);
    updateScreen();
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

export default GameController;