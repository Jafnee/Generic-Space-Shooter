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

function incrementTimer() {
	"use strict";
	game.timer += 1;
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
	var part1, part2, start, options, stats, about, mouseX, mouseY;
	part1 = canvasWidth  / 4;
	part2 = canvasHeight / 4;
	mouseX = game.mouseX;
	mouseY = game.mouseY;
	//Button animation
	if (mouseX >= part1 * 1.2 && mouseX <= part1 * 1.2 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
		start = images.start1;
	} else {
		start = images.start0;
	}
	if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
		options = images.options1;
	} else {
		options = images.options0;
	}
	if (mouseX >= part1 * 1.2 && mouseX <= part1 * 1.2 + part1 * 0.75 && mouseY >= part2 * 2 && mouseY <= part2 * 2 + part2 * 0.7) {
		stats = images.stats1;
	} else {
		stats = images.stats0;
	}
	if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 * 2 && mouseY <= part2 * 2 + part2 * 0.7) {
		about = images.about1;
	} else {
		about = images.about0;
	}
	//drawing button
	context.drawImage(images.blueMetal, part1, 0, part1 * 2, part2 * 3.5);
	context.drawImage(images.bigLogo, part1 * 1.1, part2 * 0.1, part1 * 1.8, part2);
	context.drawImage(start, part1 * 1.2, part2, part1 * 0.75, part2 * 0.7);
	context.drawImage(options, part1 * 2.1, part2, part1 * 0.75, part2 * 0.7);
	context.drawImage(stats, part1 * 1.2, part2 * 2, part1 * 0.75, part2 * 0.7);
	context.drawImage(about, part1 * 2.1, part2 * 2, part1 * 0.75, part2 * 0.7);
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
		upgrade:	1,
		guns:		1,
		hp:			100,
		lives:		3,
		level:		1
	};
}

function initEnemy() {
	"use strict";
	var enemyShip;
	//enemy[0]
	enemyShip = {
		name:	"scout",
		ship:	images.scout,
		hp:		10,
		damage:	0,
		speed:	4
	};
	enemy.push(enemyShip);
	//enemy[1]
	enemyShip = {
		name:	"fighter",
		ship:	images.fighter,
		hp:		20,
		damage:	10,
		speed:	3
	};
	enemy.push(enemyShip);
	//enemy[2]
	enemyShip = {
		name:	"interceptor",
		ship:	images.interceptor,
		hp:		20,
		damage:	5,
		speed:	3
	};
	enemy.push(enemyShip);
	//enemy[3]
	enemyShip = {
		name:	"tank",
		ship:	images.tank,
		hp:		100,
		damage:	5,
		speed:	2
	};
	enemy.push(enemyShip);
	//enemy[4]
	enemyShip = {
		name:	"transport",
		ship:	images.transport,
		hp:		20,
		damage:	0,
		speed:	3
	};
	enemy.push(enemyShip);
}

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
		paused:		false,
		levelStart:	true,
		timer:		0,
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

function buttonCheck(screen) {
	"use strict";
	var mouseX, mouseY, part1, part2;
	part1 = canvasWidth  / 4;
	part2 = canvasHeight / 4;
	mouseX = game.mouseX;
	mouseY = game.mouseY;
	if (screen === "main_menu") {
		if (mouseX >= part1 * 1.2 && mouseX <= part1 * 1.2 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
			game.screen = "game";
		}
		if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
			game.screen = "options";
		}
		if (mouseX >= part1 * 1.2 && mouseX <= part1 * 1.2 + part1 * 0.75 && mouseY >= part2 * 2 && mouseY <= part2 * 2 + part2 * 0.7) {
			game.screen = "stats";
		}
		if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 * 2 && mouseY <= part2 * 2 + part2 * 0.7) {
			game.screen = "about";
		}
	}
}

function playerShoot() {
	"use strict";
	var bullet, i, tempDamage, tempType;
	bullet = {
		x:		100,
		y:		game.mouseY
	};
	switch (player.upgrade) {
	case 1:
		tempDamage = player.upgrade * 10;
		tempType = images.blueLaser1;
		break;
	}
	for (i = 0; i < player.guns; i += 1) {
		//gun1
		if (i === 0) {
			bullet.x += 60;
			bullet.y -= 5;
			bullet.type = tempType;
			bullet.damage = tempDamage;
			playerBullets.push(bullet);
			playerBullets.push(bullet);
		}
		//gun2		
	}
}

function mouseClicked() {
	"use strict";
	switch (game.screen) {
	case "main_menu":
		buttonCheck(game.screen);
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
		bigLogo:	"images/logo/logo_large.png",
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
		scout:		"images/character/enemy/enemyBlack1.png",
		fighter:		"images/character/enemy/enemyBlack2.png",
		interceptor:		"images/character/enemy/enemyBlack3.png",
		tank:		"images/character/enemy/enemyBlack4.png",
		transport:		"images/character/enemy/enemyRed5.png",
		//guns
		gun0:		"images/misc/gun/gun00.png",
		//Bullets
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
	canvas.addEventListener("mousemove", getMousePos, false);
	canvas.addEventListener("click", mouseClicked, false);
	window.addEventListener("resize", resize, false);
	//Starts game
	animate();
}