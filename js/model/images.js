define([""], function () {
    var Images = {};
    var sources, src;
    sources = {
        //menu
        bigLogo: "images/logo/logo_large.png",
        blueMetal: "images/menu/backdrop/blueMetalSheet.jpg",
        pauseScreen: "images/menu/backdrop/helpScreen.png",
        start0: "images/menu/button/startGame0.png",
        start1: "images/menu/button/startGame1.png",
        options0: "images/menu/button/options0.png",
        options1: "images/menu/button/options1.png",
        stats0: "images/menu/button/stats0.png",
        stats1: "images/menu/button/stats1.png",
        about0: "images/menu/button/about0.png",
        about1: "images/menu/button/about1.png",
        restart0: "images/menu/button/restart0.png",
        restart1: "images/menu/button/restart1.png",
        mainMenu0: "images/menu/button/mainMenu0.png",
        mainMenu1: "images/menu/button/mainMenu1.png",
        help0: "images/menu/button/help0.png",
        help1: "images/menu/button/help1.png",
        muteSFX0: "images/menu/button/muteSFX0.png",
        muteSFX1: "images/menu/button/muteSFX1.png",
        muteMusic0: "images/menu/button/muteMusic0.png",
        muteMusic1: "images/menu/button/muteMusic1.png",
        resetStats0: "images/menu/button/resetStats0.png",
        resetStats1: "images/menu/button/resetStats1.png",
        //SHIPS
        //playership
        playerShip: "images/character/player/playerShip.png",
        //enemy ships
        scout: "images/character/enemy/enemyBlack1.png",
        fighter: "images/character/enemy/enemyBlack2.png",
        interceptor: "images/character/enemy/enemyBlack3.png",
        tank: "images/character/enemy/enemyBlack4.png",
        transport: "images/character/enemy/enemyRed5.png",
        //guns
        gun0: "images/misc/gun/gun00.png",
        //bullets
        blueLaser1: "images/misc/laser/laserBlue01.png",
        redLaser1: "images/misc/laser/laserRed02.png",
        //pickups
        pickUpHealth: "images/misc/pickup/pickup_health.png",
        pickUpDamage: "images/misc/pickup/pickup_damage.png",
        pickUpFireRate: "images/misc/pickup/pickup_firerate.png",
		//misc
		explosion: "images/misc/explosion/explosion.png"
    };
    for (src in sources) {
        Images[src] = new Image();
        Images[src].src = sources[src];
    }

    return Images;
});