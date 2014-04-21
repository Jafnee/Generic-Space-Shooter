define(["model/game"], function (Game) {
    var init = function init() {
        if (typeof (Storage) !== "undefined") {
            if (localStorage.getItem("music") === null) {
                localStorage.setItem("music", "true");
            }
            if (localStorage.getItem("sfx") === null) {
                localStorage.setItem("sfx", "true");
            }
            if (localStorage.getItem("scout") === null) {
                localStorage.setItem("scout", "0");
            }
            if (localStorage.getItem("fighter") === null) {
                localStorage.setItem("fighter", "0");
            }
            if (localStorage.getItem("interceptor") === null) {
                localStorage.setItem("interceptor", "0");
            }
            if (localStorage.getItem("tank") === null) {
                localStorage.setItem("tank", "0");
            }
            if (localStorage.getItem("transport") === null) {
                localStorage.setItem("transport", "0");
            }
            if (localStorage.getItem("highscore") === null) {
                localStorage.setItem("highscore", "0");
            }
        } else {
            console.log("nolocalstorage sup"); //TODO
        }
    };

    var load = function load() {
        if (localStorage.getItem("music") === "true") {
            Game.muteMusic = false;
        } else {
            Game.muteMusic = true;
        }
        if (localStorage.getItem("sfx") === "true") {
            Game.muteSFX = false;
        } else {
            Game.muteSFX = true;
        }
        Game.highscore = parseInt(localStorage.getItem("highscore"));
        Game.scout = parseInt(localStorage.getItem("scout"));
        Game.fighter = parseInt(localStorage.getItem("fighter"));
        Game.interceptor = parseInt(localStorage.getItem("interceptor"));
        Game.tank = parseInt(localStorage.getItem("tank"));
        Game.transport = parseInt(localStorage.getItem("transport"));
    };

    var set = function set(k, v) {
        var key = String(k);
        var value = String(v);
        localStorage.setItem(key, value);
    };

    var get = function get(k) {
        var key = String(k);
        var value;
        value = localStorage.getItem(key);
        return value;
    };

    var LSM = {
        set: set,
        get: get,
        init: init,
        load: load
    };
    return LSM;
});