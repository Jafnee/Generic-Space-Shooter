define(["view/draw", "model/game", "controller/gameLogic", "controller/action"], function (Draw, Game, GameLogic, Action) {
	var gameLoop = function gameLoop() {
		requestAnimationFrame(GameRunner.gameLoop);
		GameRunner.draw();
		Action.moveShip();
	};
	
	var draw = function draw() {
		Draw.drawBackground();
		//Checks which screen user is on
		switch (Game.screen) {
		case "main_menu":
			Draw.drawMenu();
			break;
		case "game":
			Draw.drawGame();
			GameLogic.checkCollisions();
			break;
		case "game_over":
			Draw.drawMenu();
			break;
		case "options":
			Draw.drawMenu();
			break;
		}
		Draw.fpsCalc();
	};
	
	var GameRunner = {
		gameLoop:				gameLoop,
		draw:					draw	
	};

	return GameRunner;
});