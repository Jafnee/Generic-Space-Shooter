define(["howler"], function (Howler) {
    var bgMusic = new Howl({
        urls: ["./sound/music/DST-DasElectron.ogg"],
        buffer: true,
        loop: true
    });

    var laser1 = new Howl({
        urls: ["./sound/sfx/sfx_laser1.ogg"]
    });

    var explosion = new Howl({
        urls: ["./sound/sfx/explosion.mp3"]
    });

    var laser2 = new Howl({
        urls: ["./sound/sfx/sfx_laser2.ogg"]
    });

    var playerHit = new Howl({
        urls: ["./sound/sfx/sfx_shieldDown.ogg"]
    });

    var pause = new Howl({
        urls: ["./sound/sfx/pause.wav"]
    });

    var select = new Howl({
        urls: ["./sound/sfx/select.wav"]
    });

    var death = new Howl({
        urls: ["./sound/sfx/death.wav"]
    });

    var levelUp = new Howl({
        urls: ["./sound/sfx/levelUp.wav"]
    });

    var powerUp = new Howl({
        urls: ["./sound/sfx/sfx_zap.ogg"]
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