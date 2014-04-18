define(["view/draw", "model/game", "controller/gameLogic", "controller/action", "model/canvas"], function (Draw, Game, GameLogic, Action, Canvas) {
	var gameLoop = function gameLoop() {
		requestAnimationFrame(GameRunner.gameLoop);
		GameRunner.changeTextSize();
		GameRunner.draw();
		Action.moveShip();
	};
	
	var pauseGame = function pauseGame() {
		if (Game.pause) {
			Game.pause = false;
		} else {
			Game.pause = true;
		}
		if (Game.pause) {
			GameLogic.timer.stop();
			if (Game.screen !== "paused") {
				Game.lastScreen = Game.screen;
			}
			Game.screen = "paused";
		} else {
			GameLogic.timer.start();
			Game.screen = Game.lastScreen;
		}
	};
	
	var changeTextSize = function changeTextSize() {
		var width = Canvas.canvasWidth;
		var height = Canvas.canvasHeight;
		if (!Game.screenTooSmall) {
			if (width >= 1300 && height >= 500) {
				Canvas.context.font = "40px Verdana";
				Game.screenTooSmall = false;
			} else if (width >= 1030 && height >= 429){
				Canvas.context.font = "30px Verdana";
				Game.screenTooSmall = false;
			} else if (width < 835 || height < 444) {
				GameRunner.pauseGame();
				Game.screenTooSmall = true;				
			} else {
				Canvas.context.font = "20px Verdana";
				Game.screenTooSmall = false;
			}
		}
	};
	
	var draw = function draw() {
		Draw.drawBackground();
		//Checks which screen user is on
		switch (Game.screen) {
		case "game":
			Draw.drawGame();
			GameLogic.checkCollisions();
			break;
		default:
			Draw.drawMenu();
			break;
		}
		Draw.fpsCalc();
	};	
	
	var GameRunner = {
		pauseGame:			pauseGame,
		changeTextSize:			changeTextSize,
		gameLoop:				gameLoop,
		draw:					draw	
	};

	return GameRunner;
});