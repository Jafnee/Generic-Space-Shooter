define([""], function () {	

	var mouseClicked = function mouseClicked() {
		switch (game.screen) {
		case "main_menu":
			buttonCheck(game.screen);
			break;
		case "game":
			playerShoot();
			break;
		}
	}
	
	var playerShoot = function playerShoot() {
		"use strict";
		var bullet, i, tempDamage, tempType;
		bullet = {
			x:		100,
			y:		game.mouseY
		};
		switch (player.upgrade) {
		case 1:
			tempDamage = player.upgrade * 10;
			tempType = images.blueLaser1;
			break;
		}
		for (i = 0; i < player.guns; i += 1) {
			//gun1
			if (i === 0) {
				bullet.x += 60;
				bullet.y -= 5;
				bullet.type = tempType;
				bullet.damage = tempDamage;
				playerBullets.push(bullet);
				playerBullets.push(bullet);
			}
			//gun2		
		}
	var event = {
		mouseClicked:	mouseClicked,
		playerShoot:	playerShoot
	};
	return event;
});