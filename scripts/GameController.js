import {Player} from "./Player.js";
import Gameboard from "./Gameboard.js";
import gameboard from "./Gameboard.js";

const GameController = (function () {
    const GameStatus = {
        IN_PROGRESS: 'IN_PROGRESS',
        WIN: 'WIN',
        TIE: 'TIE',
    }

    const p1 = new Player(1, 'O');
    const p2 = new Player(2, 'X');
    let currentPlayerTour = p1;
    let currentGameStatus = GameStatus.IN_PROGRESS;
    let gameboard = null;

    const changePlayerTour = () => {
        currentPlayerTour = currentPlayerTour === p1 ? p2 : p1;
    }

    const playRound = (row, col) => {
        if (currentGameStatus !== GameStatus.IN_PROGRESS) {
            throw new Error("Game is already done");
        }
        try {
            if (!gameboard) {
                gameboard = Gameboard();
            }
            gameboard.setMark(row, col, currentPlayerTour);
            changePlayerTour();
            const gameStatus = evaluateGameStatus();
            updateGameStatus(gameStatus);
        } catch (error) {
            console.log(error.message)
        }
    }

    const evaluateGameStatus = () => {
        const boardArrays = gameboard.getBoard();
        const rows = boardArrays.length;
        const cols = boardArrays[0].length;
        for(let i = 0; i < rows; i++) {
            if (boardArrays[i][0] && boardArrays[i][0] === boardArrays[i][1] && boardArrays[i][1] === boardArrays[i][2]) {
                return {
                    gameStatus: GameStatus.WIN,
                    player: boardArrays[i][0],
                }
            }
        }
        for(let i = 0; i < cols; i++) {
            if (boardArrays[0][i] && boardArrays[0][i] === boardArrays[1][i] && boardArrays[1][i] === boardArrays[2][i]) {
                return {
                    gameStatus: GameStatus.WIN,
                    player: boardArrays[0][i],
                }
            }
        }
        if (boardArrays[0][0] && boardArrays[0][0] === boardArrays[1][1] && boardArrays[1][1] === boardArrays[2][2]) {
            return {
                gameStatus: GameStatus.WIN,
                player: boardArrays[0][0]
            }
        } else if( boardArrays[2][0] && boardArrays[2][0] === boardArrays[1][1] && boardArrays[1][1] === boardArrays[0][2]) {
            return {
                gameStatus: GameStatus.WIN,
                player: boardArrays[2][0],
            }
        }
        let isAnyCellEmpty= false;
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < cols; j++) {
                if (!boardArrays[i][j]) {
                    isAnyCellEmpty = true;
                }
            }
        }
        if (!isAnyCellEmpty) {
            return {
                gameStatus: GameStatus.TIE,
            }
        }
        return {
            gameStatus: GameStatus.IN_PROGRESS,
        }
    }

    const updateGameStatus = (gameStatusObj) => {
        currentGameStatus = gameStatusObj.gameStatus;
    }

    const getCurrentGameStatus = () => currentGameStatus;

    const printBoard = () => {gameboard ? gameboard.printBoard() : undefined}

    const getBoard = () => gameboard ? gameboard.getBoard() : '';

    const getMarkedBoard = () => gameboard ? gameboard.getMarkedBoard() : '';

    const resetGame = () => {
        gameboard = null;
        currentGameStatus = GameStatus.IN_PROGRESS;
    }

    return {
        changePlayerTour,
        playRound,
        evaluateGameStatus,
        updateGameStatus,
        getCurrentGameStatus,
        printBoard,
        getBoard,
        getMarkedBoard,
        resetGame,
    };
})();

export default GameController;
