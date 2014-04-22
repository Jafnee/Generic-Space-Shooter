define(["view/draw", "model/game", "controller/gameLogic", "controller/action", "model/canvas", "model/sounds"], function (Draw, Game, GameLogic, Action, Canvas, Sounds) {
    var gameLoop = function gameLoop() {
        if (window.requestAnimationFrame === undefined) {
			Canvas.context.fillStyle = "#FFFFFF";
            Canvas.context.fillRect(0, 0, Canvas.canvas.width, Canvas.canvas.height);
			Canvas.context.fillStyle = "#000000";
            Canvas.context.font = "20px Verdana";
            Canvas.context.fillText("Your browser does not support requestAnimationFrame", 100, Canvas.canvasHeight*0.25);
            Canvas.context.fillText("Please upgrade your browser", 100, Canvas.canvasHeight*0.75);
        } else {
            requestAnimationFrame(GameRunner.gameLoop);
            GameRunner.changeTextSize();
            GameRunner.draw();
            Action.moveShip();
        }
    };

    var pauseGame = function pauseGame() {
        if (Game.levelStarted || Game.screen === "paused") {
            if (!Game.muteSFX) {
                Sounds.pause.play();
            }
            if (Game.paused) {
                Game.paused = false;
            } else {
                Game.paused = true;
            }
            if (Game.paused) {
                GameLogic.timer.stop();
                if (Game.screen !== "paused") {
                    Game.lastScreen = Game.screen;
                }
                Game.screen = "paused";
            } else {
                GameLogic.timer.start();
                Game.screen = Game.lastScreen;
            }
        }
    };

    var changeTextSize = function changeTextSize() {
        var width = Canvas.canvasWidth;
        var height = Canvas.canvasHeight;
        if (width < 835 || height < 444) {
            if (!Game.paused) {
                GameRunner.pauseGame();
            }
            Game.screenTooSmall = true;
        } else {
            Game.screenTooSmall = false;
        }
        if (!Game.screenTooSmall) {
            if (width >= 1300 && height >= 500) {
                Canvas.context.font = "40px Verdana";
            } else if (width >= 1030 && height >= 429) {
                Canvas.context.font = "30px Verdana";
            } else {
                Canvas.context.font = "20px Verdana";
            }
        }
    };

    var draw = function draw() {
        Draw.drawBackground();
        //Checks which screen user is on
        if (Game.screen === "game") {
            Draw.drawGame();
            GameLogic.checkCollisions();
		} else {
            Draw.drawMenu();
        }
    };

    var GameRunner = {
        pauseGame: pauseGame,
        changeTextSize: changeTextSize,
        gameLoop: gameLoop,
        draw: draw
    };

    return GameRunner;
});