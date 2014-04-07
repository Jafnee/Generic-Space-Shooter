define(["model/canvas",
		"model/character",
		"model/images",
		"model/game",
		"view/draw",
		"controller/listener",
		"controller/action"
		], function (Canvas, Character, Images, Game, Draw, Listener, Action) {
	//Canvas	
	//window.alert(Canvas.canvasWidth);
	//Background
	//preloadImages();
	//stars = [];
	//star  = {};
	//noStars = 1000;
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