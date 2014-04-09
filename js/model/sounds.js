define(["howler"], function (Howler) {
	var bgMusic = new Howl({
		urls:		["./sound/music/DST-DasElectron.ogg"],
		autoplay:	true,
		loop:		true
	});
	
	var Sounds = {
		bgMusic:			bgMusic
	};
});