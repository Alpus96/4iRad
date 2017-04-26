class Game {
    constructor(player1, player2) {
        //  A game board with 7 columns.
        this.players = [new Player(player1, 1), new Player(player2, 2)];

        this.newBoard();
    }

    newBoard () {
        this.gameBoard = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ];
    }

    addCoin(coin, column) {
        if (coin instanceof Coin) {
            let res = false;
            for (let i = 0; i < this.gameBoard[column].length; i++) {
                if (!(this.gameBoard[column][i] instanceof Coin)) {
                    this.gameBoard[column][i] = coin;
                    res = true;
                    break;
                }
            }
            return res;
        } else {
            return false;
        }
    }

    checkForWinner(player) {
        let inARow;
        let last;
        for (let column of this.gameBoard) {
            last = -2;
            inARow = 1;
            for (let i = 0; i < column.length; i++) {
                if (column[i].owner == player.id) {
                    if (last == i - 1) {
                        inARow++;
                    } else {
                        inARow = 1;
                    }
                    last = i;
                    if (inARow > 3) {
                        this.newBoard();
                        return true;
                    }
                }
            }
        }

        for (let i = 0; i < 6; i++) {
            last = -2;
            inARow = 1;
            for (let j = 0; j < this.gameBoard.length ; j++) {
                if (this.gameBoard[j][i].owner == player.id) {
                    if (last == j -1) {
                        inARow++;
                    } else {
                        inARow = 1;
                    }
                    last = j;
                    if (inARow > 3) {
                        this.newBoard();
                        return true;
                    }
                }
            }
        }

        for (let i = 0; i < this.gameBoard.length; i++) {
            for (let j = 0; j < this.gameBoard[i].length; j++) {
                if (this.gameBoard[i][j].owner == player.id) {
                    let k = 0;
                    let inARow = 0;

                    while (i + k < 7 && j + k < 6) {
                        if (this.gameBoard[i+k][j+k].owner == player.id) {
                            inARow++;
                        } else {
                            if (inARow != 4) {
                                inARow = 0;
                            } else {
                                this.newBoard();
                                return true;
                            }
                        }
                        k++;
                    }
                    k = 0;

                    while (i - k >= 0 && j + k < 6) {
                        if (this.gameBoard[i-k][j+k].owner == player.id) {
                            inARow++;
                        } else {
                            if (inARow != 4) {
                                inARow = 0;
                            } else {
                                this.newBoard();
                                return true;
                            }
                        }
                        k++;
                    }
                    k = 0;

                }
            }
        }
        return false;
    }

}

class Coin {
    constructor(owner) {
        if (owner === 1 || owner === 2) {
            this.owner = owner;
        } else {
            throw new Error('invalid owner: ' + owner);
        }
    }
}
