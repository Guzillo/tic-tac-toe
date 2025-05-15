import {Player} from "./Player.js";
import Gameboard from "./Gameboard.js";
import GameStatus from "./GameStatus.js";

const GameController = (function () {
    let p1;
    let p2;

    const initializePlayers = (p1Name, p2Name) => {
        p1 = Player(1, 'O', p1Name);
        p2 = Player(2, 'X', p2Name);
        currentPlayerTour = p1;
    }

    let currentPlayerTour = undefined;
    let currentGameStatus = GameStatus.IN_PROGRESS;
    let gameboard = null;
    let hasGameStarted = false;

    const getHasGameStarted = () => hasGameStarted;
    const switchHasGameStarted = () => hasGameStarted ? !hasGameStarted : hasGameStarted;

    const changePlayerTour = () => {
        currentPlayerTour = currentPlayerTour === p1 ? p2 : p1;
    }

    const startGame = (p1Name, p2Name) => {
        switchHasGameStarted();
        try {
            if (!gameboard) {
                gameboard = Gameboard();
            }
            if (!p1 && !p2) {
                initializePlayers(p1Name, p2Name);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const playRound = (row, col) => {
        if (currentGameStatus !== GameStatus.IN_PROGRESS) {
            throw new Error("Game is already done");
        }
        try {
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
        currentPlayerTour = p1;
    }

    const getCurrentPlayerTour = () => currentPlayerTour;

    return {
        changePlayerTour,
        playRound,
        evaluateGameStatus,
        updateGameStatus,
        getCurrentGameStatus,
        getCurrentPlayerTour,
        printBoard,
        getBoard,
        getMarkedBoard,
        resetGame,
        startGame,
        getHasGameStarted,
        switchHasGameStarted,
    };
})();

export default GameController;
