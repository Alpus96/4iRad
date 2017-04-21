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
        this.players = [new Players(player1, 1), new Player(player2, 2)]
    }

    addCoin(coin, column) {
        if (!this.gameBoard[column].length > 6 && coin instanceof Coin) {
            //  If the column is not ful place a Coin in it and return tue.
            this.gameBoard[column].push(coin);
            return true;
        } else {
            //  If the column was ful or the coin was not a Coin return false.
            return false;
        }
    }

    checkForWinner(players) {
        for (player of players) {
            let inARow;
            let last;
            for (column of this.gameBoard) {
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
                    }
                }
                inARowCheck(player, inARow);
            }

<<<<<<< 3c6a4522dbc603ca0993ad1ab09ce3ffd40748fb
            for (rows in this.gameBoard[0]) {

=======
            for (let i = 0; i < this.gameBoard.length; i++) {
                last = 0;
                for (let j = 0; i < this.gameBoard[j].length; j++) {
                    if(this.gameBoard[j][i].owner === player.id) {
                        if (last = j -1) {
                            inARow++;
                        } else {
                            inARow = 1;
                        }
                        last = j;
                    }
                }
                inARowCheck(player, inARow);
>>>>>>> Wrote check for winner function
            }

            for (let i = 0; i < this.gameBoard.length; i++) {
                for (let j = 0; i < this.gameBoard[i].length; j++) {
                    if (this.gameBoard[i][j].owner === player.id) {
                        let k = 0;
                        let inARow = 1;
                        while (this.gameBoard[i-k][j-k].owner === player.id) {
                            inARow++;
                        }
                        while (this.gameBoard[i+k][j+k].owner === player.id) {
                            inARow++;
                        }
                        inARowCheck(player, inARow);
                    }
                }
            }
        }
    }

    inARowCheck (player, inARow) {
        if (inARow > 3) {
            player.wins();
        }
    }

}

class Coin {
    constructor(owner) {
        this.owner = owner; //  Must be a number of 1 or 2.
        //this.color = owner == 1 ? 'yellow' || 'red';
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
