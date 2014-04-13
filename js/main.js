define(["model/sounds","model/images",	"model/canvas", "model/character", "model/game", "view/draw", "controller/listener", "controller/action", "controller/keybind"], 
function (Sounds, Images, Canvas, Character, Game, Draw, Listener, Action, Keybind){
//test

	
//end of test
	Sounds.bgMusic.play();
	Game.getScreen();
	Game.addStars();
	Draw.animate();	
});
