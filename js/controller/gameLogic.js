define(["model/game", "model/character", "model/inPlay", "model/canvas"], function (Game, Character, InPlay, Canvas) {
	var timerInterval;
	var resetTimer = function resetTimer() {
		Game.timer = 0;
	};
	
	var clone = (function(){
		return function (obj) { Clone.prototype=obj; return new Clone() };
		function Clone(){}
	}());
	
	var startTimer = function startTimer() {
		timerInterval = setInterval(function () {
			if (Game.levelStarted) {
				Game.timer++;
				GameLogic.addScore(20);
			}
		}, 1000);
	}
	
	var addScore = function addScore(add) {
		Character.ship.player.score += add;
	}
	
	var stopTimer = function stopTimer() {
		clearInterval(timerInterval);
	}
	
	var getTimer = function getTimer() {
		return Game.timer;
	}

	var timer = {
		reset:			resetTimer,
		start:			startTimer,
		stop:			stopTimer,
		get:			getTimer
	};
	
	var startLevel = function startLevel() {
		setTimeout(function(){
			Game.levelStarted = true;
			GameLogic.timer.start();
			GameLogic.addEnemies();
		}, 3000);
	};
		
	var checkBulletCollision = function checkBulletCollision() {
		var bullet, ship;
		var playerBullets = InPlay.playerBullets;
		var enemies = InPlay.enemies;
		for (bullet = 0; bullet < playerBullets.length; bullet++) {
			if (playerBullets[bullet].alive) {
				for (ship = 0; ship < enemies.length; ship++) {
					if (enemies[ship].alive) {
						if (playerBullets[bullet].x >= enemies[ship].x && playerBullets[bullet].x <= (enemies[ship].x + 84)) {
							if (playerBullets[bullet].y >= (enemies[ship].y - 9) && playerBullets[bullet].y <= (enemies[ship].y + 90)) {
								playerBullets[bullet].alive = false;
								enemies[ship].hp -= playerBullets[bullet].damage;
								if (enemies[ship].hp <= 0) {
									enemies[ship].alive = false;
									GameLogic.addScore(enemies[ship].score);
								}
							}
						}
					}
				}
			}
		}
	};
	
	var checkShipCollision = function checkShipCollision() {
	};
	
	var checkCollisions = function checkCollisions() {
		//GameLogic.checkShipCollision();
		GameLogic.checkBulletCollision();
	};
	
	var spawnCheck = function spawnCheck(newShip,spawnTime) {
		var i, enemies, spawningY, verdict, time;
		verdict = true;
		time = spawnTime;
		spawningY = newShip;
		enemies = InPlay.enemies;
		if (enemies.length >= 1) {
			for (i = 0; i < enemies.length; i ++) {
				if (time < enemies[i].time + 1) {
					if (spawningY > enemies[i].y - 104 && spawningY < enemies[i].y + 104) {
						verdict = false;
					} 
				} 
			} 
		}
		return verdict;
	}
	
	var addEnemies = function addEnemies(level) {
		var i, enemy, x, y, noEnemies, rate;
		noEnemies = 20;
		rate = 0.5;
		var time = 0;
		GameLogic.level.startTime = Game.timer;
		for (i = 0; i < noEnemies; i ++) {
			enemy = GameLogic.clone(Character.ship.enemy.scout);
			y = Math.floor(Math.random() * (Canvas.canvasHeight - 90)) + 1;
			if (GameLogic.spawnCheck(y,time)) {
				x = Canvas.canvasWidth;
				enemy.y = y;
				enemy.x = x;
				enemy.time = time;
				time += rate;
				InPlay.enemies.push(enemy);
			} else {
				i--;
			}
		}
	};
	
	var level = {
		//functions
		start:			startLevel,
		//variables
		startTime:		0
	};
	
	var GameLogic = {
		//functions
		clone:						clone,
		spawnCheck:					spawnCheck,
		addEnemies:					addEnemies,
		checkBulletCollision:		checkBulletCollision,
		checkShipCollision:			checkShipCollision,
		checkCollisions:			checkCollisions,
		addScore:					addScore,
		//variables
		paused:						false,
		level:						level,
		timer:						timer
	};
	return GameLogic;
});