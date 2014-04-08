define(["model/game"], function (Game) {
	var timerInterval;
	var resetTimer = function resetTimer() {
		Game.timer = 0;
	};
	
	var startTimer = function startTimer() {
		timerInterval = setInterval(function () {
			Game.timer++;
		}, 1000);
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
		GameLogic.level.started = true;
		GameLogic.timer.start();
	};
	
	var level = {
		//functions
		start:			startLevel,
		//variables
		level:			1,
		started:		false
	};
	
	var GameLogic = {
		timer:			timer,
		paused:			false,
		level:			level
	};
	return GameLogic;
});