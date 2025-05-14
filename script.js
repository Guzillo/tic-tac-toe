function Player(id, mark) {
    const getId = () => id;
    const getMark = () => mark;
    return {
        getId, getMark
    }
}


const Gameboard = (function () {
    const board = [];
    const cols = 3;
    const rows = 3;
    //initialize 2d array that represents tic-tac-toe game board
    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < cols; j++) {
            board[i][j] = undefined;
        }
    }

    const setMark = (row, column, player) => {
        if (row > rows || row < 0 || column > cols  || column < 0) {
            throw new Error("Attempt to set mark in the col/row that is out of the board");
        }else if(board[row][column]) {
            throw new Error("Position is already marked");
        }

        board[row - 1][column -1] = player;
    }

    const printBoard = () => {
        for(let i = 0; i < rows; i++) {
            const tmpArr = [];
            for(let j = 0; j < cols; j++) {
                const mark = board[i][j] ? `[${board[i][j].getMark()}]` : '[ ]';
                tmpArr.push(mark);
            }
            console.log(tmpArr)
        }
    }
    return {
        setMark,
        printBoard
    }
})();
