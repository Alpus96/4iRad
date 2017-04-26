class Game {
    constructor(player1, player2) {
        //  A game board with 7 columns.
        this.gameBoard = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ];
        console.log(this.gameBoard);
        this.players = [new Player(player1, 1), new Player(player2, 2)]
    }

    addCoin(coin, column) {
        console.log(coin.owner, column);
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
            inARow = 1;
            last = 0;
            for (let i = 0; i < column.length; i++) {
                if (column[i].owner === player.id) {
                    if (last === i - 1) {
                        inARow++;
                    } else {
                        inARow = 1;
                    }
                    last = i;
                    this.inARowCheck(player, inARow);
                }
            }
        }

        for (let i = 0; i < 6; i++) {
            last = 0;
            for (let j = 0; j < this.gameBoard.length ; j++) {
                if (this.gameBoard[i][j] instanceof Coin && this.gameBoard[j][i].owner === player.id) {
                    if (last = j -1) {
                        inARow++;
                    } else {
                        inARow = 1;
                    }
                    last = j;
                    this.inARowCheck(player, inARow);
                }
            }
        }

        for (let i = 0; i < this.gameBoard.length; i++) {
            for (let j = 0; j < this.gameBoard[i].length; j++) {
                if (this.gameBoard[i][j].owner === player.id) {
                    let k = 0;
                    let inARow = 1;
                    while (this.gameBoard[i-k][j-k] instanceof Coin && this.gameBoard[i-k][j-k].owner === player.id) {
                        inARow++;
                        k++;
                    }
                    k = 0;
                    while (i+k < 7 && j + k < 6 && this.gameBoard[i+k][j+k] instanceof Coin && this.gameBoard[i+k][j+k].owner === player.id) {
                        inARow++;
                        k++;
                    }
                    k = 0;
                    this.inARowCheck(player, inARow);
                    inARow = 1;
                    while (this.gameBoard[i+k][j-k] instanceof Coin && this.gameBoard[i+k][j-k].owner === player.id) {
                        inARow++;
                        k++;
                    }
                    k = 0;
                    while (this.gameBoard[i-k][j+k] instanceof Coin && this.gameBoard[i-k][j+k].owner === player.id) {
                        inARow++;
                        k++;
                    }
                    k = 0;
                    const ret = this.inARowCheck(player, inARow);
                    inARow = 1;
                    return ret;
                }
            }
        }
    }

    inARowCheck (player, inARow) {
        if (inARow > 3) {
            return true;
            console.log('Player ' + player.id + ' won');
        }
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

$(document).ready(function () {
    $('#field').on('click', function (event) {
        var posX = $('#field').offset().top;
        column = ($('#field').width()/2) / (event.pageX - posX);
        console.log(($('#field').width()/2), '/', (event.pageX - posX));
        console.log(column);
    });
});
