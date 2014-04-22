define(["model/game", "model/canvas", "model/character", "model/images", "model/inPlay", "controller/gameLogic", "model/sounds", "controller/localStorageManager"],
    function (Game, Canvas, Character, Images, InPlay, GameLogic, Sounds, LSM) {
        var shooting;
        var getMousePos = function getMousePos(evt) {
            Game.keyboard.use = false;
            Game.mouse.use = true;
            var rect = Canvas.canvas.getBoundingClientRect();
            Game.mouse.pos.x = evt.clientX - rect.left;
            Game.mouse.pos.y = evt.clientY - rect.top;
            Character.ship.player.pos.y = Game.mouse.pos.y;
            if (Game.mouse.pos.x <= 0 || Game.mouse.pos.x >= Canvas.canvasWidth || Game.mouse.pos.y <= 0 || Game.mouse.pos.y >= Canvas.canvasHeight) {
                clearInterval(Action.shooting);
            }
        };

        var resize = function resize() {
            Canvas.contextCanvasWidth = window.innerWidth;
            Canvas.contextCanvasHeight = window.innerHeight - 70;
            Canvas.canvasWidth = Canvas.canvas.width;
            Canvas.canvasHeight = Canvas.canvas.height;
            canvas = document.getElementById("gameCanvas");
            context = canvas.getContext("2d");
            context.canvas.width = window.innerWidth;
            context.canvas.height = window.innerHeight - 70;
            canvasWidth = canvas.width;
            canvasHeight = canvas.height;
        };

        var mouseClicked = function mouseClicked(down, kb) {
            Game.keyboard.use = false;
            Game.mouse.use = true;
            switch (Game.screen) {
            case "main_menu":
                if (down && !kb) {
                    Action.mainMenuButtonCheck();
                }
                break;
            case "game":
                if (down && !Game.keyboard.sbFlag) {					
                    Game.keyboard.sbFlag = true;
					if (!Character.ship.player.hasShot) {
						Action.playerShoot();
						Character.ship.player.hasShot = true;
						window.setTimeout(function() {
							Character.ship.player.hasShot = false;
						}, Character.ship.player.fireRate * 100);
					}
                    Action.shooting = setInterval(function () {
                        if (Character.ship.player.hp > 0) {
							if (GameLogic.fRate) {
								GameLogic.fRate = false;
								clearInterval(Action.shooting);
								Action.shooting = setInterval(function () {
									if (Character.ship.player.hp > 0) {
										Action.playerShoot();
									}
								}, Character.ship.player.fireRate * 100);
							}
                            Action.playerShoot();
                        }
                    }, Character.ship.player.fireRate * 100);
                } else if (!down) {
                    clearInterval(Action.shooting);
                    Game.keyboard.sbFlag = false;
                }
                break;
            case "game_over":
                if (down && !kb) {
                    Action.gameOverButtonCheck();
                }
                break;
            case "options":
                if (down && !kb) {
                    Action.optionsButtonCheck();
                }
                break;
            case "stats":
                if (down && !kb) {
                    Action.statsButtonCheck();
                }
                break;
            }
        };

        var moveShip = function moveShip() {
            if (Game.keyboard.use) {
                if (Game.keyboard.up) {
                    if (Character.ship.player.pos.y >= 10) {
                        Character.ship.player.pos.y -= 10;
                    }
                } else if (Game.keyboard.down) {
                    if (Character.ship.player.pos.y <= Canvas.canvasHeight - 14) {
                        Character.ship.player.pos.y += 10;
                    }
                }
            }
        };

        var gameOverButtonCheck = function gameOverButtonCheck() {
            var mouseX, mouseY, part1, part2;
            part1 = Canvas.canvasWidth / 4;
            part2 = Canvas.canvasHeight / 4;
            mouseX = Game.mouse.pos.x;
            mouseY = Game.mouse.pos.y;
            if (mouseX >= part1 * 1.2 && mouseX <= part1 * 1.2 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
                if (!Game.muteSFX) {
                    Sounds.select.play();
                }
                Action.resetVariables();
                Game.screen = "game";
                GameLogic.level.start();
            }
            if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
                if (!Game.muteSFX) {
                    Sounds.select.play();
                }
                Game.screen = "main_menu";
            }
        };

        var optionsButtonCheck = function optionsButtonCheck() {
            var mouseX, mouseY, part1, part2;
            part1 = Canvas.canvasWidth / 4;
            part2 = Canvas.canvasHeight / 4;
            mouseX = Game.mouse.pos.x;
            mouseY = Game.mouse.pos.y;
            if (mouseX >= part1 * 1.2 && mouseX <= part1 * 1.2 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
                if (!Game.muteSFX) {
                    Sounds.select.play();
                }
                if (Game.muteMusic === false) {
                    Game.muteMusic = true;
                    LSM.set("music", "false");
                    Sounds.bgMusic.mute();
                } else {
                    if (!Game.musicCreated) {
                        Sounds.bgMusic.play();
                        Game.musicCreated = true;
                    }
                    Sounds.bgMusic.unmute();
                    Game.muteMusic = false;
                    LSM.set("music", "true");
                }
            }
            if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
                if (!Game.muteSFX) {
                    Sounds.select.play();
                }
                if (Game.muteSFX === false) {
                    Game.muteSFX = true;
                    LSM.set("sfx", "false");
                } else {
                    Game.muteSFX = false;
                    LSM.set("sfx", "true");
                }
            }
            if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 * 2 && mouseY <= part2 * 2 + part2 * 0.7) {
                if (!Game.muteSFX) {
                    Sounds.select.play();
                }
                Game.screen = "main_menu";
            }
        };

        var statsButtonCheck = function statsButtonCheck() {
            var mouseX, mouseY, part1, part2;
            part1 = Canvas.canvasWidth / 4;
            part2 = Canvas.canvasHeight / 4;
            mouseX = Game.mouse.pos.x;
            mouseY = Game.mouse.pos.y;
            if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
                if (!Game.muteSFX) {
                    Sounds.select.play();
                }
                Game.screen = "main_menu";
            }
            if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 * 2 && mouseY <= part2 * 2 + part2 * 0.7) {
                if (!Game.muteSFX) {
                    Sounds.select.play();
                }
                GameLogic.resetStats();
            }
        };

        var mainMenuButtonCheck = function mainMenuButtonCheck() {
            var mouseX, mouseY, part1, part2;
            part1 = Canvas.canvasWidth / 4;
            part2 = Canvas.canvasHeight / 4;
            mouseX = Game.mouse.pos.x;
            mouseY = Game.mouse.pos.y;
            if (mouseX >= part1 * 1.2 && mouseX <= part1 * 1.2 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
                if (!Game.muteSFX) {
                    Sounds.select.play();
                }
                Game.screen = "game";
                Action.resetVariables();
                GameLogic.level.start();
            }
            if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
                if (!Game.muteSFX) {
                    Sounds.select.play();
                }
                Game.screen = "options";
            }
            if (mouseX >= part1 * 1.2 && mouseX <= part1 * 1.2 + part1 * 0.75 && mouseY >= part2 * 2 && mouseY <= part2 * 2 + part2 * 0.7) {
                if (!Game.muteSFX) {
                    Sounds.select.play();
                }
                Game.screen = "stats";
            }
            if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 * 2 && mouseY <= part2 * 2 + part2 * 0.7) {
                if (!Game.muteSFX) {
                    Sounds.select.play();
                }
                Game.screen = "paused";
                Game.paused = true;
            }
        };

        var enemyShoot = function enemyShoot(x, y, damage) {
            var bullet, tempDamage, tempX, tempY;
            tempX = x;
            tempY = y;
            tempDamage = damage;
            if (!Game.muteSFX) {
                Sounds.laser2.play();
            }
            bullet = {
                x: tempX,
                y: tempY + 52,
                damage: tempDamage,
                alive: true,
                type: Images.redLaser1
            };
            InPlay.enemyBullets.push(bullet);
        };

        var playerShoot = function playerShoot() {
            var bullet, i, tempDamage, tempType;
            if (Game.screen === "game") {
                upgrade = Character.ship.player.upgrade;
                if (!Game.muteSFX) {
                    Sounds.laser1.play();
                }
                bullet = {
                    x: Character.ship.player.pos.x,
                    y: Character.ship.player.pos.y,
                    alive: true
                };
                tempDamage = Character.ship.player.damage;
                tempType = Images.blueLaser1;

                bullet.x += 60;
                bullet.y -= 4;
                bullet.type = tempType;
                bullet.damage = tempDamage;
                InPlay.playerBullets.push(bullet);
            }
        };

        var resetVariables = function resetVariables() {
            //game resets
            Game.gameOver = false;
            Game.timer = 0;
            Game.level = 1;
            Game.levelStarted = false;
            InPlay.enemies.length = 0;
            InPlay.enemyBullets.length = 0;
            InPlay.powerUps.length = 0;
            //character resets
            Character.ship.player.score = 0;
            Character.ship.player.hp = 100;
            Character.ship.player.guns = 1;
            Character.ship.player.damage = 10;
			Character.ship.player.fireRate = 3;
        };

        var Action = {
            moveShip: moveShip,
			shooting: shooting,
            mouseClicked: mouseClicked,
            playerShoot: playerShoot,
            enemyShoot: enemyShoot,
            resetVariables: resetVariables,
            mainMenuButtonCheck: mainMenuButtonCheck,
            optionsButtonCheck: optionsButtonCheck,
            gameOverButtonCheck: gameOverButtonCheck,
            statsButtonCheck: statsButtonCheck,
            getMousePos: getMousePos,
            resize: resize
        };
        return Action;
    });