define(["model/images"], function (Images) {
	var player = {
		name:			"player1",
		upgrade:		1,
		guns:			1,
		hp:				100,
		lives:			3,
		level:			1,
		pos:			pos = {
							x:	100,
							y:	100
						}
	};
	var enemy = {
		scout:			scout = {
							name:		"scout",
							ship:		Images.scout,
							hp:			10,
							damage:		0,
							speed:		4
						},
		fighter:		fighter = {
							name:		"fighter",
							ship:		Images.fighter,
							hp:			20,
							damage:		10,
							speed:		3
						},
		interceptor:	interceptor = {
							name:		"interceptor",
							ship:		Images.interceptor,
							hp:			20,
							damage:		5,
							speed:		3
						},
		tank:			tank = {
							name:	"tank",
							ship:	Images.tank,
							hp:		100,
							damage:	5,
							speed:	2
						},
		transport:		transport = {
						name:	"transport",
						ship:		Images.transport,
						hp:			20,
						damage:		0,
						speed:		3
					}
		
	};
	var ship = {
		enemy:		enemy,
		player:		player
	};
	var Character = {
		ship:		ship
	};
	return Character
});