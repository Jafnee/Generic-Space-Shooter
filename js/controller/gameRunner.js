define(["view/draw", "model/game", "controller/gameLogic"], function (Draw, Game, GameLogic) {
	var gameLoop = function gameLoop() {
		requestAnimationFrame(GameRunner.gameLoop);
		GameRunner.draw();
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
		
	var animate = function animate() {
		requestAnimationFrame(GameRunner.animate);		
		Draw.draw();
	};
	
	var GameRunner = {
		animate:				animate,
		gameLoop:				gameLoop,
		draw:					draw	
	};

	return GameRunner;
});