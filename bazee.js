// This file contains the code for Pong (the game). 
// February 2014

// The requestAnimationFrame is used instead of just setTimeout for optimization purposes. For example, 
// calls won't be sent until a browser tab is active
var animate = window.requestAnimationFrame ||
	function(callback) {window.setTimeout(callback, 1000/60) };
	
	
// getting the 2D context of the canvas element
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// creating the ball, player1, and player2 objects
var ball = new Ball(400, 300);
var player1 = new Player1();
var player2 = new Player2();

// Initializing the variables
var player1_points = 0;
var player2_points = 0;

var keysPressed = {};

// starting the animation when the page loads
window.onload = function() {
	Score();
	animate(move);
};

// The move function will do the following:
//  - updating three objects: the ball, player1's paddle, and player2's paddle
//  - rendering the above objects
//  - calling the move object again
var move = function() {
	update();
	render();
	animate(move);
};

// setting the background and rendering the ball and the players
var render = function() {
	context.fillStyle = "#FFFFFF";
	context.fillRect(0, 0, canvas.width, canvas.height);
	player1.render();
	player2.render();
	ball.render();
}

// the update function
var update = function() {
	ball.update(player1.paddle, player2.paddle);
	player1.update();
	player2.update();
};

// Creating the Ball object
// the x,y coordinates represent the center of the circle and the radius is 8
function Ball(x, y) {
	this.x = x;
	this.y = y;
	this.x_speed = 5;
	this.y_speed = 0;
	this.radius = 8;
}

Ball.prototype.render = function() {
	context.beginPath();
	context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
	context.closePath();
	context.fillStyle = "#FF0000";
	context.fill();
};

// Creating the Paddle object
function Paddle(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.x_speed = 0;
	this.y_speed = 0;
}

Paddle.prototype.render = function() {
	context.fillStyle = "#000000";
	context.beginPath();
	context.fillRect(this.x, this.y, this.width, this.height);
	context.closePath();
};

// creating the paddle object for player1 and rendering it
function Player1() {
	this.paddle = new Paddle(0, 250, 15, 100);
}

Player1.prototype.render = function() {
	this.paddle.render();
};

// crating the paddle object for player2 and rendering it
function Player2() {
	this.paddle = new Paddle(785, 250, 15, 100);
}

Player2.prototype.render = function() {
  this.paddle.render();
};

// updating the score
function Score() {
	var p = document.getElementById('score');
	var scoreText = p.innerHTML = "Score: " + player1_points + "-" + player2_points;
}


Ball.prototype.update = function(paddle1, paddle2) {
	this.x += this.x_speed;
	this.y += this.y_speed;
	var x_right = this.x + this.radius;
	var y_right = this.y + this.radius;
	var x_left = this.x - this.radius;
	var y_left = this.y - this.radius;

	if (this.y - this.radius < 0) { 
		this.y = this.radius;
		this.y_speed = -this.y_speed;
	} else if (this.y + this.radius > canvas.height) { 
		this.y = canvas.height - this.radius;
		this.y_speed = -this.y_speed;
	}
	
	
	if (x_right > 400) {
		if (x_right > paddle2.x && y_right < (paddle2.y + paddle2.height) && y_left > paddle2.y) {
			this.x_speed = -2;
			this.y_speed += (paddle2.y_speed / 3);
			this.x += this.x_speed;
		}
	} else {
	    if(x_left < (paddle1.x + paddle1.width) && y_right < (paddle1.y + paddle1.height) && y_left > paddle1.y) {
			this.x_speed = 2;
			this.y_speed += (paddle1.y_speed / 3);
			this.x += this.x_speed;
		}
	}
	
	// this part implements the scoring
	if (this.x < 0 || this.x > canvas.width) {
		if (this.x < 0) {
			player2_points++;
			this.x_speed = 5;
		} else if (this.x > canvas.width) {
			player1_points++;
			this.x_speed = -5;
		}
		this.x = canvas.width / 2;
		this.y = canvas.height / 2;
		this.y_speed = (Math.random() - 0.5) * 10;
		ResetGame();
		Score();
	}
};

// This function resets the game if one of the players scores 5 points
function ResetGame() {

	if (player1_points == 5 || player2_points == 5) {
		player1_points = 0;
		player2_points = 0;
	}

}

// adding controls

window.addEventListener("keydown", function(event) {
	keysPressed[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
	delete keysPressed[event.keyCode];
});

Player1.prototype.update = function() {
	
	for (var key in keysPressed) {	
		if (Number(key) == 38 ) {
			this.paddle.move(0, -5);
		} else if (Number(key) == 40) {
			this.paddle.move(0, 5);
		} else {
			this.paddle.move(0, 0);
		}
	}
};

Player2.prototype.update = function() {
	
	for (var key in keysPressed) {	
		if (Number(key) == 87 ) {
			this.paddle.move(0, -5);
		} else if (Number(key) == 83) {
			this.paddle.move(0, 5);
		} else {
			this.paddle.move(0, 0);
		}
	}
};

Paddle.prototype.move = function(x, y) {

	this.x += x;
	this.y += y;
	this.x_speed = x;
	this.y_speed = y;
	
	if (this.y < 0) {
		this.y = 0;
		this.y_speed = 0;
	} else if (this.y + this.height > canvas.height) {
		this.y = canvas.height - this.height;
		this.y_speed = 0;
	}
};
