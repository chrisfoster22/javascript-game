var fireball = new Ability('fireball', 20, 1000, 300, 0, 49);
var megaFireball = new Ability('fireball', 50, 400, 500, 0, 50);
var superMegaFireball = new Ability('fireball', 100, 1000, 200, 0, 51);
var abilities = [fireball, megaFireball, superMegaFireball]

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
