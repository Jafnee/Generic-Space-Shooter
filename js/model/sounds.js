define(["howler"], function (Howler) {
	var bgMusic = new Howl({
		urls:		["./sound/music/DST-DasElectron.ogg"],		
		loop:		true
	});
	
	var laser1 = new Howl({
		urls:		["./sound/sfx/sfx_laser1.ogg"]
	});
	
	var laser2 = new Howl({
		urls:		["./sound/sfx/sfx_laser2.ogg"]
	});	
	
	var Sounds = {
		bgMusic:			bgMusic,
		laser1:				laser1,
		laser2:				laser2
	};
	
	return Sounds;
});
