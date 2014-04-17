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
	
	var loadUser = function loadUser() {
	};
	
	var GameRunner = {
		gameLoop:				gameLoop,
		loadUser:				loadUser,
		draw:					draw	
	};

	return GameRunner;
});