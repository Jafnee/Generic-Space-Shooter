define(["controller/action"], function (Action) {
	canvas.addEventListener("mousemove", Action.getMousePos, false);
	canvas.addEventListener("click", Action.mouseClicked, false);
	window.addEventListener("resize", Action.resize, false);
});