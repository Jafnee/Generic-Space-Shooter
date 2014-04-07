define([""], function () {
		
	var animate = function animate() {
		requestAnimationFrame(animate);
		draw();
	}
	
	var resize = function resize() {
		"use strict";
		context.canvas.width = window.innerWidth;
		context.canvas.height = window.innerHeight - 70;
		canvasWidth = canvas.width;
		canvasHeight = canvas.height;
	}
	
	var Draw = {
		//functions
		resize:					resize,
		animate:				animate
	};	
	
	return Draw;
});