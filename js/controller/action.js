define(["model/game", "model/canvas", "model/character", "model/images", "model/inPlay", "controller/gameLogic", "model/sounds"],
function (Game, Canvas, Character, Images, InPlay, GameLogic, Sounds) {
	var getMousePos = function getMousePos(evt) {
		Game.mouse.use = true;
		var rect = Canvas.canvas.getBoundingClientRect();
		Game.mouse.pos.x = evt.clientX - rect.left;
		Game.mouse.pos.y = evt.clientY - rect.top;
	};
	
	var resize = function resize() {
		Canvas.contextCanvasWidth = window.innerWidth;
		Canvas.contextCanvasHeight = window.innerHeight - 70;
		Canvas.canvasWidth = canvas.width;
		Canvas.canvasHeight = canvas.height;
		canvas = document.getElementById("gameCanvas");
		context = canvas.getContext("2d");
		context.canvas.width = window.innerWidth;
		context.canvas.height = window.innerHeight - 70;
		canvasWidth = canvas.width;
		canvasHeight = canvas.height;		
	};
	
	var mouseClicked = function mouseClicked() {
		switch (Game.screen) {
		case "main_menu":
			Action.mainMenuButtonCheck();
			break;
		case "game":
			if (Character.ship.player.hp > 0) {
				Action.playerShoot();
			}
			break;
		case "game_over":
			Action.gameOverButtonCheck();
		}
	};
	
	var gameOverButtonCheck = function gameOverButtonCheck() {
		var mouseX, mouseY, part1, part2;
		part1 = canvasWidth  / 4;
		part2 = canvasHeight / 4;
		mouseX = Game.mouse.pos.x;
		mouseY = Game.mouse.pos.y;
		if (mouseX >= part1 * 1.2 && mouseX <= part1 * 1.2 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
			Action.resetVariables();
			Game.screen = "game";
			GameLogic.level.start();
		}
		if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
			Game.screen = "main_menu";
		}
	};
	
	var mainMenuButtonCheck = function mainMenuButtonCheck() {
		var mouseX, mouseY, part1, part2;
		part1 = canvasWidth  / 4;
		part2 = canvasHeight / 4;
		mouseX = Game.mouse.pos.x;
		mouseY = Game.mouse.pos.y;
		if (mouseX >= part1 * 1.2 && mouseX <= part1 * 1.2 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
			Game.screen = "game";
			Action.resetVariables();
			GameLogic.level.start();
		}
		if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
			Game.screen = "options";
		}
		if (mouseX >= part1 * 1.2 && mouseX <= part1 * 1.2 + part1 * 0.75 && mouseY >= part2 * 2 && mouseY <= part2 * 2 + part2 * 0.7) {
			Game.screen = "stats";
		}
		if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 * 2 && mouseY <= part2 * 2 + part2 * 0.7) {
			Game.screen = "about";
		}
	};
	var enemyShoot = function enemyShoot(x, y, damage) {
		var bullet, i, tempDamage, tempX, tempY;
        tempX = x;
        tempY = y;
        tempDamage = damage;
        Sounds.laser2.play();
        bullet = {
			x:					tempX,
			y:					tempY+52,
			damage:             tempDamage,
			alive:				true,
			type:				Images.redLaser1
		};
		InPlay.enemyBullets.push(bullet);
	};
	
	var playerShoot = function playerShoot() {
		var bullet, i, tempDamage, tempType;
		upgrade = Character.ship.player.upgrade;
		Sounds.laser1.play();
		bullet = {
			x:		100,
			y:		Game.mouse.pos.y,
			alive:	true
		};
		if (upgrade === 1) {
			tempDamage = Character.ship.player.upgrade * 10;
			tempType = Images.blueLaser1;
		}
		for (i = 0; i < Character.ship.player.guns; i += 1) {
			//gun1
			if (i === 0) {
				bullet.x += 60;
				bullet.y -= 5;
				bullet.type = tempType;
				bullet.damage = tempDamage;
				InPlay.playerBullets.push(bullet);
			}
			//gun2
		}
	};
	
	var resetVariables = function resetVariables() {
		//game resets
		Game.gameOver = false;
		Game.timer = 0;
		Game.level = 1;
		Game.levelStarted = false;
		InPlay.enemies.length = 0;
		InPlay.enemyBullets.length = 0;
		InPlay.powerUps = 0;
		//character resets
		Character.ship.player.score = 0;
		Character.ship.player.hp = 100;
		Character.ship.player.guns = 1;
		Character.ship.player.upgrade = 1;
		Character.ship.player.lives = 3;
	};
	
	var Action = {
		mouseClicked:			mouseClicked,
		playerShoot:			playerShoot,
		enemyShoot:             enemyShoot,
		resetVariables:			resetVariables,
		mainMenuButtonCheck:	mainMenuButtonCheck,
		gameOverButtonCheck:	gameOverButtonCheck,
		getMousePos:			getMousePos,
		resize:					resize
	};
	return Action;
});
