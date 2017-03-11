var fireball = new Ability({name:'fireball', width: 20, range: 1000, speed: 300, cooldown: 1, key: 49, damage: 10});
var megaFireball = new Ability({ name: 'fireball', width: 50, range: 400, speed: 500, cooldown: 3, key: 50, damage: 25});
var superMegaFireball = new Ability({name: 'fireball', width: 100, range: 1000, speed: 200, cooldown: 5, key: 51, damage: 100});
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
