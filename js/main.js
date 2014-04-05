//global
var mouseX = 0;
var mouseY = 0;
var debugMessage = "debug";
var flying = false;
var car = false;
var alt = 0;


var c = document.getElementById("gameCanvas");
var ctx = c.getContext("2d");
var canvasWidth = c.width;

c.style.cursor = "none";

var ground = new Image();
var sky = new Image();

var player = new Image();

sky.src = "images/background/sky.png";
ground.src = "images/background/ground.png";



draw();
window.alert("canvas size: "+String(canvasWidth)+" "+c.height);
//Test stuff, go away
//REMEMBER TO RE DO EVERYTHING, make it resize friendly
//REDO images into a spritesheet for animation.

function draw() {
	requestAnimationFrame(draw);
	if (!car)
	{
		if (alt==0) { player.src = "images/character/player/heli.png"; alt = 1;}
		else if(alt==1) { player.src = "images/character/player/heli2.png"; alt = 0;}
	}
	else
	{
		player.src = "images/character/player/car.png";
	}
	if (mouseY >=416)
	{
		car = true;
		ctx.drawImage(sky,-mouseX/4,-mouseY/4,2000,1000);
		ctx.drawImage(ground,-mouseX,-416+500,2000,500);
		ctx.drawImage(player,mouseX-80,416-60);
		//debugMessage = "landed";
	}
	else
	{
		car = false;
		ctx.drawImage(sky,-mouseX/4,-mouseY/4,2000,1000);
		ctx.drawImage(ground,-mouseX,-mouseY+500,2000,500);
		//debugMessage = "ground incoming";
		ctx.drawImage(player,mouseX-80,mouseY-60);
	}
	
	
	
	ctx.fillText(debugMessage, 10, 25);
}

function writeMessage(c, message,x,y) {
        ctx.clearRect(0, 0, c.width, c.height);
		ctx.drawImage(sky,0,0);
		ctx.drawImage(ground,0,0);
		draw_cop(x,y);
        ctx.font = '18pt Calibri';
        ctx.fillStyle = 'black';
        
     }

function getMousePos(c, evt) {
        var rect = c.getBoundingClientRect();
          mouseX= evt.clientX - rect.left,
          mouseY= evt.clientY - rect.top
      }
c.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(c, evt);
		var message = "dunno";
        debugMessage = 'Mouse position: ' + mouseX + ',' + mouseY;
        writeMessage(c, message,mousePos.x,mousePos.y);
      }, false);