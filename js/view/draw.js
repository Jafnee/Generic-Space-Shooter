define(["model/game", "model/canvas"], function (Game, Canvas) {
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
	}
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
	}
	
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
	}
	var drawMainMenu = function drawMainMenu() {
		var part1, part2, start, options, stats, about, mouseX, mouseY;
		part1 = canvasWidth  / 4;
		part2 = canvasHeight / 4;
		mouseX = Game.mouse.pos.x;
		mouseY = Game.mouse.pos.Y;
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
		Canvas.context.drawImage(images.blueMetal, part1, 0, part1 * 2, part2 * 3.5);
		Canvas.context.drawImage(images.bigLogo, part1 * 1.1, part2 * 0.1, part1 * 1.8, part2);
		Canvas.context.drawImage(start, part1 * 1.2, part2, part1 * 0.75, part2 * 0.7);
		Canvas.context.drawImage(options, part1 * 2.1, part2, part1 * 0.75, part2 * 0.7);
		Canvas.context.drawImage(stats, part1 * 1.2, part2 * 2, part1 * 0.75, part2 * 0.7);
		Canvas.context.drawImage(about, part1 * 2.1, part2 * 2, part1 * 0.75, part2 * 0.7);
	}
	
	var drawMenu = function drawMenu() {
		switch (Game.screen) {
		case "menu":
			drawMainMenu();
			break;
		default:
			break;
		}
	}
	
	var drawPlayerShip = function drawPlayerShip() {
		if (game.mouse) {
			player.y = Game.mouse.pos.Y;
		}
		Canvas.context.drawImage(images.gun0, player.x + 55, player.y - 8.5);
		Canvas.context.drawImage(images.blueShip, player.x, player.y - 49.5);
	}
	
	var drawBullet = function drawBullets() {
		var i;
		for (i = 0; i < playerBullets.length; i += 1) {
			Canvas.context.drawImage(playerBullets[i].type, playerBullets[i].x, playerBullets[i].y);
			if (playerBullets[i].x >= canvasWidth) {
				playerBullets.shift();
			} else {
				playerBullets[i].x += 40;
			}
		}
		for (i = 0; i < enemyBullets.length; i += 1) {
			Canvas.context.drawImage(enemyBullets[i].type, enemyBullets[i].x, enemyBullets[i].y);
			if (enemyBullets[i].x >= canvasWidth) {
				enemyBullets.shift();
			} else {
				enemyBullets[i].x += 40;
			}
		}
	}
	var draw = function draw() {
		drawBackground();
		//Checks which screen user is on
		switch (Game.screen) {
		case "main_menu":
			drawMenu();
			break;
		case "game":
			drawBullets();
			drawPlayerShip();
			break;
		}
		fpsCalc();
	}
		
	var animate = function animate() {
		requestAnimationFrame(animate);
		draw();
	}
		
	var Draw = {
		//functions
		animate:				animate,
		drawStars:				drawStars,
		fpsCalc:				fpsCalc,
		drawBackground:			drawBackground,
		drawPlayerShip:			drawPlayerShip,
		drawBullet:				drawBullet,
		drawMainMenu:			drawMainMenu,
		drawMenu:				drawMenu,
		draw:					draw
	};	
	
	return Draw;
});