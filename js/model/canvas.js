define([""], function () {
	var resize = function resize() {
		"use strict";
		context.canvas.width = window.innerWidth;
		context.canvas.height = window.innerHeight - 70;
		canvasWidth = canvas.width;
		canvasHeight = canvas.height;
	}
	
	var Canvas = {
		canvas:					document.getElementById("gameCanvas"),
		context:				canvas.getContext("2d"),
		context.canvas.width:	window.innerWidth,
		context.canvas.height:	window.innerHeight - 70,
		canvasWidth:			canvas.width,
		canvasHeight:			canvas.height,
		resize:					resize
	};	
	
	return Canvas
});