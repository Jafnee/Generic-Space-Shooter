define(["model/images", "model/canvas", "model/game", "model/character", "controller/gameLogic", "model/inPlay", "controller/action"],
function (Images, Canvas, Game, Character, GameLogic, InPlay, Action) {
	var drawStars = function drawStars() {
		var i, size, x, y;
		for (i = 0; i < Game.stars.length; i += 1) {
			if (Game.stars[i].x < 0) {
				Game.stars[i] = Game.generateStar(true);
			}
			size = Game.stars[i].speed / 2;
			x = Game.stars[i].x;
			y = Game.stars[i].y;
			Canvas.context.fillStyle = "rgba(255,255,255,0.5)";
			Canvas.context.fillRect(x, y, size, size);
			Game.stars[i].x -= Game.stars[i].speed;
		}
	};
	var fpsCalc = function fpsCalc() {
		var delta;
		//From http://goo.gl/eAK3jB
		if (!Game.lastCalledTime) {
			Game.lastCalledTime = new Date().getTime();
			Game.fps = 0;
			return;
		}
		delta = (new Date().getTime() - Game.lastCalledTime) / 1000;
		Game.lastCalledTime = new Date().getTime();
		Game.fps = "FPS: " + Math.floor(1 / delta);
	};
	
	var drawBackground = function drawBackground() {
		var mousex, mousey;
		mousex = Game.mouse.pos.x;
		mousey = Game.mouse.pos.Y;
		//Black space
		Canvas.context.fillStyle = "#000000";
		Canvas.context.fillRect(0, 0, canvas.width, canvas.height);
		//Debris/Stars
		drawStars();
		//FPS indicator
		Canvas.context.fillStyle = ("yellow");
		Canvas.context.font = "40px Verdana";
		//TEST
		Canvas.context.fillText(Game.fps + " Mouse : " + Game.mouse.pos.x + " " + Game.mouse.pos.y, Canvas.canvasWidth - 550, 40);
	};
	var drawMainMenu = function drawMainMenu() {
		var part1, part2, start, options, stats, about, mouseX, mouseY;
		part1 = Canvas.canvasWidth  / 4;
		part2 = Canvas.canvasHeight / 4;
		mouseX = Game.mouse.pos.x;
		mouseY = Game.mouse.pos.y;
		//Button animation
		if (mouseX >= part1 * 1.2 && mouseX <= part1 * 1.2 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
			start = Images.start1;
		} else {
			start = Images.start0;
		}
		if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
			options = Images.options1;
		} else {
			options = Images.options0;
		}
		if (mouseX >= part1 * 1.2 && mouseX <= part1 * 1.2 + part1 * 0.75 && mouseY >= part2 * 2 && mouseY <= part2 * 2 + part2 * 0.7) {
			stats = Images.stats1;
		} else {
			stats = Images.stats0;
		}
		if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 * 2 && mouseY <= part2 * 2 + part2 * 0.7) {
			about = Images.about1;
		} else {
			about = Images.about0;
		}
		//drawing button
		Canvas.context.drawImage(Images.blueMetal, part1, 0, part1 * 2, part2 * 3.5);
		Canvas.context.drawImage(Images.bigLogo, part1 * 1.1, part2 * 0.1, part1 * 1.8, part2);
		Canvas.context.drawImage(start, part1 * 1.2, part2, part1 * 0.75, part2 * 0.7);
		Canvas.context.drawImage(options, part1 * 2.1, part2, part1 * 0.75, part2 * 0.7);
		Canvas.context.drawImage(stats, part1 * 1.2, part2 * 2, part1 * 0.75, part2 * 0.7);
		Canvas.context.drawImage(about, part1 * 2.1, part2 * 2, part1 * 0.75, part2 * 0.7);
	};
	
	var drawOptions = function drawOptions() {
		console.log("options screen");
	};
	
	var drawMenu = function drawMenu() {
		switch (Game.screen) {
		case "main_menu":
			Draw.drawMainMenu();
			break;
		case "game_over":
			Draw.drawGameOver();
			break;
		case "options":
			Draw.drawOptions();
			break;
		default:
			break;
		}
	};
	
	var drawPlayerShip = function drawPlayerShip() {
		if (Character.ship.player.hp > 0) {
			Canvas.context.drawImage(Images.gun0, Character.ship.player.pos.x + 55, Character.ship.player.pos.y - 8.5);
			Canvas.context.drawImage(Images.blueShip, Character.ship.player.pos.x, Character.ship.player.pos.y - 49.5);
		}
	};
	
	var drawPowerups = function drawPowerups() {
		var i;
		powerUps = InPlay.powerUps;
		for (i = 0; i < powerUps.length; i +=1) {
			Canvas.context.drawImage(Images.pickupHealth, powerUps[i].x, powerUps[i].y);
		}
	};
	
	var drawEnemies = function drawEnemies() {
		var i, relativeTime;
		var enemies = InPlay.enemies;		
		for (i = 0; i < enemies.length; i += 1) {
			if (enemies[i].alive) {
				relativeTime = Game.timer - GameLogic.level.startTime;
				if (relativeTime > enemies[i].time) {
					Canvas.context.drawImage(enemies[i].ship, enemies[i].x, enemies[i].y);
					if (enemies[i].x <= -140) {
						enemies[i].alive = false;
					} else {
						enemies[i].x -= enemies[i].speed;
						if (enemies[i].name === "interceptor") {
							if (enemies[i].y < Character.ship.player.pos.y - 49.5) {
								enemies[i].y += 2;
							}
							if (enemies[i].y > Character.ship.player.pos.y - 49.5) {
								enemies[i].y -= 2;
							}							
						}
						if (enemies[i].fireRate > 0) {
                            if (relativeTime % enemies[i].fireRate <= 0.02) {
                                enemies[i].hasShot = true;
                                Action.enemyShoot(enemies[i].x, enemies[i].y, enemies[i].damage);
                            } 
						}
					}
				}
			}
		}
	};
	
	var drawBullets = function drawBullets() {
		var i;
		var playerBullets = InPlay.playerBullets;
		var enemyBullets = InPlay.enemyBullets;
		for (i = 0; i < playerBullets.length; i += 1) {
			if (playerBullets[i].alive) {
				Canvas.context.drawImage(playerBullets[i].type, playerBullets[i].x, playerBullets[i].y);
				if (playerBullets[i].x >= Canvas.canvasWidth) {
					playerBullets.shift();
				} else {
					playerBullets[i].x += 40;
				}
			}
		}
		for (i = 0; i < enemyBullets.length; i += 1) {
			if (enemyBullets[i].alive) {
				Canvas.context.drawImage(enemyBullets[i].type, enemyBullets[i].x, enemyBullets[i].y);
				if (enemyBullets[i].x <= 0) {
					enemyBullets.shift();
				} else {
					enemyBullets[i].x -= 10;
				}
			}
		}
	};	
	
	var drawScore = function drawScore() {
		var score = Character.ship.player.score;
		Canvas.context.fillText("Score: "+score, (Canvas.canvasWidth / 2) - 240, 40);
	};
	
	var drawHP = function drawHP() {
		var hp = Character.ship.player.hp;
		Canvas.context.fillText("Health: "+hp, 0, 40);
	};
	
	var drawGameOver = function drawGameOver() {
		var restart, mainMenu;
		part1 = Canvas.canvasWidth  / 4;
		part2 = Canvas.canvasHeight / 4;
		mouseX = Game.mouse.pos.x;
		mouseY = Game.mouse.pos.y;		
		if (mouseX >= part1 * 1.2 && mouseX <= part1 * 1.2 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
			restart = Images.restart1;
		} else {
			restart = Images.restart0;
		}
		if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
			mainMenu = Images.mainMenu1;
		} else {
			mainMenu = Images.mainMenu0;
		}
		Canvas.context.drawImage(Images.blueMetal, part1, 0, part1 * 2, part2 * 2);
		Canvas.context.drawImage(Images.bigLogo, part1 * 1.1, part2 * 0.1, part1 * 1.8, part2);
		Canvas.context.fillText("Game Over  Level: "+Game.level+"  Score: "+Character.ship.player.score, (Canvas.canvasWidth / 2) - 345, Canvas.canvasHeight / 1.5);
		Canvas.context.drawImage(restart, part1 * 1.2, part2, part1 * 0.75, part2 * 0.7);
		Canvas.context.drawImage(mainMenu, part1 * 2.1, part2, part1 * 0.75, part2 * 0.7);
	};
	
	var drawGame = function drawGame() {
		if (Game.levelStarted) {
			Draw.drawScore();
			Draw.drawHP();
		} else {
			Canvas.context.fillText("Level: "+Game.level, (Canvas.canvasWidth / 2) - 80, Canvas.canvasHeight / 2);
		}
		Draw.drawBullets();
		Draw.drawPlayerShip();
		Draw.drawEnemies();
		Draw.drawPowerups();
	};		
	
	var Draw = {
		//functions
	
		drawStars:				drawStars,
		fpsCalc:				fpsCalc,
		drawBackground:			drawBackground,
		drawHP:					drawHP,
		drawScore:				drawScore,
		drawPlayerShip:			drawPlayerShip,
		drawEnemies:			drawEnemies,
		drawPowerups:			drawPowerups,
		drawBullets:			drawBullets,
		drawGame:				drawGame,
		drawMainMenu:			drawMainMenu,
		drawOptions:			drawOptions,
		drawMenu:				drawMenu,
		drawGameOver:			drawGameOver
	
	};	
	
	return Draw;
});
