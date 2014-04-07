define([""], function () {
	var Images = {};
	var sources, src;
	sources = {
		//menu
		bigLogo:	"images/logo/logo_large.png",
		blueMetal:	"images/menu/backdrop/blueMetalSheet.jpg",
		start0:		"images/menu/button/startGame0.png",
		start1:		"images/menu/button/startGame1.png",
		options0:	"images/menu/button/options0.png",
		options1:	"images/menu/button/options1.png",
		stats0:		"images/menu/button/stats0.png",
		stats1:		"images/menu/button/stats1.png",
		about0:		"images/menu/button/about0.png",
		about1:		"images/menu/button/about1.png",
		//ships
		blueShip:	"images/character/player/playerShipBlue.png",
		scout:		"images/character/enemy/enemyBlack1.png",
		fighter:		"images/character/enemy/enemyBlack2.png",
		interceptor:		"images/character/enemy/enemyBlack3.png",
		tank:		"images/character/enemy/enemyBlack4.png",
		transport:		"images/character/enemy/enemyRed5.png",
		//guns
		gun0:		"images/misc/gun/gun00.png",
		//Bullets
		blueLaser1:	"images/misc/laser/laserBlue01.png"
	};
	for (src in sources) {
		Images[src] = new Image();
		Images[src].src = sources[src];
	}
	
	return Images;
});