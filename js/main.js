define([
	"model/images",
	"model/canvas",
	"model/character",
	"model/game",
	"view/draw",
	"controller/listener",
	"controller/action"
	], 
	function (
		Images,
		Canvas,
		Character, 
		Game,
		Draw, 
		Listener, 
		Action
	){
	//Canvas	
	//window.alert(Canvas.canvasWidth);
	//Background
	//preloadImages();
	//stars = [];
	//star  = {};
	//noStars = 1000;
	Game.getScreen();
	Game.addStars();
	//Game settings	
	//initGame();
	//initPlayer();
	//enemies  = [];
	//enemy = [];
	//initEnemy();
	//playerBullets = [];
	//enemyBullets = [];
	//Event listeners
	
	//Starts game
	Draw.animate();
	
});