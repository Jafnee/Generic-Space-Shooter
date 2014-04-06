define(["canvas"], function (canvas, config) {
	function init() {
	"use strict";
	//Canvas
	
	//Background
	preloadImages();
	stars = [];
	star  = {};
	noStars = 1000;
	addStars();
	//Game settings	
	initGame();
	initPlayer();
	enemies  = [];
	enemy = [];
	initEnemy();
	playerBullets = [];
	enemyBullets = [];
	//Event listeners
	Canvas.canvas.addEventListener("mousemove", getMousePos, false);
	Canvas.canvas.addEventListener("click", mouseClicked, false);
	window.addEventListener("resize", Canvas.resize, false);
	//Starts game
	animate();
}
)};