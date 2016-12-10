//Initialize global variables
//Possible x and y pixel values
var POSSIBLE_Y = [55, 140, 225, 310];
var POSSIBLE_X = [0, 100, 200, 300, 400];
//Specifies lives left before game over
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	this.sprite = 'images/char-boy.png';
	//variables for player handling
	this.x = 200;
	this.y = 395;
	//Specifies lives left before game over
	this.lives = 10;
	//Specifies inital score
	this.score = 0;
};
//reset function for when player dies or gets key
Player.prototype.reset = function() {
		this.x = 200;
		this.y = 395;
		this.lives = this.lives - 1;
		var lifeSpanElement = document.getElementById("lives");
		lifeSpanElement.innerHTML = this.lives;
		if (this.lives === 0) {
			document.write("<h1>Game Over</h1><h3>Refresh to try again</h3>");
		}
	}
	//linked to player movement issue area
Player.prototype.update = function(dt) {
	this.y = this.y;
	this.x = this.x;
	if (this.x === key.x && this.y === key.y) {
		key.foundKey();
	}
}
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(key) {
		switch (key) {
			case 'up':
				//checks if player is off the map
				if (this.y === 55) {
					reset();
				} else {
					this.y -= 85;
				}
				break;
			case 'down':
				if (this.y === 395) {
					reset();
				} else {
					this.y += 85;
				}
				break;
			case 'left':
				if (this.x === 0) {
					reset();
				} else {
					this.x -= 100;
				}
				break;
			case 'right':
				if (this.x === 400) {
					reset();
				} else {
					this.x += 100;
				}
				break;
		}
	}
	// Enemies our player must avoid
var Enemy = function() {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started
	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug-blue.png';
	this.x = -100;
	this.y = POSSIBLE_Y[Math.floor(Math.random() * POSSIBLE_Y.length)];
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
		// You should multiply any movemen t by the dt parameter
		// which will ensure the game runs at the same speed for
		// all computers.
		this.x = this.x + (dt * 600 * Math.random());
		//collision engine
		if (this.x - player.x < 50 && this.x - player.x > 0 && this.y === player.y) {
			player.reset()
		};
		//resets enemys at start after reaching end of board
		if (this.x > 505) {
			this.x = -100
			this.y = POSSIBLE_Y[Math.floor(Math.random() * POSSIBLE_Y.length)];
		}
	}
	// Draw the enemy on tPOSSIBLE_Yhe screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var Key = function() {
	this.sprite = 'images/Key.png';
	this.x = POSSIBLE_X[Math.floor(Math.random() * POSSIBLE_X.length)];
	this.y = POSSIBLE_Y[Math.floor(Math.random() * POSSIBLE_Y.length)];
};
Key.prototype.render = function() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	//interesting linked area
Key.prototype.foundKey = function() {
		player.x = 200;
		player.y = 395;
		player.score = player.score + 1;
		this.x = POSSIBLE_X[Math.floor(Math.random() * POSSIBLE_X.length)];
		this.y = POSSIBLE_Y[Math.floor(Math.random() * POSSIBLE_Y.length)];
		var numKeys = document.getElementById("score");
		numKeys.innerHTML = player.score;
		if (player.score === 10) {
			document.write("<h1>CONGRATULATIONS YOU FOUND THE KEY!</h1>");
		}
	}
	// Now instantiate your objects.
	// Place all enemy objects in an array called allEnemies
	// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];
var player = new Player();
var key = new Key();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};
	player.handleInput(allowedKeys[e.keyCode]);
});
