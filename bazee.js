// This file contains the code for Pong (the game). 
// February 2014

// Initializing the variables
var player1_points = 0;
var player2_points = 0;

// The requestAnimationFrame is used instead of just setTimeout for optimization purposes. For example, 
// calls won't be sent until a browser tab is active
var animate = window.requestAnimationFrame ||
	function(callback) {window.setTimeout(callback, 1000/60) };
	
	
// getting the 2D context of the canvas element
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

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
	this.paddle = new Paddle(0, 250, 15, 80);
}

Player1.prototype.render = function() {
	this.paddle.render();
};

// crating the paddle object for player2 and rendering it
function Player2() {
	this.paddle = new Paddle(785, 250, 15, 80);
}

Player2.prototype.render = function() {
  this.paddle.render();
};


// updating the score
function Score() {
	var p = document.getElementById('score');
	var scoreText = document.createTextNode("Score: " + player1_points + "-" + player2_points);
	p.appendChild(scoreText);
	document.body.appendChild(p);
}
	
// creating the ball, player1, and player2 objects
var ball = new Ball(400, 300);
var player1 = new Player1();
var player2 = new Player2();

Ball.prototype.update = function(paddle1, paddle2) {
	this.x += this.x_speed;
	this.y += this.y_speed;
	var top_x = this.x - 8;
	var top_y = this.y - 8;

	if(this.x - 8 < 8) { 
		this.x = 16;
		this.x_speed = -this.x_speed;
	} else if(this.x + 8 > 792) { 
		this.x = 784;
		this.x_speed = -this.x_speed;
	}
	
	
};
