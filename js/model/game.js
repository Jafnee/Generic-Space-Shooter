define([""], function () {
	var getScreen = function getScreen() {
		var screen, curPage;
		curPage = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
		if (curPage === "" || curPage === "index.html") {
			screen = "main_menu";
		} else if (curPage === "about.html") {
			screen = "about";
	}
	return screen;
	}
	var keyboard = {
		use:	false,
		pos:	pos = {
					x:		100,
					y:		100
				};
	};
	var mouse = {
		use:	false,
		pos:	pos = {
					x:		100,
					y:		100
				}
	};	
	var Game = {
		//functions
		getScreen:	getScreen,
		//variables
		screen:		Game.getScreen(),
		paused:		false,
		levelStart:	true,
		timer:		0,
		keyboard:	keyboard,
		mouse:		mouse
	};
	return Game;
});