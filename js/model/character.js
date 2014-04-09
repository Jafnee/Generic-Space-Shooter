define(["model/images"], function (Images) {
	var player = {
		name:			"player1",
		score:			0,
		upgrade:		1,
		guns:			1,
		hp:				100,
		lives:			3,
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
							alive:		true,
							damage:		0,
							score:		10,
							x:			0,
							y:			0,
							time:		0,
							speed:		7
						},
		fighter:		fighter = {
							name:		"fighter",
							ship:		Images.fighter,
							hp:			20,
							alive:		true,
							damage:		10,
							score:		20,
							x:			100,
							y:			100,
							time:		0,
							speed:		3
						},
		interceptor:	interceptor = {
							name:		"interceptor",
							ship:		Images.interceptor,
							hp:			20,
							alive:		true,
							damage:		5,
							score:		30,
							x:			100,
							y:			100,
							time:		0,
							speed:		3
						},
		tank:			tank = {
							name:		"tank",
							ship:		Images.tank,
							hp:			100,
							alive:		true,
							damage:		5,
							score:		30,
							x:			100,
							y:			100,
							time:		0,
							speed:	2
						},
		transport:		transport = {
							name:	"transport",
							ship:		Images.transport,
							hp:			20,
							alive:		true,
							damage:		0,
							score:		40,
							x:			100,
							y:			100,
							time:		0,
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