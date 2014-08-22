define(["howler"], function (Howler) {
    var bgMusic = new Howl({
        urls: ["./sound/music/DST-DasElectron.mp3"],
        buffer: true,
        loop: true
    });

    var laser1 = new Howl({
        urls: ["./sound/sfx/sfx_laser1.ogg", "./sound/sfx/sfx_laser1.mp3"]
    });

    var explosion = new Howl({
        urls: ["./sound/sfx/explosion.ogg", "./sound/sfx/explosion.mp3"]
    });

    var laser2 = new Howl({
        urls: ["./sound/sfx/sfx_laser2.ogg", "./sound/sfx/sfx_laser2.mp3"]
    });

    var playerHit = new Howl({
        urls: ["./sound/sfx/sfx_shieldDown.ogg", "./sound/sfx/sfx_shieldDown.mp3"]
    });

    var pause = new Howl({
        urls: ["./sound/sfx/pause.wav"]
    });

    var select = new Howl({
        urls: ["./sound/sfx/select.mp3", "./sound/sfx/select.wav"]
    });

    var death = new Howl({
        urls: ["./sound/sfx/death.mp3", "./sound/sfx/death.wav"]
    });

    var levelUp = new Howl({
        urls: ["./sound/sfx/levelUp.mp3", "./sound/sfx/levelUp.wav"]
    });

    var powerUp = new Howl({
        urls: ["./sound/sfx/levelUp.mp3"]
    });
    var Sounds = {
        levelUp: levelUp,
        powerUp: powerUp,
        explosion: explosion,
        death: death,
        bgMusic: bgMusic,
        playerHit: playerHit,
        pause: pause,
        select: select,
        laser1: laser1,
        laser2: laser2
    };

    return Sounds;
});
