define(["model/game", "model/canvas", "model/character", "model/images", "model/inPlay", "controller/gameLogic"],
function (Game, Canvas, Character, Images, InPlay, GameLogic) {
	var getMousePos = function getMousePos(evt) {
		Game.mouse.use = true;
		var rect = Canvas.canvas.getBoundingClientRect();
		Game.mouse.pos.x = evt.clientX - rect.left;
		Game.mouse.pos.y = evt.clientY - rect.top;
	}
	
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
	}
	
	var mouseClicked = function mouseClicked() {
		switch (Game.screen) {
		case "main_menu":
			Action.mainMenuButtonCheck(Game.screen);
			break;
		case "game":
			Action.playerShoot();
			break;
		}
	}
	
	var mainMenuButtonCheck = function mainMenuButtonCheck(screen) {
		var mouseX, mouseY, part1, part2;
		part1 = canvasWidth  / 4;
		part2 = canvasHeight / 4;
		mouseX = Game.mouse.pos.x;
		mouseY = Game.mouse.pos.y;
		if (screen === "main_menu") {
			if (mouseX >= part1 * 1.2 && mouseX <= part1 * 1.2 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
				Game.screen = "game";
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
		}
	}
	
	var playerShoot = function playerShoot() {
		var bullet, i, tempDamage, tempType;
		bullet = {
			x:		100,
			y:		Game.mouse.pos.y,
			alive:	true
		};
		switch (Character.ship.player.upgrade) {
		case 1:
			tempDamage = Character.ship.player.upgrade * 10;
			tempType = Images.blueLaser1;
			break;
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
	}
	var Action = {
		mouseClicked:			mouseClicked,
		playerShoot:			playerShoot,
		mainMenuButtonCheck:	mainMenuButtonCheck,
		getMousePos:			getMousePos,
		resize:					resize
	};
	return Action;
});