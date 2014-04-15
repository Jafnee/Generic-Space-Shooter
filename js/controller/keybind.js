define(["mousetrap", "controller/action"], function (Mousetrap, Action) {
    Mousetrap.bind('space', function(){Action.mouseClicked(true);}, 'keydown');
	Mousetrap.bind('space', function(){Action.mouseClicked(false);}, 'keyup');
});
