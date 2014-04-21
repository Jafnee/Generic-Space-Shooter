define(["model/canvas"], function (Canvas) {
    var generateStar = function generateStar(old) {
        var star = {
            y: Math.floor(Math.random() * Canvas.canvasHeight) + 1,
            speed: Math.floor(Math.random() * 4) + 1
        };
        if (old) {
            star.x = Canvas.canvasWidth;
        } else {
            star.x = Math.floor(Math.random() * Canvas.canvasWidth) + 1;
        }
        return star;
    };

    var addStars = function addStars() {
        "use strict";
        var i;
        for (i = 0; i < Game.noStars; i += 1) {
            Game.stars.push(generateStar());
        }
    };

    var getScreen = function getScreen() {
        var screen, curPage;
        curPage = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
        if (curPage === "" || curPage === "index.html") {
            Game.screen = "main_menu";
        } else if (curPage === "about.html") {
            Game.screen = "about";
        }
        return screen;
    };

    var keyboard = {
        use: false,
        sbFlag: false,
        up: false,
        down: false
    };
    var mouse = {
        use: false,
        mdFlag: false,
        pos: pos = {
            x: 100,
            y: 100
        }
    };
    var Game = {
        //functions
        generateStar: generateStar,
        addStars: addStars,
        getScreen: getScreen,
        //variables
        stars: stars = [],
        noStars: 300,
        screen: "",
        timer: 0,
        level: 1,
        gameOver: false,
        levelStarted: false,
        keyboard: keyboard,
        mouse: mouse,
        fps: 0,
        lastCalledTime: 0,
        lastScreen: "main_menu",
        paused: false,
        screenTooSmall: false,
        //user settings
        muteMusic: false,
        musicCreated: false,
        muteSFX: false,
        disableHelp: false,
        //stats
        highscore: 0,
        isHighScore: false,
        //enemies killed
        scout: 0,
        fighter: 0,
        interceptor: 0,
        tank: 0,
        transport: 0
    };

    return Game;
});