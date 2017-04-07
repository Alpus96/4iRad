$(document).ready(function () {
    $('#startForm').on('submit', function(e) {
        e.preventDefault();
        let data = $("#startForm :input").serializeArray();
        console.log(data);

        let player1 = data[0];

        let player2 = data[1];
        if (data[2]) {
            player2.ai = true;
        }

        player1.name = player1.value;
        delete player1.value;

        player2.name = player2.value;
        delete player2.value;

        if (!player2.ai) {
            $('#start').hide();
            $('#game').show();
            new Game($('canvas#4irad'), player1, player2);
        } else {
            console.log('There is no AI.');
        }
    });
});

class Game {
    constructor(canvas, player1, player2) {
        this.players = {new Player(player1), new Player(player2)};
    }
}

class Player {
    constructor(player) {
        this.player = player;
    }
}



/*
const canvas = document.getElementById("pong");
const pong = new Pong(canvas);

canvas.addEventListener("mousemove", event =>
{
	const scale = event.offsetY / event.target.getBoundingClientRect().height;
	pong.players[0].pos.y = canvas.height * scale;
});

canvas.addEventListener("click", event =>
{
	pong.start();
});

class Pong
{
	constructor(canvas)
	{
		this._canvas = canvas;

		this.browserSize = {
		  width: window.innerWidth || document.body.clientWidth,
		  height: window.innerHeight || document.body.clientHeight
		}
		this._canvas.width = this.browserSize.width * .6;
		this._canvas.height = (this._canvas.width * .6);

		this._context = this._canvas.getContext("2d");

		this.ball = new Ball;

		this.players = [
			new Player,
			new Ai(this.ball, this._canvas)
		];

		this.players[0].pos.x = 40;
		this.players[1].pos.x = this._canvas.width - 40;

		for (let player in this.players)
		{
			this.players[player].pos.y = (Number(this._canvas.height) / 2)
		}

		this.reset();

		let lastTime;

		const callback= (millis) => {
			if (lastTime)
			{
				this.update((millis - lastTime) / 1000);
			}
			lastTime = millis;
			requestAnimationFrame(callback);
		};

		if(!this.GO)
		{
			callback();
		}

		this.GO = false;

		this.CHAR_PIXEL = 10;
		this.CHARS = [
			"111101101101111",
			"110010010010111",
			"111001111100111",
			"111001111001111",
			"101101111001001",
			"111100111001111",
			"111001111101111",
			"111001011001001",
			"111101111101111",
			"111101111001001"
		].map(str => {
			const canvas = document.createElement("canvas");
			canvas.height = this.CHAR_PIXEL * 5;
			canvas.width = this.CHAR_PIXEL * 3;

			const context = canvas.getContext("2d");
			context.fillStyle = "#EEE";

			for (let fill in str.split(""))
			{
				if (str[fill] === "1")
				{
					context.fillRect((fill % 3) * this.CHAR_PIXEL, (fill / 3 | 0) * this.CHAR_PIXEL, this.CHAR_PIXEL, this.CHAR_PIXEL);
				}
			}

			return canvas;
		});
	}

	start()
	{
		if (this.ball.vel.x === 0 && this.ball.vel.y === 0)
		{
			this.ball.vel.x = 150 * (Math.random() > .5 ? 1 : -1);
			this.ball.vel.y = 150 * (Math.random() * 2 - 1);
			this.ball.vel.len = 150;
		}
		if (this.GO)
		{
			for (let player in this.players)
			{
				this.players[player].score = 0;
			}

			this.GO = false;
		}
	}

	reset()
	{
		this.ball.pos.x = this._canvas.width / 2;
		this.ball.pos.y = this._canvas.height / 2;
		this.ball.vel.x = 0;
		this.ball.vel.y = 0;

		this.gameOver();
	}

	gameOver()
	{
		for (let player in this.players)
		{
			if (this.players[player].score > 4)
			{
				this.GO = true;
			}
		}
	}

	collide(player, ball)
	{
		if (player.left < ball.right && player.right > ball.left && player.top < ball.bottom && player.bottom > ball.top)
		{
			const len = ball.vel.len;
			ball.vel.x *= -1;
			ball.vel.y += 300 * (Math.random() - .5);
			ball.vel.len = len * 1.05;
		}
	}

	bounds(player)
	{
		if (player.bottom > this._canvas.height)
		{
			player.pos.y = this._canvas.height - player.size.y / 2;
		}
		else if (player.top < 0)
		{
			player.pos.y =  player.size.y / 2;
		}
	}

	cpu(dt, player)
	{
		if(this.ball.pos.y > player.pos.y)
		{
			if(this.ball.pos.y < player.bottom - 35)
			{
				player.vel.y = this.ball.vel.y;
			}
			else
			{
				player.vel.y = 350;
			}
		}
		else if(this.ball.pos.y < player.pos.y)
		{
			if(this.ball.pos.y > player.top + 35)
			{
				player.vel.y = this.ball.vel.y;
			}
			else
			{
				player.vel.y = -350;
			}
		}
		else
		{
			player.vel.y = 0;
		}

		if (player.vel.y > 350)
		{
			player.vel.y = 350;
		}
		else if (player.vel.y < -350)
		{
			player.vel.y = -350;
		}

		if (this.ball.vel.x > 0)
		{
			player.pos.y += player.vel.y * dt;
		}
		else
		{
			player.pos.y += player.vel.y * dt / 2;
		}

		return player;
	}

	draw()
	{
		this._context.fillStyle = "#111";
		this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

		this.drawRect(this.ball);

		for (let player in this.players)
		{
			this.drawRect(this.players[player]);
		}

		this.drawScore();

		if (this.GO)
		{
			this.drawWinner();
		}
	}

	drawRect(rect)
	{
		this._context.fillStyle = "#EEE";

		this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
	}

	drawScore()
	{
		const align = this._canvas.width / 3;
		const charW = this.CHAR_PIXEL * 4;

		this.players.forEach((player, i) =>
		{
			const chars = player.score.toString().split("");
			const offset = align * (i + 1) - (charW * chars.length / 2) + this.CHAR_PIXEL / 2;

			for (let char in chars)
			{
				this._context.drawImage(this.CHARS[chars[char] | 0], offset + char * charW, 10);
			}
		});
	}

	drawWinner()
	{
		this.players.forEach((player, i) => {
			if (player.score > 4)
			{
				this.txt = "Player " + (i + 1) + " wins!";
				this._context.font = "30px Arial";
				this._context.textAlign = "center";
				this._context.fillText(this.txt, this._canvas.width / 2, this._canvas.height / 2 - 20);
			}
		});
	}

	update(dt)
	{
		this.ball.update(dt);

		if (this.ball.left < 0 || this.ball.right > this._canvas.width)
		{
			let playerId = this.ball.vel.x < 0 | 0;
			this.players[playerId].score++;
			this.reset();
		}
		if (this.ball.top < 0 || this.ball.bottom > this._canvas.height)
		{
			this.ball.vel.y *= -1;
		}

		this.cpu(dt, this.players[1]);

		for (let player in this.players)
		{
			this.collide(this.players[player], this.ball);
			this.bounds(this.players[player]);
		}

		this.draw();
	}
}

const canvas = document.getElementById("pong");
const pong = new Pong(canvas);

canvas.addEventListener("mousemove", event =>
{
	const scale = event.offsetY / event.target.getBoundingClientRect().height;
	pong.players[0].pos.y = canvas.height * scale;
});

canvas.addEventListener("click", event =>
{
	pong.start();
});
*/
