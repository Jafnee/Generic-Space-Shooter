define(["model/canvas"], function (Canvas) {
	//canvas.addEventListener("mousemove", getMousePos, false);
	//canvas.addEventListener("click", mouseClicked, false);
	window.addEventListener("resize", Canvas.resize, false);
});