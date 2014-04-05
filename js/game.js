//Canvas
var canvas;
var context;
var canvasWidth;
var canvasHeight;
var document;
var window;
var location;

//Background
var images;
var stars;
var star;
var noStars;

//Player
var player;

//Game Stats
var settings;
var fps;
var lastCalledTime;

var playerBullets;
var enemyBullets;
var game;
var enemies;
var enemy;

function generateStar(old) {
	"use strict";
	star = {
		y:		Math.floor(Math.random() * canvasHeight) + 1,
		speed:	Math.floor(Math.random() * 4) + 1
	};
	if (old) {
		star.x = canvasWidth;
	} else {
		star.x = Math.floor(Math.random() * canvasWidth) + 1;
	}
	return star;
}

function addStars() {
	"use strict";
	var i;
	for (i = 0; i < noStars; i += 1) {
		stars.push(generateStar());
	}
}

function fpsCalc() {
	"use strict";
	var delta;
	//From http://goo.gl/eAK3jB
	if (!lastCalledTime) {
		lastCalledTime = new Date().getTime();
		fps = 0;
		return;
	}
	delta = (new Date().getTime() - lastCalledTime) / 1000;
	lastCalledTime = new Date().getTime();
	fps = "FPS: " + Math.floor(1 / delta);
}

//Drawing
function drawPlayerShip() {
	"use strict";
	if (game.mouse) {
		player.y = game.mouseY;
	}
	context.drawImage(images.gun0, player.x + 55, player.y - 8.5);	
	context.drawImage(images.blueShip, player.x, player.y - 49.5);
}

function drawMainMenu() {
	"use strict";
	context.fillStyle = "rgba(106, 115, 111, 0.6)";
	context.fillRect(canvasWidth * 25 / 100, canvasHeight * 10 / 100, canvasWidth * 50 / 100, canvasHeight * 80 / 100);
	context.fillStyle = "rgba(255, 255, 255, 1)";
	context.fillText("Menu", canvasWidth * 46 / 100, canvasHeight * 18 / 100);
	context.fillStyle = "rgba(116, 125, 121, 0.8)";
	//Start Game
	context.fillRect(canvasWidth * 28 / 100, canvasHeight * 20 / 100, canvasWidth * 20 / 100, canvasHeight * 25 / 100);
	//Options
	context.fillRect(canvasWidth * 52 / 100, canvasHeight * 20 / 100, canvasWidth * 20 / 100, canvasHeight * 25 / 100);
	//High Score
	context.fillRect(canvasWidth * 28 / 100, canvasHeight * 50 / 100, canvasWidth * 20 / 100, canvasHeight * 25 / 100);
	//About
	context.fillRect(canvasWidth * 52 / 100, canvasHeight * 50 / 100, canvasWidth * 20 / 100, canvasHeight * 25 / 100);
	context.fillStyle = "rgba(255, 255, 255, 1)";
	context.fillText("Start Game", canvasWidth * 30 / 100, canvasHeight * 34 / 100);
	context.fillText("Options", canvasWidth * 57 / 100, canvasHeight * 34 / 100);
	context.fillText("High Score", canvasWidth * 30 / 100, canvasHeight * 64 / 100);
	context.fillText("About", canvasWidth * 58 / 100, canvasHeight * 64 / 100);
}

function drawStars() {
	"use strict";
	var i, size, x, y;
	for (i = 0; i < stars.length; i += 1) {
		if (stars[i].x < 0) {
			stars[i] = generateStar(true);
		}
		size = stars[i].speed / 2;
		x = stars[i].x;
		y = stars[i].y;
		context.fillStyle = "rgba(255,255,255,0.5)";
		context.fillRect(x, y, size, size);
		//context.beginPath();
		//context.arc(x, y, size, 0, 2 * Math.PI, false);
		//context.fill();
		//context.closePath();
		stars[i].x -= stars[i].speed;
	}
}

function drawBullets() {
	"use strict";
	var i;
	for (i = 0; i < playerBullets.length; i += 1) {
		context.drawImage(playerBullets[i].type, playerBullets[i].x, playerBullets[i].y);
		if (playerBullets[i].x >= canvasWidth) {
			playerBullets.shift();
		} else {
			playerBullets[i].x += 40;
		}
	}
	for (i = 0; i < enemyBullets.length; i += 1) {
		context.drawImage(enemyBullets[i].type, enemyBullets[i].x, enemyBullets[i].y);
		if (enemyBullets[i].x >= canvasWidth) {
			enemyBullets.shift();
		} else {
			enemyBullets[i].x += 40;
		}
	}
}


function drawBackground() {
	"use strict";
	var mousex, mousey;
	mousex = game.mouseX;
	mousey = game.mouseY;
	//Black space
	context.fillStyle = "#000000";
	context.fillRect(0, 0, canvas.width, canvas.height);
	//Debris/Stars
	drawStars();
	//FPS indicator
	context.fillStyle = ("yellow");
	context.font = "40px Verdana";
	//TEST
	context.fillText(fps + " Mouse : " + mousex + " " + mousey, canvasWidth - 550, 40);
}

function draw() {
	"use strict";
	drawBackground();
	//Checks which screen user is on
	switch (game.screen) {
	case "main_menu":
		drawMainMenu();
		break;
	case "game":
		drawBullets();
		drawPlayerShip();
		break;
	}
	fpsCalc();
}

function animate() {
	"use strict";
	requestAnimationFrame(animate);
	draw();
}

function initPlayer() {
	"use strict";
	player = {
		x:			100,
		y:			100,
		upgrade:	0,
		hp:			100,
		level:		1
	};
}

//function initEnemies

function getScreen() {
	"use strict";
	var screen, curPage;
	curPage = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
	if (curPage === "" || curPage === "index.html") {
		screen = "main_menu";
	} else if (curPage === "about.html") {
		screen = "about";
	}
	return screen;
}

function initGame() {
	"use strict";
	game = {
		screen:		getScreen(),
		keyboard:	false,
		keyboardX:	100,
		keyboardY:	100,
		mouse:		false,
		mouseX:		100,
		mouseY:		100
	};
}

function getMousePos(evt) {
	"use strict";
	game.mouse = true;
	var rect = canvas.getBoundingClientRect();
	game.mouseX = evt.clientX - rect.left;
	game.mouseY = evt.clientY - rect.top;
}

function buttonCheck() {
	"use strict";
	var mouseX, mouseY;
	mouseX = game.mouseX;
	mouseY = game.mouseY;
	//Start
	if (mouseX >= canvasWidth * 28 / 100 && mouseX <= (canvasWidth * 28 / 100 + canvasWidth * 20 / 100) && mouseY >= canvasHeight * 20 / 100 && mouseY <= (canvasHeight * 20 / 100 + canvasHeight * 25 / 100)) {
		game.screen = "game";
	}
}

function playerShoot() {
	"use strict";
	var bullet;
	bullet = {
		x:	100,
		y: game.mouseY,
		type: images.blueLaser1
	};
	if (bullet.type === images.blueLaser1) {
		bullet.x += 60;
		bullet.y -= 5;
	}
	playerBullets.push(bullet);
}

function mouseClicked() {
	"use strict";
	switch (game.screen) {
	case "main_menu":
		buttonCheck();
		break;
	case "game":
		playerShoot();
		break;
	}
}

function preloadImages() {
	"use strict";
	var sources, src;
	images = {};
	sources = {
		//menu
		blueMetal:	"images/menu/backdrop/blueMetalSheet.jpg",
		start0:		"images/menu/button/startGame0.png",
		start1:		"images/menu/button/startGame1.png",
		options0:	"images/menu/button/options0.png",
		options1:	"images/menu/button/options1.png",
		stats0:		"images/menu/button/stats0.png",
		stats1:		"images/menu/button/stats1.png",
		about0:		"images/menu/button/about0.png",
		about1:		"images/menu/button/about1.png",
		//ships
		blueShip:	"images/character/player/playerShipBlue.png",
		//guns
		gun0:		"images/misc/gun/gun00.png",
		//playerBullets
		blueLaser1:	"images/misc/laser/laserBlue01.png"
	};
	for (src in sources) {
		images[src] = new Image();
		images[src].src = sources[src];
	}
}

function resize() {
	"use strict";
	context.canvas.width = window.innerWidth;
	context.canvas.height = window.innerHeight - 70;
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;
}

function init() {
	"use strict";
	//Canvas
	canvas = document.getElementById("gameCanvas");
	context = canvas.getContext("2d");
	context.canvas.width = window.innerWidth;
	context.canvas.height = window.innerHeight - 70;
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;
	//Background
	preloadImages();
	stars = [];
	star  = {};
	noStars = 500;
	addStars();
	//Game settings	
	initGame();
	initPlayer();
	enemies  = [];
	playerBullets = [];
	enemyBullets = [];
	//Event listeners
	canvas.addEventListener("mousemove", getMousePos, false);
	canvas.addEventListener("click", mouseClicked, false);
	window.addEventListener("resize", resize, false);
	//Starts game
	animate();
}