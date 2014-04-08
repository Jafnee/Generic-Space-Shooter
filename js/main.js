define(["model/images",	"model/canvas", "model/character", "model/game", "view/draw", "controller/listener", "controller/action"], 
function (Images, Canvas, Character, Game, Draw, Listener, Action){

	Game.getScreen();
	Game.addStars();
	Draw.animate();	
});