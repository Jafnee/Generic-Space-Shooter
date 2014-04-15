define(["controller/action"], function (Action) {
	canvas.addEventListener("mousemove", Action.getMousePos, false);
	canvas.addEventListener("mousedown", function(){Action.mouseClicked(true);}, false);
	canvas.addEventListener("mouseup", function(){Action.mouseClicked(false);}, false);
	window.addEventListener("resize", Action.resize, false);
});