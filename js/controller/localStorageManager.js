define(["model/game"], function (Game) {
	var init = function init() {
		if(typeof(Storage)!=="undefined")
		{
			if (localStorage.getItem("music") === null) {
				localStorage.setItem("music", "true");
			}			
			if (localStorage.getItem("sfx") === null) {
				localStorage.setItem("sfx", "true");
			}
			if (localStorage.getItem("help") === null) {
				localStorage.setItem("help", "true");
			}
		}
		else
		{
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
		if (localStorage.getItem("help") === "true") {
			Game.disableHelp = false;
		} else {
			Game.disableHelp = true;
		}
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
		set:	set,
		get:	get,
		init:	init,
		load:	load	
	};
	return LSM;
});