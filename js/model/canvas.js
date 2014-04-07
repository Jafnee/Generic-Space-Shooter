define([""], function () {
	
	canvas = document.getElementById("gameCanvas");
	context = canvas.getContext("2d");
	context.canvas.width = window.innerWidth;
	context.canvas.height = window.innerHeight - 70;
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;
	
	var Canvas = {
		//functions
		canvas:					canvas,
		context:				context,
		contextCanvasWidth:		context.canvas.width,
		contextCanvasHeight:	context.canvas.height,
		canvasWidth:			canvasWidth,
		canvasHeight:			canvasHeight
	};
	
	return Canvas;
});