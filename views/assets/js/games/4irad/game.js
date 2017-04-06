//  Requires here

class Game {
    constructor(canvas, player1, player2) {
        this.players = {new Player(player1), new Player(player2)};
    }

}

module.exports = Game;
