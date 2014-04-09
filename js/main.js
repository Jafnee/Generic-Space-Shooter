define(["model/sounds","model/images",	"model/canvas", "model/character", "model/game", "view/draw", "controller/listener", "controller/action"], 
function (Sounds, Images, Canvas, Character, Game, Draw, Listener, Action){
//test

	
//end of test
	
	Game.getScreen();
	Game.addStars();
	Draw.animate();	
});