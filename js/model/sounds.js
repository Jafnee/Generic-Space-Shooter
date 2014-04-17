define(["howler"], function (Howler) {
	var bgMusic = new Howl({
		urls:		["./sound/music/DST-DasElectron.ogg"],
		buffer:		true,
		loop:		true
	});
	
	var laser1 = new Howl({
		urls:		["./sound/sfx/sfx_laser1.ogg"]
	});
	
	var laser2 = new Howl({
		urls:		["./sound/sfx/sfx_laser2.ogg"]
	});
	
	var playerHit = new Howl({
		urls:		["./sound/sfx/sfx_shieldDown.ogg"]
	});
	
	var powerUp = new Howl({
		urls:		["./sound/sfx/sfx_zap.ogg"]
	});
	var Sounds = {
		powerUp:			powerUp,
		bgMusic:			bgMusic,
		playerHit:			playerHit,
		laser1:				laser1,
		laser2:				laser2
	};
	
	return Sounds;
});
