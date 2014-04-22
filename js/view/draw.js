define(["model/images", "model/canvas", "model/game", "model/character", "controller/gameLogic", "model/inPlay", "controller/action"],
    function (Images, Canvas, Game, Character, GameLogic, InPlay, Action) {
        var drawStars = function drawStars() {
            var i, size, x, y;
            for (i = 0; i < Game.stars.length; i += 1) {
                if (Game.stars[i].x < 0) {
                    Game.stars[i] = Game.generateStar(true);
                }
                size = Game.stars[i].speed / 2;
                x = Game.stars[i].x;
                y = Game.stars[i].y;
                Canvas.context.fillStyle = "rgba(255,255,255,0.5)";
                Canvas.context.fillRect(x, y, size, size);
                Game.stars[i].x -= Game.stars[i].speed;
            }
        };

        var drawBackground = function drawBackground() {
            var mousex, mousey;
            mousex = Game.mouse.pos.x;
            mousey = Game.mouse.pos.Y;
            //Black space
            Canvas.context.fillStyle = "#000000";
            Canvas.context.fillRect(0, 0, Canvas.canvas.width, Canvas.canvas.height);
            //Debris/Stars
            drawStars();
        };
        var drawMainMenu = function drawMainMenu() {
            var part1, part2, start, options, stats, help, mouseX, mouseY;
            part1 = Canvas.canvasWidth / 4;
            part2 = Canvas.canvasHeight / 4;
            mouseX = Game.mouse.pos.x;
            mouseY = Game.mouse.pos.y;
            //Button animation
            if (mouseX >= part1 * 1.2 && mouseX <= part1 * 1.2 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
                start = Images.start1;
            } else {
                start = Images.start0;
            }
            if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
                options = Images.options1;
            } else {
                options = Images.options0;
            }
            if (mouseX >= part1 * 1.2 && mouseX <= part1 * 1.2 + part1 * 0.75 && mouseY >= part2 * 2 && mouseY <= part2 * 2 + part2 * 0.7) {
                stats = Images.stats1;
            } else {
                stats = Images.stats0;
            }
            if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 * 2 && mouseY <= part2 * 2 + part2 * 0.7) {
                help = Images.help1;
            } else {
                help = Images.help0;
            }
            //drawing button
            Canvas.context.drawImage(Images.blueMetal, part1, 0, part1 * 2, part2 * 3.5);
            Canvas.context.drawImage(Images.bigLogo, part1 * 1.1, part2 * 0.1, part1 * 1.8, part2);
            Canvas.context.drawImage(start, part1 * 1.2, part2, part1 * 0.75, part2 * 0.7);
            Canvas.context.drawImage(options, part1 * 2.1, part2, part1 * 0.75, part2 * 0.7);
            Canvas.context.drawImage(stats, part1 * 1.2, part2 * 2, part1 * 0.75, part2 * 0.7);
            Canvas.context.drawImage(help, part1 * 2.1, part2 * 2, part1 * 0.75, part2 * 0.7);
        };

        var drawOptions = function drawOptions() {
            var part1, part2, muteMusic, muteSFX, mainMenu;
            part1 = Canvas.canvasWidth / 4;
            part2 = Canvas.canvasHeight / 4;
            var mouseX = Game.mouse.pos.x;
            var mouseY = Game.mouse.pos.y;
            //Button animation
            if (Game.muteMusic) {
                muteMusic = Images.muteMusic1;
            } else {
                muteMusic = Images.muteMusic0;
            }
            if (Game.muteSFX) {
                muteSFX = Images.muteSFX1;
            } else {
                muteSFX = Images.muteSFX0;
            }

            if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 * 2 && mouseY <= part2 * 2 + part2 * 0.7) {
                mainMenu = Images.mainMenu1;
            } else {
                mainMenu = Images.mainMenu0;
            }
            //drawing button
            Canvas.context.drawImage(Images.blueMetal, part1, 0, part1 * 2, part2 * 3.5);
            Canvas.context.drawImage(Images.bigLogo, part1 * 1.1, part2 * 0.1, part1 * 1.8, part2);
            Canvas.context.drawImage(muteMusic, part1 * 1.2, part2, part1 * 0.75, part2 * 0.7);
            Canvas.context.drawImage(muteSFX, part1 * 2.1, part2, part1 * 0.75, part2 * 0.7);
            Canvas.context.drawImage(mainMenu, part1 * 2.1, part2 * 2, part1 * 0.75, part2 * 0.7);
        };

        var drawMenu = function drawMenu() {
            switch (Game.screen) {
            case "main_menu":
                Draw.drawMainMenu();
                break;
            case "game_over":
                Draw.drawGameOver();
                break;
            case "options":
                Draw.drawOptions();
                break;
            case "stats":
                Draw.drawStats();
                break;
            case "paused":
                Draw.drawPause();
                break;
            default:
                break;
            }
        };

        var drawPlayerShip = function drawPlayerShip() {
            var sprite, sx, sy, width, height, x, y, frame;
			frame = Character.ship.player.frame;
            x = Character.ship.player.pos.x;
            y = Character.ship.player.pos.y;
            sprite = Character.ship.player.sprite;
            width = Character.ship.player.width;
            height = Character.ship.player.height;
            sy = 0;
            if (Character.ship.player.hp > 0) {
                Canvas.context.drawImage(Images.gun0, x + 55, y - 8.5);
                if (frame === 0) {
                    sx = 0;
                } else if (frame === 1) {
                    sx = 75;
                } else if (frame === 2) {
                    sx = 150;
                } else if (frame === 3) {
                    sx = 225;
                }
                Character.ship.player.frame += 1;
                if (Character.ship.player.frame >= 4) {
                    Character.ship.player.frame = 0;
                }
            } else {
				width = 192;
				height = 192;
				sprite = Images.explosion;
				if (frame === 0) {
                    sx = 0;
                } else if (frame <= 1) {
                    sx = 192;
                } else if (frame <= 2) {
                    sx = 384;
                } else if (frame <= 3) {
                    sx = 576;
                } else if (frame <= 4) {
                    sx = 768;
                } else if (frame <= 5) {
                    sx = 960;
                } else if (frame <= 6) {
                    sx = 0;
					sy = 192;
                } else if (frame <= 7) {
                    sx = 192;
					sy = 192;
                }
                Character.ship.player.frame += 0.2;
			}
			Canvas.context.drawImage(sprite, sx, sy, width, height, x, y - (height / 2), width, height);
        };

        var drawPowerups = function drawPowerups() {
            var i;
            var powerUps = InPlay.powerUps;
            for (i = 0; i < powerUps.length; i += 1) {
                if (powerUps[i].alive) {
                    Canvas.context.drawImage(powerUps[i].icon, powerUps[i].x, powerUps[i].y);
                    if (powerUps[i].x <= -10) {
                        powerUps[i].alive = false;
                    } else {
                        powerUps[i].x -= 4;
                    }
                }
            }
        };

        var drawEnemies = function drawEnemies() {
            var i, relativeTime;
            var enemies = InPlay.enemies;
            for (i = 0; i < enemies.length; i += 1) {
                if (enemies[i].alive) {
                    relativeTime = Game.timer - GameLogic.level.startTime;
                    if (relativeTime > enemies[i].time) {
                        Canvas.context.drawImage(enemies[i].ship, enemies[i].x, enemies[i].y);
                        if (enemies[i].x <= -140) {
                            enemies[i].alive = false;
                            Character.ship.player.score -= enemies[i].score * 1.4;
                        } else {
                            enemies[i].x -= enemies[i].speed;
                            if (enemies[i].name === "interceptor") {
								if (enemies[i].x > Canvas.canvasWidth/2) {
									if (enemies[i].y + 2 < Character.ship.player.pos.y - 49.5) {
										enemies[i].y += 2;
									} else if (enemies[i].y - 2 > Character.ship.player.pos.y - 49.5) {
										enemies[i].y -= 2;
									}
								}
                            }
                            if (enemies[i].fireRate > 0) {
                                if ((relativeTime-enemies[i].time) % enemies[i].fireRate <= 0.02) {
                                    enemies[i].hasShot = true;
                                    Action.enemyShoot(enemies[i].x, enemies[i].y, enemies[i].damage);
                                }
                            }
                        }
                    }
                }
            }
        };

        var drawBullets = function drawBullets() {
            var i;
            var playerBullets = InPlay.playerBullets;
            var enemyBullets = InPlay.enemyBullets;
            for (i = 0; i < playerBullets.length; i += 1) {
                if (playerBullets[i].alive) {
                    Canvas.context.drawImage(playerBullets[i].type, playerBullets[i].x, playerBullets[i].y);
                    if (playerBullets[i].x >= Canvas.canvasWidth) {
                        playerBullets.shift();
                    } else {
                        playerBullets[i].x += 40;
                    }
                }
            }
            for (i = 0; i < enemyBullets.length; i += 1) {
                if (enemyBullets[i].alive) {
                    Canvas.context.drawImage(enemyBullets[i].type, enemyBullets[i].x, enemyBullets[i].y);
                    if (enemyBullets[i].x <= 0) {
                        enemyBullets.shift();
                    } else {
                        enemyBullets[i].x -= 10;
                    }
                }
            }
        };

        var drawScore = function drawScore() {
            var score = Character.ship.player.score;
            Canvas.context.fillStyle = ("yellow");
            Canvas.context.fillText("Score: " + score, Canvas.canvasWidth * 0.6, 40);
        };

        var drawHP = function drawHP() {
            var hp = Character.ship.player.hp;
            Canvas.context.fillStyle = ("yellow");
            Canvas.context.fillText("Health: " + hp, 0, 40);
        };

        var drawGameOver = function drawGameOver() {
            var restart, mainMenu;
            var part1 = Canvas.canvasWidth / 4;
            var part2 = Canvas.canvasHeight / 4;
            var mouseX = Game.mouse.pos.x;
            var mouseY = Game.mouse.pos.y;
            if (mouseX >= part1 * 1.2 && mouseX <= part1 * 1.2 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
                restart = Images.restart1;
            } else {
                restart = Images.restart0;
            }
            if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
                mainMenu = Images.mainMenu1;
            } else {
                mainMenu = Images.mainMenu0;
            }
			Draw.drawPlayerShip();
            Canvas.context.drawImage(Images.blueMetal, part1, 0, part1 * 2, part2 * 2);
            Canvas.context.drawImage(Images.bigLogo, part1 * 1.1, part2 * 0.1, part1 * 1.8, part2);
            Canvas.context.drawImage(restart, part1 * 1.2, part2, part1 * 0.75, part2 * 0.7);
            Canvas.context.drawImage(mainMenu, part1 * 2.1, part2, part1 * 0.75, part2 * 0.7);
            if (Game.isHighscore) {
                Canvas.context.fillStyle = ("yellow");
                Canvas.context.fillText("HIGH SCORE", (Canvas.canvasWidth / 2) - 108, Canvas.canvasHeight / 1.7);
            }
            Canvas.context.fillStyle = ("yellow");
            Canvas.context.fillText("Game Over  Level: " + Game.level + "  Score: " + Character.ship.player.score, (Canvas.canvasWidth / 2) - 345, Canvas.canvasHeight / 1.5);
        };

        var drawStats = function drawStats() {
            var part1, part2, mainMenu, resetStats, mouseX, mouseY;
            part1 = Canvas.canvasWidth / 4;
            part2 = Canvas.canvasHeight / 4;
            mouseX = Game.mouse.pos.x;
            mouseY = Game.mouse.pos.y;
            if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
                mainMenu = Images.mainMenu1;
            } else {
                mainMenu = Images.mainMenu0;
            }
            if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 * 2 && mouseY <= part2 * 2 + part2 * 0.7) {
                resetStats = Images.resetStats1;
            } else {
                resetStats = Images.resetStats0;
            }
            Canvas.context.drawImage(Images.blueMetal, part1, 0, part1 * 2, part2 * 3.5);
            Canvas.context.fillStyle = 'rgba(0,0,0,0.5)';
            Canvas.context.fillRect(part1, 0, part1 * 2, part2 * 3.5);
            Canvas.context.fillStyle = 'yellow';
            Canvas.context.drawImage(mainMenu, part1 * 2.1, part2, part1 * 0.75, part2 * 0.7);
            Canvas.context.drawImage(resetStats, part1 * 2.1, part2 * 2, part1 * 0.75, part2 * 0.7);
            Canvas.context.fillText("Highscore: " + Game.highscore, part1 * 1.1, part2 * 0.5);
            Canvas.context.fillText("Enemies killed", part1 * 1.1, part2);
            Canvas.context.fillText("Scout: " + Game.scout, part1 * 1.1, part2 * 1.40);
            Canvas.context.fillText("Fighter: " + Game.fighter, part1 * 1.1, part2 * 1.70);
            Canvas.context.fillText("Interceptor: " + Game.interceptor, part1 * 1.1, part2 * 2);
            Canvas.context.fillText("Tank: " + Game.tank, part1 * 1.1, part2 * 2.30);
            Canvas.context.fillText("Transporter: " + Game.transport, part1 * 1.1, part2 * 2.60);
        };

        var drawPause = function drawPause() {
            Canvas.context.drawImage(Images.pauseScreen, 0, 0, Canvas.canvasWidth, Canvas.canvasHeight);
        };

        var drawGame = function drawGame() {
            if (Game.levelStarted) {
                Draw.drawScore();
                Draw.drawHP();
            } else {
                Canvas.context.fillStyle = ("yellow");
                Canvas.context.fillText("Level: " + Game.level, (Canvas.canvasWidth / 2) - 80, Canvas.canvasHeight / 2);
            }
            Draw.drawBullets();
            Draw.drawPlayerShip();
            Draw.drawEnemies();
            Draw.drawPowerups();
        };

        var Draw = {
            //functions

            drawStars: drawStars,
            drawBackground: drawBackground,
            drawHP: drawHP,
            drawScore: drawScore,
            drawPlayerShip: drawPlayerShip,
            drawEnemies: drawEnemies,
            drawPowerups: drawPowerups,
            drawBullets: drawBullets,
            drawGame: drawGame,
            drawMainMenu: drawMainMenu,
            drawOptions: drawOptions,
            drawMenu: drawMenu,
            drawStats: drawStats,
            drawPause: drawPause,
            drawGameOver: drawGameOver
        };

        return Draw;
    });