define([""], function () {
	
	var Canvas = {
		//functions
		canvas:					document.getElementById("gameCanvas"),
		context:				canvas.getContext("2d"),
		context.canvas.width:	window.innerWidth,
		context.canvas.height:	window.innerHeight - 70,
		canvasWidth:			canvas.width,
		canvasHeight:			canvas.height
	};	
	
	return Canvas;
});