define(["model/sounds","model/images",	"model/canvas", "model/character", "model/game", "view/draw", "controller/listener", "controller/action", "controller/keybind", "controller/gameRunner"], 
function (Sounds, Images, Canvas, Character, Game, Draw, Listener, Action, Keybind, GameRunner){
//test

	
//end of test
	Sounds.bgMusic.play();
	Game.getScreen();
	Game.addStars();
	GameRunner.gameLoop();	
});
