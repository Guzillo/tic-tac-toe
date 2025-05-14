import {Player} from "./Player";
import Gameboard from "./Gameboard";

function GameController() {

    const GameStatus = {
        IN_PROGRESS: 'IN_PROGRESS',
        WIN: 'WIN',
        TIE: 'TIE',
    }

    const p1 = new Player(1, 'O');
    const p2 = new Player(2, 'X');
    let currentPlayerTour = p1;
    let currentGameStatus = GameStatus.IN_PROGRESS;

    const changePlayerTour = () => {
        currentPlayerTour = currentPlayerTour === p1 ? p2 : p1;
    }

    const playRound = (row, col) => {
        if (currentGameStatus !== GameStatus.IN_PROGRESS) {
            throw new Error("Game is already done");
        }
        try {
            Gameboard.setMark(row, col, currentPlayerTour);
            changePlayerTour();
            const gameStatus = evaluateGameStatus();
            updateGameStatus(gameStatus);
        } catch (error) {
            console.log(error.message)
        }
    }


    const evaluateGameStatus = () => {
         const board = Gameboard.getBoard();
         const rows = board.length;
         const cols = board[0].length;
         //check if someone won in the row lines
         for(let i = 0; i < rows; i++) {
             if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                return {
                    gameStatus: GameStatus.WIN,
                    player: board[i][0],
                }
             }
         }
         //check if someone won in cols line
        for(let i = 0; i < cols; i++) {
            if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                return {
                    gameStatus: GameStatus.WIN,
                    player: board[0][i],
                }
            }
        }

        //check if someone won in diagonals
        if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return {
                gameStatus: GameStatus.WIN,
                player: board[0][0]
            }
        } else if( board[2][0] && board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
            return {
                gameStatus: GameStatus.WIN,
                player: board[2][0],
            }
        }

        // if none of the above happened, check for a tie
        let isAnyCellEmpty= false;
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < cols; j++) {
                if (!board[i][j]) {
                    isAnyCellEmpty = true;
                }
            }
        }
        if (!isAnyCellEmpty) {
            return {
                gameStatus: GameStatus.TIE,
            }
        }

        //if it's not a win or tie it's still in_progress
        return {
            gameStatus: GameStatus.IN_PROGRESS,
        }
    }

    const updateGameStatus = (gameStatusObj) => {
        currentGameStatus = gameStatusObj.gameStatus;
    }

    return {
        changePlayerTour,
        playRound,
        evaluateGameStatus,
        updateGameStatus,
    }
}

export default GameController;