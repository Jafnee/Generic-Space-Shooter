define([""], function () {
	canvas.addEventListener("mousemove", getMousePos, false);
	canvas.addEventListener("click", mouseClicked, false);
	window.addEventListener("resize", resize, false);
});