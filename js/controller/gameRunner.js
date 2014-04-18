define(["view/draw", "model/game", "controller/gameLogic", "controller/action", "model/canvas"], function (Draw, Game, GameLogic, Action, Canvas) {
	var gameLoop = function gameLoop() {
		requestAnimationFrame(GameRunner.gameLoop);
		GameRunner.changeTextSize();
		GameRunner.draw();
		Action.moveShip();
	};
	
	var changeTextSize = function changeTextSize() {
		var width = Canvas.canvasWidth;
		var height = Canvas.canvasHeight;		
		console.log(Canvas.canvasWidth + "x" + Canvas.canvasHeight);
		if (width >= 1300 && height >= 500) {
			Canvas.context.font = "40px Verdana";
		} else if (width >= 1030 && height >= 429){
			Canvas.context.font = "30px Verdana";
		} else {
			Canvas.context.font = "20px Verdana";
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
		changeTextSize:			changeTextSize,
		gameLoop:				gameLoop,
		draw:					draw	
	};

	return GameRunner;
});