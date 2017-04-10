class Game {
    constructor(player1, player2) {
        //  A game board with 7 columns.
        this.gameBoard = [ [], [], [], [], [], [], [] ];
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
            for (column in this.gameBoard) {
                let inARow = 0;
                let last = 0;
                for (let i = 0; i < column.length; i++) {
                    if (coin.owner === player.name && last === i - 1) {
                        inARow++;
                        last = i;
                    }
                }
            }

            for (rows in this.gameBoard[0]) {

            }
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
