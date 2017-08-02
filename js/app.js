// Application Code

var Enemy = function(forwardSprite, reverseSprite,x, y, speed, direction) {
	this.x = x;
	this.y = y;
	this.speed = (Math.floor(Math.random()));
	this.direction = -1;
	this.sprite = forwardSprite;
	this.forward = forwardSprite
	this.reverse = reverseSprite
};
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.move = function(dt) {
	if (this.direction === "left") {
		this.x = this.x - (dt * this.speed);
	} else if (this.direction === "right") {
		this.x = this.x + (dt * this.speed);
	}
};
Enemy.prototype.update = function(dt) {
	this.x = this.x + (this.speed * dt * this.direction);
	this.randomSpeed()
};
Enemy.prototype.randomSpeed = function() {
	this.speed = (Math.floor(Math.random() * -230));
};
var allEnemies = [
	new Enemy("images/RightEnemyBug.png", "images/LeftEnemyBug.png", 100, 260),
	new Enemy("images/enemy-bug-blue.png", "images/enemy-bug-blue-reversed.png", 180, 578),
	new Enemy("images/enemy-bug-purple.png", "images/enemy-bug-purple-reversed.png", 400, 500),
	new Enemy("images/enemy-bug-green.png", "images/enemy-bug-green-reversed.png", 623, 735)
];
var Player = function(x, y) {
	this.x = 400;
	this.y = 800;
	this.sprite = 'images/Character Boy.png';
	this.previousLocation = {
		x: this.x,
		y: this.y
	};
};
Player.prototype.update = function() {};
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var player = new Player();
Player.prototype.handleInput = function(direction) {
	this.previousLocation.x = this.x;
	this.previousLocation.y = this.y;
	if (direction === 'left' && this.x > 100) {
		this.x -= 100;
		this.sprite = 'images/char-boy-left.png';
	}
	if (direction === 'up' && this.y > 100) {
		this.y -= 80;
		this.sprite = 'images/char-boy-up.png';
	}
	if (direction === 'right' && this.x > -100 && this.x < 800) {
		this.x += 100;
		this.sprite = 'images/char-boy-right.png';
	}
	if (direction === 'down' && this.y > 0 && this.y < 750) {
		this.y += 80;
		this.sprite = 'images/Character Boy.png';
	}
};

document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};
	player.handleInput(allowedKeys[e.keyCode]);
});