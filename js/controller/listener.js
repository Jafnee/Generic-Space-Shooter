define(["controller/action", "model/canvas"], function (Action, Canvas) {
    Canvas.canvas.addEventListener("mousemove", Action.getMousePos, false);
    Canvas.canvas.addEventListener("mousedown", function () {
        Action.mouseClicked(true);
    }, false);
    Canvas.canvas.addEventListener("mouseup", function () {
        Action.mouseClicked(false);
    }, false);
	if (window.requestAnimationFrame !== undefined) {
		window.addEventListener("resize", Action.resize, false);
	}
});