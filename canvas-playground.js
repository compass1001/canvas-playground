// JavaScript Document

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var colorArray = [
	'#133046',
	'#15959F',
	'#15959F',
	'#EC9770',
	'#C7402D'
];
var maxRadius = 50;
var minRadius;
var mouse = {
	x:undefined,
	y:undefined
}

window.addEventListener('mousemove',function(event){
	mouse.x = event.x;
	mouse.y = event.y;
})

window.addEventListener('resize',function(event){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init();
})

function Circle(x, y, dx, dy, radius, color, weight){
	this.radius = Math.random() * 5 + 1;
	this.originalRadius = this.radius;
	this.x = Math.random() * (canvas.width - 2 * this.radius) + this.radius;
	this.y = Math.random() * (canvas.height - 2 * this.radius) + this.radius;
	this.dx = (Math.random() - 0.5) * 5;
	this.dy = (Math.random() - 0.5) * 5;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
	this.weight = Math.random() * 30;
	
	this.draw = function(){
		ctx.beginPath();
		//ctx.strokeStyle = this.color;
		ctx.fillStyle = this.color;
		//ctx.lineWidth = this.weight;
		
		if((this.x + this.radius > canvas.width) || (this.x - this.radius < 0)){
			this.dx = - this.dx;
		}
		
		if((this.y + this.radius > canvas.height) || (this.y - this.radius < 0)){
			this.dy = - this.dy;
		}
		
		ctx.arc((this.x + this.dx),(this.y + this.dy), this.radius, 0, 2*Math.PI);
		//ctx.stroke();
		ctx.fill();
	}
	
	this.update = function(){
		this.x += this.dx;
		this.y += this.dy;
		minRadius = this.originalRadius;
		
		if((this.x < mouse.x + 50 && this.x > mouse.x - 50) && (this.y < mouse.y + 50 && this.y > mouse.y - 50)){
			if(this.radius < maxRadius)
				this.radius += Math.random() * 5;
		}else{
			if(this.radius - 1 > minRadius)
				this.radius -= 1;
		}
		
		this.draw();
	}
}

var circleArray = [];
function init(){
	circleArray = [];
	for(var i = 0; i < 800; i++){
		var circle = new Circle();
		circleArray.push(circle);
		circle.draw();
	}
}

function animate(){
	window.requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for(var i = 0; i < circleArray.length; i++){
		circleArray[i].update();
	}
}

init();
animate();