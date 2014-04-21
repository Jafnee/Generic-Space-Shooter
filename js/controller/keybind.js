define(["mousetrap", "controller/action", "model/character", "model/game", "controller/gameRunner"], function (Mousetrap, Action, Character, Game, GameRunner) {
    //shooting
    Mousetrap.bind('space', function () {
        Action.mouseClicked(true, true);
        Game.keyboard.use = true;
    }, 'keydown');
    Mousetrap.bind('space', function () {
        Action.mouseClicked(false, true);
        Game.keyboard.use = true;
    }, 'keyup');
    //directions
    Mousetrap.bind('up', function () {
        Game.keyboard.up = true;
        Game.keyboard.use = true;
    }, 'keydown');
    Mousetrap.bind('up', function () {
        Game.keyboard.up = false;
        Game.keyboard.use = true;
    }, 'keyup');
    Mousetrap.bind('down', function () {
        Game.keyboard.down = true;
        Game.keyboard.use = true;
    }, 'keydown');
    Mousetrap.bind('down', function () {
        Game.keyboard.down = false;
        Game.keyboard.use = true;
    }, 'keyup');
    //other
    Mousetrap.bind('p', function () {
        GameRunner.pauseGame();
        Game.screenTooSmall = false;
    });
});