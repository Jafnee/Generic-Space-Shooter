define(["model/sounds","model/images", "model/canvas", "model/character", "model/game", "view/draw", "controller/listener", "controller/action", "controller/keybind", "controller/gameRunner", "controller/localStorageManager"], 
function (Sounds, Images, Canvas, Character, Game, Draw, Listener, Action, Keybind, GameRunner, LSM){
//test

//end of test
	LSM.init();
	LSM.load();
	if (!Game.muteMusic) {
		Game.musicCreated = true;
		Sounds.bgMusic.play();
	}
	Game.getScreen();
	Game.addStars();
	GameRunner.gameLoop();
});
