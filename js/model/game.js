define(["model/images"], function (Imagess) {
	var generateStar = function generateStar(old) {
		star = {
			y:		Math.floor(Math.random() * canvasHeight) + 1,
			speed:	Math.floor(Math.random() * 4) + 1
		};
		if (old) {
			star.x = canvasWidth;
		} else {
			star.x = Math.floor(Math.random() * canvasWidth) + 1;
		}
		return star;
	}
	
	var addStars = function addStars() {
		"use strict";
		var i;
		for (i = 0; i < Game.noStars; i += 1) {
			stars.push(generateStar());
		}
	}
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
				}
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
		generateStar:	generateStar,
		addStars:		addStars,
		getScreen:		getScreen,
		//variables
		stars:			stars = [],
		enemies:		enemies = [],
		playerBullets:	playerBullets = [],
		enemyBullets:	enemyBullets = [],
		noStars:		1000,
		screen:			getScreen(),
		paused:			false,
		levelStart:		true,
		timer:			0,
		keyboard:		keyboard,
		mouse:			mouse,
		fps:			0,
		lastCalledTime:	null
	};
	return Game;
});