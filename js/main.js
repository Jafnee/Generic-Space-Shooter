define(["canvas, images"], function (canvas, images) {
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
	
	//Starts game
	animate();
)};