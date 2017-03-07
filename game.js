
var hero = new Hero("hero", [0, 0], 6, true);
var enemy = new Hero("enemy", [400, 300], 6);

hero.target = enemy;
enemy.target = hero;

var mouseX = 300, mouseY = 250;


document.addEventListener("mousemove", function(event) {
	mouseX = event.pageX;
	mouseY = event.pageY;
});


setTimeout(function(){
	setInterval(function() {

		setTimeout(function() {
			enemy.movement.movingDown = false;
			enemy.movement.movingUp = true;
		}, 2000)

		setTimeout(function() {
			enemy.movement.movingUp = false;
			enemy.movement.movingDown = true;
		})

	}, 4000)

}, 2400)
